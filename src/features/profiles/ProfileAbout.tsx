import { Button, Grid2, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

type Props = {
  profile: Profile;
  isOwnProfile: boolean;
};

export default function ProfileAbout({ profile, isOwnProfile }: Props) {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Grid2 sx={{ mb: 3 }}>
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
        <Typography variant="h5" sx={{ mb: 2 }}>
          INFORMATION
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Name:</strong> {profile.displayName}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {profile.email}
        </Typography>
      </Grid2>
    </Paper>
  );
}
