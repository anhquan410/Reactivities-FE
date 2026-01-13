import { Box, Card, CardContent, CardActions, Skeleton } from "@mui/material";

const ActivityCardSkeleton = () => (
  <Card sx={{ width: "100%", borderRadius: 3 }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ ml: 2 }}>
          <Skeleton variant="text" width={120} height={24} />
          <Skeleton variant="text" width={80} height={20} />
        </Box>
      </Box>
      <Skeleton variant="text" width="90%" height={30} />
      <Skeleton variant="text" width="70%" height={20} sx={{ mt: 1 }} />
      <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
    </CardContent>
    <CardActions>
      <Skeleton
        variant="rectangular"
        width={80}
        height={36}
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangular"
        width={100}
        height={36}
        sx={{ ml: 1, borderRadius: 2 }}
      />
    </CardActions>
  </Card>
);

export default ActivityCardSkeleton;
