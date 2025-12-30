/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-empty-pattern */
import { useActivities } from "@/libs/hooks/useActivities";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Props = {};

export default function ActivityForm({}: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { createActivity, activity, updateActivity } = useActivities(id);

  //Form State
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });

  // Update form values when activity data loads (for edit mode)
  useEffect(() => {
    if (activity && isEdit) {
      setFormValue({
        title: activity.title || "",
        description: activity.description || "",
        category: activity.category || "",
        date: activity.date
          ? new Date(activity.date).toISOString().split("T")[0]
          : "",
        city: activity.city || "",
        venue: activity.venue || "",
      });
    }
  }, [activity, isEdit]);

  // Handle form field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit button click
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const activityData = { ...formValue };

    if (isEdit) {
      updateActivity(
        { id: id!, activity: activityData as unknown as Activity },
        {
          onSuccess: () => {
            navigate(`/activities/${id}`);
          },
          onError: (error, variable, context) => {
            console.log(error, variable, context);
          },
        }
      );
    } else {
      createActivity(activityData as unknown as Activity, {
        onSuccess: () => {
          navigate("/activities");
        },
        onError: (error, variable, context) => {
          console.log(error, variable, context);
        },
      });
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    if (isEdit) {
      navigate(`/activities/${id}`);
    } else {
      navigate("/activities");
    }
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {isEdit ? "Edit Activity" : "Create Activity"}
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit}
      >
        <TextField
          name="title"
          label="Title"
          value={formValue.title}
          onChange={handleInputChange}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          value={formValue.description}
          onChange={handleInputChange}
        />
        <TextField
          name="category"
          label="Category"
          value={formValue.category}
          onChange={handleInputChange}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={formValue.date}
          onChange={handleInputChange}
        />
        <TextField
          name="city"
          label="City"
          value={formValue.city}
          onChange={handleInputChange}
        />
        <TextField
          name="venue"
          label="Venue"
          value={formValue.venue}
          onChange={handleInputChange}
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" onClick={handleCancel}>
            Cancel
          </Button>

          <Button type="submit" color="success" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
