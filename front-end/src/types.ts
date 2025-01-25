export interface Announcement {
    _id: string;
    title: string;
    content: string;
    author: string;
    date?: Date;
  }
  
  export interface Quiz {
    _id: string;
    title: string;
    dueDate: Date;
    topic: string;
    course: string;
  }