'use client'; // Mark as a Client Component

import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import AnnouncementList from '../../components/AnnouncementList';
import QuizList from '../../components/QuizList';
import requireAuth from '../../components/requireAuth';
import { Announcement, Quiz } from './../../types'; // Define types for announcements and quizzes

const Dashboard = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  // Fetch announcements and quizzes on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcementsResponse = await fetch('http://localhost:5000/api/announcements');
        const announcementsData: Announcement[] = await announcementsResponse.json();
        setAnnouncements(announcementsData);

        const quizzesResponse = await fetch('http://localhost:5000/api/quizzes');
        const quizzesData: Quiz[] = await quizzesResponse.json();

        // Parse dueDate into Date objects
        const quizzesWithDates = quizzesData.map((quiz) => ({
          ...quiz,
          dueDate: new Date(quiz.dueDate),
        }));

        setQuizzes(quizzesWithDates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Add a new announcement
  const handleAddAnnouncement = async (newAnnouncement: Announcement) => {
    try {
      const response = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnnouncement),
      });
      const data: Announcement = await response.json();
      setAnnouncements([...announcements, data]);
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  // Update an announcement
  const handleUpdateAnnouncement = async (id: string, updatedAnnouncement: Announcement) => {
    try {
      const response = await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnnouncement),
      });
      const data: Announcement = await response.json();
      setAnnouncements(
        announcements.map((announcement) =>
          announcement._id === data._id ? data : announcement
        )
      );
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };

  // Delete an announcement
  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: 'DELETE',
      });
      setAnnouncements(announcements.filter((announcement) => announcement._id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  // Add a new quiz
  const handleAddQuiz = async (newQuiz: Quiz) => {
    try {
      const response = await fetch('http://localhost:5000/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuiz),
      });
      const data: Quiz = await response.json();
      setQuizzes([...quizzes, data]);
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  // Update a quiz
  const handleUpdateQuiz = async (id: string, updatedQuiz: Quiz) => {
    try {
      const response = await fetch(`http://localhost:5000/api/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuiz),
      });
      const data: Quiz = await response.json();
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === data._id ? { ...data, dueDate: new Date(data.dueDate) } : quiz))
      );
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  // Delete a quiz
  const handleDeleteQuiz = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/quizzes/${id}`, {
        method: 'DELETE',
      });
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '16%', minWidth: '200px' }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Announcements Section */}
        <AnnouncementList
          announcements={announcements}
          onAdd={handleAddAnnouncement}
          onUpdate={handleUpdateAnnouncement}
          onDelete={handleDeleteAnnouncement}
        />

        {/* Quizzes Section */}
        <QuizList
          quizzes={quizzes}
          onAdd={handleAddQuiz}
          onUpdate={handleUpdateQuiz}
          onDelete={handleDeleteQuiz}
        />
      </div>
    </div>
  );
};

export default requireAuth(Dashboard);