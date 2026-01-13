import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "@/libs/hooks/useActivities";

export default function ActivityList() {
  const {
    activitiesGrouped,
    isPending,
    // isFetching,
    // fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
  } = useActivities();

  if (isPending) return <Typography variant="h5">Loading...</Typography>;

  if (!activitiesGrouped) {
    return <Typography>No activities found</Typography>;
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activitiesGrouped.pages.map((activities, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={3}>
          {activities?.items?.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
