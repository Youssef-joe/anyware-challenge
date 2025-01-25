import { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Button, TextField, Box } from '@mui/material';
import { Quiz } from '../types';

interface QuizListProps {
  quizzes: Quiz[];
  onUpdate: (id: string, updatedQuiz: Quiz) => void;
  onDelete: (id: string) => void;
}

const QuizList = ({ quizzes, onUpdate, onDelete }: QuizListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Quiz>({
    _id: '',
    title: '',
    dueDate: new Date(),
    topic: '',
    course: '',
  });

  // Handle edit button click
  const handleEditClick = (quiz: Quiz) => {
    setEditingId(quiz._id);
    setEditForm(quiz);
  };

  // Handle form input changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === 'dueDate' ? new Date(value) : value,
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
        Quizzes
      </Typography>

      {/* List of Quizzes */}
      <List>
        {quizzes.map((quiz) => (
          <ListItem key={quiz._id} sx={{ mb: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
            {editingId === quiz._id ? (
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
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={editForm.dueDate.toISOString().split('T')[0]}
                  onChange={handleEditChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Topic"
                  name="topic"
                  value={editForm.topic}
                  onChange={handleEditChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Course"
                  name="course"
                  value={editForm.course}
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
              // Display Quiz
              <>
                <ListItemText
                  primary={quiz.title}
                  secondary={`Due: ${new Date(quiz.dueDate).toLocaleDateString()} - ${quiz.topic} (${quiz.course})`}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" onClick={() => handleEditClick(quiz)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => onDelete(quiz._id)}>
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

export default QuizList;