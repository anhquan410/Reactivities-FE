import { useParams } from "react-router";
import {
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function ProfilePhotos() {
  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Photos</Typography>

        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Add photo"}
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box>
        <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <ImageListItem key={index}>
                <img
                  alt={"user profile image"}
                  src={`https://picsum.photos/200/200?random=${index}`}
                />

                <div>
                  <Box sx={{ position: "absolute", top: 0, left: 0 }}></Box>

                  <Box sx={{ position: "absolute", top: 0, right: 0 }}></Box>
                </div>
              </ImageListItem>
            ))}
          </>
        </ImageList>
      </Box>
    </Box>
  );
}
