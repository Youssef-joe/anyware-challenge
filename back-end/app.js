const express = require('express');
const cors = require('cors');
const announcementRoutes = require("./routes/announcements.routes");
const quizRoutes = require("./routes/quizzes.routes");

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/announcements', announcementRoutes); // Announcements API
app.use('/api/quizzes', quizRoutes); // Quizzes API

// Default route
app.get('/', (req, res) => {
  res.send('Anyware Software Backend is running!');
});

// Export the app
module.exports = app;