import {
  useQuery,
  skipToken,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getActivities,
  getActivityById,
  createActivity as createActivityApi,
  updateActivity as updateActivityApi,
  updateAttendee as updateAttendeeApi,
} from "../api/activities";
import { ActivityFormValues } from "../schemas/activity";

export const ACTIVITY_QUERY_KEY = {
  all: ["activities"] as const,
  lists: () => [...ACTIVITY_QUERY_KEY.all, "list"],
  details: (id?: string) => [...ACTIVITY_QUERY_KEY.lists(), "details", id], // ['activities', 'id']
} as const;

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["account"]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  } = useInfiniteQuery({
    queryKey: ACTIVITY_QUERY_KEY.lists(),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getActivities({ cursor: pageParam as string }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage?.pageInfo.nextCursor;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page?.items.map((activity) => {
          const host = activity.attendees.find(
            (x) => x.id === activity.host.id
          );
          return {
            ...activity,
            isHost: user?.id === activity.hostId,
            isGoing: activity.attendees.some((x) => x.id === user?.id),
            hostImageUrl: host?.imageUrl,
          };
        }),
      })),
    }),
  });

  const { data: activity, isPending: isLoadingActivity } = useQuery({
    queryKey: ACTIVITY_QUERY_KEY.details(id),
    queryFn: id ? () => getActivityById(id) : skipToken,
    enabled: !!id,
    select: (data) => {
      if (!data) return null;
      return {
        ...data,
        isGoing: data.attendees.some((attendee) => attendee.id === user?.id),
        isHost: data.hostId === user?.id,
      };
    },
  });

  const { mutate: createActivity, isPending: isCreatingActivity } = useMutation(
    {
      mutationFn: (activity: ActivityFormValues) => createActivityApi(activity),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ACTIVITY_QUERY_KEY.lists() });
      },
    }
  );

  // update activity
  const { mutate: updateActivity, isPending: isUpdatingActivity } = useMutation(
    {
      mutationFn: ({
        id,
        activity,
      }: {
        id: string;
        activity: ActivityFormValues;
      }) => updateActivityApi(id, activity),
      onSuccess: (_, variable) => {
        queryClient.invalidateQueries({ queryKey: ACTIVITY_QUERY_KEY.lists() });
        queryClient.invalidateQueries({
          queryKey: ACTIVITY_QUERY_KEY.details(variable.id),
        });
      },
    }
  );

  const { mutate: updateAttendee, isPending: isUpdatingAttendee } = useMutation(
    {
      mutationFn: (activityId: string) => updateAttendeeApi(activityId),
      onMutate: async (activityId: string) => {
        const key = ACTIVITY_QUERY_KEY.details(activityId);
        await queryClient.cancelQueries({ queryKey: key });
        const previousActivity = queryClient.getQueryData<Activity>(key);

        queryClient.setQueryData(key, (data: Activity) => {
          if (!data || !user) return null;
          const isHost = data.hostId === user.id;
          const isGoing = data.attendees.some((a) => a.id === user.id);

          return {
            ...data,
            isCancelled: isHost ? !data.isCancelled : data.isCancelled,
            attendees: isGoing
              ? isHost
                ? data.attendees
                : data.attendees.filter((att) => att.id !== user.id)
              : [
                  ...data.attendees,
                  {
                    id: user.id,
                    displayName: user.displayName,
                    imageUrl: user.imageUrl,
                  },
                ],
          };
        });
        return { previousActivity };
      },
      onSuccess: (_, activityId) => {
        queryClient.invalidateQueries({ queryKey: ACTIVITY_QUERY_KEY.all });
        queryClient.invalidateQueries({
          queryKey: ACTIVITY_QUERY_KEY.details(activityId),
        });
      },
      onError: (_, activityId, context) => {
        queryClient.setQueryData(
          ACTIVITY_QUERY_KEY.details(activityId),
          context?.previousActivity
        );
      },
    }
  );

  return {
    activitiesGrouped: data,
    activity,
    isPending,
    isLoadingActivity,
    createActivity,
    isCreatingActivity,
    updateActivity,
    isUpdatingActivity,
    updateAttendee,
    isUpdatingAttendee,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  };
};
