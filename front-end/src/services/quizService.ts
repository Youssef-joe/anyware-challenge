const API_URL = 'http://localhost:5000/api/quizzes';

export const getQuizzes = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createQuiz = async (quiz: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quiz),
  });
  return response.json();
};

export const updateQuiz = async (id: any, quiz: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quiz),
  });
  return response.json();
};

export const deleteQuiz = async (id: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};