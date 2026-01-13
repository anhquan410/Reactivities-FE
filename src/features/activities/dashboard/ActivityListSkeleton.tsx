import { Box } from "@mui/material";
import ActivityCardSkeleton from "./ActivityCardSkeleton";

const ActivityListSkeleton = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    {Array(3)
      .fill(0)
      .map((_, index) => (
        <ActivityCardSkeleton key={index} />
      ))}
  </Box>
);

export default ActivityListSkeleton;
