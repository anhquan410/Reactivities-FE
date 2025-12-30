import { useActivities } from "@/libs/hooks/useActivities";
import { formatDate } from "@/libs/utils/format-date";
import StyledButton from "@/shared/components/StyledButton";
import { Card, Badge, CardMedia, Box, Typography } from "@mui/material";
import { Link } from "react-router";

type Props = {
  activity: Activity;
};

export default function ActivityDetailsHeader({ activity }: Props) {
  const { updateAttendee, isUpdatingAttendee } = useActivities(activity.id);
  // console.log(activity);
  // console.log(profile);

  return (
    <Card
      sx={{
        position: "relative",
        mb: 2,
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      {activity.isCancelled && (
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

        {/* StyledButtons aligned to the right */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {activity.isHost ? (
            <>
              <StyledButton
                variant="contained"
                color={activity.isCancelled ? "success" : "error"}
                onClick={() => updateAttendee(activity.id)}
                disabled={isUpdatingAttendee}
                loading={isUpdatingAttendee}
              >
                {activity.isCancelled
                  ? "Re-activate Activity"
                  : "Cancel Activity"}
              </StyledButton>
              <StyledButton
                variant="contained"
                color="primary"
                component={Link}
                to={`/manage/${activity.id}`}
                disabled={activity.isCancelled || isUpdatingAttendee}
                loading={isUpdatingAttendee}
              >
                Manage Event
              </StyledButton>
            </>
          ) : (
            <StyledButton
              variant="contained"
              color={activity.isGoing ? "error" : "success"}
              onClick={() => updateAttendee(activity.id)}
              disabled={activity.isCancelled || isUpdatingAttendee}
              loading={isUpdatingAttendee}
            >
              {activity.isGoing ? "Cancel Attendance" : "Join Activity"}
            </StyledButton>
          )}
        </Box>
      </Box>
    </Card>
  );
}
