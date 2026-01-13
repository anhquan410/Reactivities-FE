import { useActivities } from "@/libs/hooks/useActivities";
import { Box, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";

import { useEffect } from "react";
import ActivityCard from "./ActivityCard";
import ActivityCardSkeleton from "./ActivityCardSkeleton";
import ActivityListSkeleton from "./ActivityListSkeleton";

export default function ActivityList() {
  const {
    activitiesGrouped,
    isPending,

    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useActivities();
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isPending) return <ActivityListSkeleton />;

  if (!activitiesGrouped)
    return <Typography variant="h5">No activities found</Typography>;

  const lastPageIndex = activitiesGrouped.pages.length - 1;
  const lastPage = activitiesGrouped.pages[lastPageIndex];
  const lastActivityIndex = lastPage.items?.length
    ? lastPage.items.length - 1
    : 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activitiesGrouped.pages.map((activities, pageIndex) => (
        <Box key={pageIndex} display="flex" flexDirection="column" gap={3}>
          {activities.items?.map((activity, activityIndex) => {
            const isLastActivity =
              pageIndex === lastPageIndex &&
              activityIndex === lastActivityIndex;

            const activityRef =
              isLastActivity && hasNextPage && !isFetchingNextPage ? ref : null;

            return (
              <Box ref={activityRef} key={activity.id}>
                <ActivityCard activity={activity} />
                {isLastActivity && isFetchingNextPage && (
                  <Box sx={{ mt: 2 }}>
                    <ActivityCardSkeleton />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}
