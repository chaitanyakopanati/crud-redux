import { NavLink, Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { color } from "@mui/system";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={() => navigate("/")}>
              Home
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate("/country")}>
              Country
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate("/state")}>
              State
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate("/city")}>
              City
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default Layout;
