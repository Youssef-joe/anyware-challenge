import { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import { Quiz } from "../types";

interface QuizListProps {
  quizzes: Quiz[];
  onUpdate: (id: string, updatedQuiz: Quiz) => void;
  onDelete: (id: string) => void;
  onAdd: (newQuiz: Quiz) => void;
}

const QuizList = ({ quizzes, onUpdate, onDelete, onAdd }: QuizListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Quiz>({
    _id: "",
    title: "",
    dueDate: new Date(),
    topic: "",
    course: "",
  });
  const [addForm, setAddForm] = useState<Quiz>({
    _id: "",
    title: "",
    dueDate: new Date(),
    topic: "",
    course: "",
  });

  const handleEditClick = (quiz: Quiz) => {
    setEditingId(quiz._id);
    setEditForm(quiz);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "dueDate" ? new Date(value) : value,
    }));
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({
      ...prev,
      [name]: name === "dueDate" ? new Date(value) : value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await onUpdate(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd({ ...addForm, _id: Date.now().toString() });
    setAddForm({
      _id: "",
      title: "",
      dueDate: new Date(),
      topic: "",
      course: "",
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "left", fontWeight: "bold" }}>
        Quizzes
      </Typography>

      <Paper
        elevation={3}
        sx={{ mb: 4, p: 3, borderRadius: 2, bgcolor: "background.default" }}>
        <Typography variant="h6" gutterBottom>
          Add New Quiz
        </Typography>
        <Box
          component="form"
          onSubmit={handleAddSubmit}
          sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={addForm.title}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={addForm.dueDate.toISOString().split("T")[0]}
            onChange={handleAddChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Topic"
            name="topic"
            value={addForm.topic}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            label="Course"
            name="course"
            value={addForm.course}
            onChange={handleAddChange}
            fullWidth
          />
          <Button type="submit" variant="contained" size="large">
            Add Quiz
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Quizzes
      </Typography>

      <List sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
        {quizzes.map((quiz) => (
          <Box key={quiz._id}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                p: 2,
              }}>
              {editingId === quiz._id ? (
                <Box
                  component="form"
                  onSubmit={handleEditSubmit}
                  sx={{ width: "100%", display: "grid", gap: 2 }}>
                  <TextField
                    label="Title"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    fullWidth
                  />
                  <TextField
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    value={editForm.dueDate.toISOString().split("T")[0]}
                    onChange={handleEditChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Topic"
                    name="topic"
                    value={editForm.topic}
                    onChange={handleEditChange}
                    fullWidth
                  />
                  <TextField
                    label="Course"
                    name="course"
                    value={editForm.course}
                    onChange={handleEditChange}
                    fullWidth
                  />
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button type="submit" variant="contained">
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <ListItemText
                    primary={quiz.title}
                    secondary={`Due: ${new Date(
                      quiz.dueDate
                    ).toLocaleDateString()} | ${quiz.topic} | ${quiz.course}`}
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditClick(quiz)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => onDelete(quiz._id)}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              )}
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default QuizList;
