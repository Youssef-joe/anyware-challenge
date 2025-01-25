import { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Button, TextField, Box } from '@mui/material';
import { Announcement } from '../types';

interface AnnouncementListProps {
  announcements: Announcement[];
  onUpdate: (id: string, updatedAnnouncement: Announcement) => void;
  onDelete: (id: string) => void;
}

const AnnouncementList = ({ announcements, onUpdate, onDelete }: AnnouncementListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Announcement>({
    _id: '',
    title: '',
    content: '',
    author: '',
  });

  // Handle edit button click
  const handleEditClick = (announcement: Announcement) => {
    setEditingId(announcement._id);
    setEditForm(announcement);
  };

  // Handle form input changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await onUpdate(editingId, editForm);
      setEditingId(null); // Exit edit mode
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Announcements
      </Typography>

      {/* List of Announcements */}
      <List>
        {announcements.map((announcement) => (
          <ListItem key={announcement._id} sx={{ mb: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
            {editingId === announcement._id ? (
              // Edit Form
              <Box component="form" onSubmit={handleEditSubmit} sx={{ width: '100%' }}>
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
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                  <Button variant="outlined" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              // Display Announcement
              <>
                <ListItemText
                  primary={announcement.title}
                  secondary={`${announcement.content} - ${announcement.author}`}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" onClick={() => handleEditClick(announcement)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => onDelete(announcement._id)}>
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