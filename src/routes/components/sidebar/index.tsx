import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Home, Info, Settings, TollOutlined, Book } from "@mui/icons-material";

import { useSidebar } from "../../context/SidebarContext";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", icon: <Home />, link: "/" },
    { text: "Integrações", icon: <TollOutlined />, link: "/integrations" },
    { text: "RPIs", icon: <Book />, link: "/rpis" },
    { text: "Sobre", icon: <Info />, link: "/about" },
    { text: "Configurações", icon: <Settings />, link: "/settings" },
  ];

  const handlePageClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Drawer anchor="left" open={isOpen} onClose={() => toggleSidebar(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleSidebar(false)}
          onKeyDown={() => toggleSidebar(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => handlePageClick(item.link)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
