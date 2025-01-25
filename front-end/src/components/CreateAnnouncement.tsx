import { useState } from 'react';
import { createAnnouncement } from '../services/announcementService';

interface CreateAnnouncementProps {
  onAdd: (data: any) => void;
}

const CreateAnnouncement = ({ onAdd }: CreateAnnouncementProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newAnnouncement = { title, content, author };
    const data = await createAnnouncement(newAnnouncement);
    onAdd(data); // Update the parent component's state
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="submit">Add Announcement</button>
    </form>
  );
};

export default CreateAnnouncement;