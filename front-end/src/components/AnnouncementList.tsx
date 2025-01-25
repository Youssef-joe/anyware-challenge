import { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { Announcement } from "../types";

interface AnnouncementListProps {
  announcements: Announcement[];
  onUpdate: (id: string, updatedAnnouncement: Announcement) => void;
  onDelete: (id: string) => void;
  onAdd: (newAnnouncement: Announcement) => void;
}

const AnnouncementList = ({
  announcements,
  onUpdate,
  onDelete,
  onAdd,
}: AnnouncementListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Announcement>({
    _id: "",
    title: "",
    content: "",
    author: "",
  });

  const [newAnnouncement, setNewAnnouncement] = useState<Announcement>({
    _id: "",
    title: "",
    content: "",
    author: "",
  });

  const handleEditClick = (announcement: Announcement) => {
    setEditingId(announcement._id);
    setEditForm(announcement);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await onUpdate(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.content && newAnnouncement.author) {
      await onAdd({ ...newAnnouncement, _id: `${Date.now()}` }); // Generate a unique ID
      setNewAnnouncement({ _id: "", title: "", content: "", author: "" });
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold" }}>
        Announcements
      </Typography>

      {/* Add Announcement Form */}
      <Box
        component="form"
        onSubmit={handleAddSubmit}
        sx={{
          bgcolor: "#e8eaf6",
          p: 2,
          borderRadius: 2,
          mb: 4,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ color: "#1a237e", fontWeight: "bold", mb: 2 }}>
          Add Announcement
        </Typography>
        <TextField
          label="Title"
          name="title"
          value={newAnnouncement.title}
          onChange={handleAddChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Content"
          name="content"
          value={newAnnouncement.content}
          onChange={handleAddChange}
          fullWidth
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Author"
          name="author"
          value={newAnnouncement.author}
          onChange={handleAddChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ bgcolor: "#1a237e" }}>
          Add
        </Button>
      </Box>

      {/* Announcement List */}
      <List sx={{ bgcolor: "#e8eaf6", p: 2, borderRadius: 2 }}>
        {announcements.map((announcement) => (
          <ListItem
            key={announcement._id}
            sx={{
              mb: 2,
              bgcolor: "#ffffff",
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              },
            }}
          >
            {editingId === announcement._id ? (
              <Box component="form" onSubmit={handleEditSubmit} sx={{ width: "100%" }}>
                <TextField
                  label="Title"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Content"
                  name="content"
                  value={editForm.content}
                  onChange={handleEditChange}
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Author"
                  name="author"
                  value={editForm.author}
                  onChange={handleEditChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button type="submit" variant="contained" sx={{ bgcolor: "#1a237e" }}>
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setEditingId(null)}
                    sx={{ borderColor: "#1a237e", color: "#1a237e" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: "#1a237e", fontWeight: "bold" }}>
                      {announcement.title}
                    </Typography>
                  }
                  secondary={`${announcement.content} - ${announcement.author}`}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(announcement)}
                    sx={{ borderColor: "#1a237e", color: "#1a237e" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(announcement._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AnnouncementList;
