import { useParams } from "react-router";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useProfile } from "@/libs/hooks/useProfiile";
import PhotoUploadWidget from "@/shared/components/PhotoUploadWidget";
import StarButton from "@/shared/components/StartButton";
import DeleteButton from "@/shared/components/DeleteButton";

export default function ProfilePhotos() {
  const { id } = useParams();
  const { photos, isCurrentUser, uploadPhoto, setMainPhoto, deletePhoto } =
    useProfile(id);

  const [editMode, setEditMode] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleUpload = useCallback(
    async (file: Blob) => {
      await uploadPhoto(file, {
        onSuccess: () => {
          setEditMode(false);
        },
      });
    },
    [uploadPhoto]
  );

  const handleDelete = (photoId: string) => {
    setDeleteConfirm(photoId);
  };
  const confirmDelete = () => {
    if (deleteConfirm) {
      deletePhoto(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Photos</Typography>

        {isCurrentUser && (
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancel" : "Add photo"}
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box>
        {editMode ? (
          <PhotoUploadWidget onUpload={handleUpload} />
        ) : (
          <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
            <>
              {photos?.map((photo) => (
                <ImageListItem key={photo.id}>
                  <img alt={"user profile image"} src={photo.url} />

                  {isCurrentUser && (
                    <Box
                      sx={{ position: "absolute", top: 0, left: 0 }}
                      onClick={() => {
                        setMainPhoto(photo.id);
                      }}
                    >
                      <StarButton selected={photo.isMain} />
                    </Box>
                  )}

                  {isCurrentUser && !photo.isMain && (
                    <Box
                      sx={{ position: "absolute", top: 0, right: 0 }}
                      onClick={() => handleDelete(photo.id)}
                    >
                      <DeleteButton />
                    </Box>
                  )}
                  <Dialog open={!!deleteConfirm} onClose={cancelDelete}>
                    <DialogTitle>Delete Photo</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete this photo? This action
                        cannot be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={cancelDelete}>Cancel</Button>
                      <Button
                        onClick={confirmDelete}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ImageListItem>
              ))}
            </>
          </ImageList>
        )}
      </Box>
    </Box>
  );
}
