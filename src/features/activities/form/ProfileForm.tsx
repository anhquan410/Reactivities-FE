/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-empty-pattern */
import { useProfile } from "@/libs/hooks/useProfiile";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

type Props = {};

export default function ProfileForm({}: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { profile, updateProfile } = useProfile(id);

  //Form State
  const [formValue, setFormValue] = useState({
    displayName: "",
    email: "",
    imageUrl: "",
  });

  // Update form values when activity data loads (for edit mode)
  useEffect(() => {
    if (profile && isEdit) {
      setFormValue({
        displayName: profile.displayName || "",
        email: profile.email || "",
        imageUrl: profile.imageUrl || "",
      });
    }
  }, [profile, isEdit]);

  // Handle form field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profileData = { ...formValue };

    updateProfile(
      { id: id!, profile: profileData as unknown as Profile },
      {
        onSuccess: () => {
          console.log("Profile updated successfully");
          navigate(`/profiles/${id}`);
        },
        onError: (error, variable, context) => {
          console.log(error, variable, context);
        },
      }
    );
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Edit Profile
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit}
      >
        <TextField
          name="displayName"
          label="Display Name"
          value={formValue.displayName}
          onChange={handleInputChange}
        />
        <TextField
          name="email"
          label="Email"
          multiline
          rows={3}
          value={formValue.email}
          onChange={handleInputChange}
        />
        <TextField
          name="imageUrl"
          label="Image Url"
          value={formValue.imageUrl}
          onChange={handleInputChange}
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" component={Link} to={`/profiles/${id}`}>
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
