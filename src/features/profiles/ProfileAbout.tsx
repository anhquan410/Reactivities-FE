import { Button, Grid2, Paper } from "@mui/material";
import { Link } from "react-router";

type Props = {
  profile: Profile;
  isOwnProfile: boolean;
};

export default function ProfileAbout({ profile, isOwnProfile }: Props) {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Grid2>
        {isOwnProfile && (
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={`/editProfile/${profile.id}`}
          >
            Edit
          </Button>
        )}
      </Grid2>
      <Grid2 size={8}>
        <h2>Information about me</h2>
        <p>Name: {profile.displayName}</p>
        <p>Email: {profile.email}</p>
      </Grid2>
    </Paper>
  );
}
