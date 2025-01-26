import React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Tab, Tabs } from "@mui/material";

const MainPageHeader = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
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
        <Typography
          variant="inherit"
          color="inherit"
          component="div"
          sx={{ alignItems: "center" }}
        >
          <Box
            sx={{
              cursor: "pointer",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={"value"}
              textColor="secondary"
              indicatorColor="secondary"
              onChange={(event, newValue) => {
                navigate(newValue);
              }}
              aria-label="basic tabs example"
            >
              <Tab value="/" label="INTEGRAÇÕES" />
              <Tab value="/rpis" label="RPI" />
            </Tabs>
          </Box>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MainPageHeader;
