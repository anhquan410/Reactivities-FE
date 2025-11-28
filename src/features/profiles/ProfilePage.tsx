import { Grid2 } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router";
import { useProfile } from "@/libs/hooks/useProfiile";
import { useAccount } from "@/libs/hooks/useAccount";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { profile, isLoadingProfile } = useProfile(id);
  const { user } = useAccount();
  const isOwnProfile = id === user?.id;

  if (isLoadingProfile) return <div>Loading profile...</div>;

  if (!profile) return <div>Profile not found</div>;

  return (
    <Grid2 container>
      <Grid2 size={12}>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} isOwnProfile={isOwnProfile} />
      </Grid2>
    </Grid2>
  );
}
