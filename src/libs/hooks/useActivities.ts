import {
  useQuery,
  skipToken,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getActivities,
  getActivityById,
  createActivity as createActivityApi,
  updateActivity as updateActivityApi,
} from "../api/activities";

const activityQueryKeys = {
  list: ["activities"],
  details: (id?: string) => [activityQueryKeys.list, id], // ['activities', 'id']
} as const;

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"]);

  const { data = [], isPending } = useQuery({
    queryKey: activityQueryKeys.list,
    queryFn: getActivities,
    select: (data) => {
      if (!data) return [];
      return data?.map((activity) => {
        return {
          ...activity,
          isGoing: activity.attendees.some((a) => a.id === user?.id),
          isHost: activity.hostId === user?.id,
        };
      });
    },
  });

  const { data: activity, isPending: isLoadingActivity } = useQuery({
    queryKey: activityQueryKeys.details(id),
    queryFn: id ? () => getActivityById(id) : skipToken,
    enabled: !!id,
  });

  const { mutate: createActivity, isPending: isCreatingActivity } = useMutation(
    {
      mutationFn: (activity: Activity) => createActivityApi(activity),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: activityQueryKeys.list });
      },
    }
  );

  // update activity
  const { mutate: updateActivity, isPending: isUpdatingActivity } = useMutation(
    {
      mutationFn: ({ id, activity }: { id: string; activity: Activity }) =>
        updateActivityApi(id, activity),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: activityQueryKeys.list });
        queryClient.invalidateQueries({
          queryKey: activityQueryKeys.details(id),
        });
      },
    }
  );

  return {
    activities: data,
    activity,
    isPending,
    isLoadingActivity,
    createActivity,
    isCreatingActivity,
    updateActivity,
    isUpdatingActivity,
  };
};
