import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, getProfilePhotos } from "../api/profile";
import { updateProfile as updateProfileApi } from "@/libs/api/profile";
import { ACCOUNT_QUERY_KEY } from "./useAccount";
import { useMemo } from "react";
import agent from "../api/agent";

const PROFILE_QUERY_KEY = {
  all: ["profiles"],
  profile: (id?: string) => [...PROFILE_QUERY_KEY.all, id],
  photos: (id?: string) => [...PROFILE_QUERY_KEY.profile(id), "photos"],
};

export const useProfile = (id?: string) => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<User>(ACCOUNT_QUERY_KEY.user());

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: PROFILE_QUERY_KEY.profile(id as string),
    queryFn: () => getProfile(id as string),
    enabled: !!id,
  });

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: ({ id, profile }: { id: string; profile: Profile }) =>
      updateProfileApi(id, profile),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY.profile(id),
      });
      queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY.user() });
    },
  });

  const { data: photos, isLoading: isLoadingPhotos } = useQuery({
    queryKey: PROFILE_QUERY_KEY.photos(id as string),
    queryFn: () => getProfilePhotos(id as string),
    enabled: !!id,
  });
  const { mutateAsync: uploadPhoto, isPending: isUploadingPhoto } = useMutation(
    {
      mutationFn: async (file: Blob) => {
        const formData = new FormData();

        formData.append("file", file);
        const response = await agent.post<Photo>("/profiles/photo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: PROFILE_QUERY_KEY.all,
        });
      },
    }
  );

  const { mutate: setMainPhoto, isPending: isSettingMainPhoto } = useMutation({
    mutationFn: async (id: string) => {
      const response = await agent.put(`/profiles/photo/${id}/main`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY.all,
      });
      await queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY.profile(id as string),
      });
      await queryClient.invalidateQueries({
        queryKey: ACCOUNT_QUERY_KEY.user(),
      });
    },
  });

  const { mutate: deletePhoto, isPending: isDeletingPhoto } = useMutation({
    mutationFn: async (id: string) => {
      const response = await agent.delete(`/profiles/photo/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY.all,
      });
      await queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY.photos(id as string),
      });
      await queryClient.invalidateQueries({
        queryKey: ACCOUNT_QUERY_KEY.user(),
      });
    },
  });

  const isCurrentUser = useMemo(() => {
    if (!user || !profile) return false;
    return user?.id === profile?.id;
  }, [user, profile]);

  return {
    profile,
    isLoadingProfile,
    photos,
    isLoadingPhotos,
    updateProfile,
    isUpdatingProfile,
    isCurrentUser,
    uploadPhoto,
    isUploadingPhoto,
    setMainPhoto,
    isSettingMainPhoto,
    deletePhoto,
    isDeletingPhoto,
  };
};
