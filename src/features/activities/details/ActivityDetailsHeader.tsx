import { useAccount } from "@/libs/hooks/useAccount";
import { formatDate } from "@/libs/utils/format-date";
import { Card, Badge, CardMedia, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";

type Props = {
  activity: Activity;
  updateActivity: ({
    id,
    activity,
  }: {
    id: string;
    activity: Activity;
  }) => void;
};

export default function ActivityDetailsHeader({
  activity,
  updateActivity,
}: Props) {
  const { user } = useAccount();
  const [isCancelled, setIsCancelled] = useState(activity.isCancelled || false);
  const isHost = activity.hostId === user?.id;
  const isGoing = activity.attendees.some((a) => a.id === user?.id);
  const loading = false;

  const handleIsCancelled = () => {
    setIsCancelled(!isCancelled);
    const updatedActivity = { ...activity, isCancelled: !isCancelled };
    updateActivity({ id: activity.id, activity: updatedActivity });
  };

  return (
    <Card
      sx={{
        position: "relative",
        mb: 2,
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      {isCancelled && (
        <Badge
          sx={{ position: "absolute", left: 40, top: 20, zIndex: 1000 }}
          color="error"
          badgeContent="Cancelled"
        />
      )}
      <CardMedia
        component="img"
        height="300"
        image={`/images/categoryImages/${activity.category}.jpg`}
        alt={`${activity.category} image`}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          color: "white",
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)",
          boxSizing: "border-box",
        }}
      >
        {/* Text Section */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {activity.title}
          </Typography>
          <Typography variant="subtitle1">
            {/* {activity.date.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} */}
            {formatDate(activity.date)}
          </Typography>
          <Typography variant="subtitle2">
            Hosted by{" "}
            <Link
              to={`/profiles/${activity.hostId}`}
              style={{ color: "white", fontWeight: "bold" }}
            >
              {activity.host?.displayName}
            </Link>
          </Typography>
        </Box>

        {/* Buttons aligned to the right */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {isHost ? (
            <>
              <Button
                variant="contained"
                color={isCancelled ? "success" : "error"}
                onClick={handleIsCancelled}
              >
                {isCancelled ? "Re-activate Activity" : "Cancel Activity"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/manage/${activity.id}`}
                disabled={isCancelled}
              >
                Manage Event
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color={isGoing ? "primary" : "info"}
              onClick={() => {}}
              disabled={isCancelled || loading}
            >
              {isGoing ? "Cancel Attendance" : "Join Activity"}
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
}
