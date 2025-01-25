import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {["Announcements", "Quizzes", "Assignments"].map((text, index) => (
          <ListItem
            button="true"
            key={text}
            sx={{
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
