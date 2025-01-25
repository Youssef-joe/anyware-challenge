import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Sidebar = () => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current,
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#1a237e",
          color: "white",
        },
      }}
    >
      <List ref={sidebarRef}>
        {[
          { text: "Announcements", icon: <InboxIcon /> },
          { text: "Quizzes", icon: <InboxIcon /> },
          { text: "Assignments", icon: <InboxIcon /> },
        ].map(({ text, icon }, index) => (
          <ListItem
            button
            key={text}
            sx={{
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#1a237e",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
