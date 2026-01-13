/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-empty-pattern */
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "./../../../../node_modules/@hookform/resolvers/zod/src/zod";
import { ActivityFormValues, activitySchema } from "@/libs/schemas/activity";
import { useActivities } from "@/libs/hooks/useActivities";
import { useEffect } from "react";
import TextInput from "@/shared/components/TextInput";
import SelectInput from "@/shared/components/SelectInput";
// import DateTimeInput from "@/shared/components/DateTimeInput";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {};

export const categoryOptions = [
  { text: "Music", value: "music" },
  { text: "Art", value: "art" },
  { text: "Food", value: "food" },
  { text: "Drinks", value: "drinks" },
  { text: "Culture", value: "culture" },
  { text: "Travel", value: "travel" },
  { text: "Sports", value: "sports" },
  { text: "Other", value: "other" },
];

export default function ActivityForm({}: Props) {
  const { handleSubmit, reset, control } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      city: "",
      venue: "",
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { activity, createActivity, updateActivity } = useActivities(id);

  useEffect(() => {
    if (isEdit && activity) {
      const defaultValues = {
        title: activity.title,
        description: activity.description,
        category: activity.category,
        date: new Date(activity.date).toISOString().split("T")[0], // Convert to YYYY-MM-DD
        city: activity.city,
        venue: activity.venue,
      };
      reset(defaultValues);
    }
  }, [isEdit, activity, reset]);

  const onSubmit = (activityData: ActivityFormValues) => {
    if (isEdit) {
      updateActivity(
        { id: id!, activity: activityData },
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
      createActivity(activityData, {
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput label="Title" name="title" control={control} />
        <TextInput
          label="Description"
          name="description"
          control={control}
          multiline
          rows={3}
        />
        <SelectInput
          options={categoryOptions}
          label="Category"
          control={control}
          name="category"
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimeInput label="Date" name="date" control={control} />
          </DemoContainer>
        </LocalizationProvider> */}
        <TextInput label="Date" name="date" type="date" control={control} />
        <TextInput label="City" name="city" control={control} />
        <TextInput label="Venue" name="venue" control={control} />
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
