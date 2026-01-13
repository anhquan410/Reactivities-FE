import { useActivities } from "@/libs/hooks/useActivities";
import { Box, Typography, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";

import ActivityCard from "./ActivityCard";

export default function ActivityList() {
  const {
    activitiesGrouped,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useActivities();

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isPending) return <Typography variant="h5">Loading...</Typography>;

  if (!activitiesGrouped)
    return <Typography variant="h5">No activities found</Typography>;

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={handleLoadMore}
      hasMore={hasNextPage}
      loader={
        <Box
          key="loader"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
          }}
        >
          <CircularProgress size={24} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Loading more activities...
          </Typography>
        </Box>
      }
      useWindow={true}
      threshold={250}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {activitiesGrouped.pages.map((activities, index) => (
          <Box key={index} display="flex" flexDirection="column" gap={3}>
            {activities?.items?.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </Box>
        ))}
      </Box>
    </InfiniteScroll>
  );
}
