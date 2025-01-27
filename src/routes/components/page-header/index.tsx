import React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";

const MainPageHeader = () => {
  const { toggleSidebar } = useSidebar();

  const { validateLogin } = useAuth();

  const navigate = useNavigate();

  const handleClick = (open: boolean) => {
    if (validateLogin()) toggleSidebar(open);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => handleClick(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="inherit"
          color="inherit"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          RPI App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MainPageHeader;
