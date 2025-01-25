const API_URL = "http://localhost:5000/api/announcements";

export const getAnnouncements = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createAnnouncement = async (announcement: any) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(announcement),
  });
  return response.json();
};

export const updateAnnouncement = async (id: any, announcement: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(announcement),
  });
  return response.json();
};

export const deleteAnnouncement = async (id: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
