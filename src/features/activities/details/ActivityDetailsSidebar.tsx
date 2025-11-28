import {
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid2,
} from "@mui/material";
import { Link } from "react-router";

type Props = {
  // Define the type for activity if needed
  activity: Activity;
};

export default function ActivityDetailsSidebar({ activity }: Props) {
  console.log(activity);
  // const following = true;
  return (
    <>
      <Paper
        sx={{
          textAlign: "center",
          border: "none",
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h6">
          {activity.attendees.length} people going
        </Typography>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <Grid2 container alignItems="center">
          <Grid2 size={8}>
            <List sx={{ display: "flex", flexDirection: "column" }}>
              {activity.attendees.map((attendee) => (
                <ListItem
                  key={attendee.id}
                  component={Link}
                  to={`/profiles/${attendee.id}`}
                >
                  <ListItemAvatar>
                    <Avatar alt={"attendee name"} src={attendee.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="h6">{attendee.displayName}</Typography>
                  </ListItemText>
                  {attendee.isHost && (
                    <Chip
                      label="Host"
                      color="warning"
                      variant="filled"
                      sx={{ borderRadius: 2 }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </Grid2>
          <Grid2
            size={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1,
            }}
          >
            {/* {isHost && (
              <Chip
                label="Host"
                color="warning"
                variant="filled"
                sx={{ borderRadius: 2 }}
              />
            )}
            {following && (
              <Typography variant="body2" color="orange">
                Following
              </Typography>
            )} */}
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
}
