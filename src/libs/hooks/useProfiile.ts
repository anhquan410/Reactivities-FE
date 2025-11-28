import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "../api/profile";
import { updateProfile as updateProfileApi } from "@/libs/api/profile";

export const useProfile = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id as string),
    enabled: !!id,
  });

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: ({ id, profile }: { id: string; profile: Profile }) =>
      updateProfileApi(id, profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { profile, isLoadingProfile, updateProfile, isUpdatingProfile };
};
