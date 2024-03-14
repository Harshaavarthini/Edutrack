import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const isAdmin = localStorage.getItem("isAdmin");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#db7dc2" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          {isAdmin === "true"
            ? `Admin ${localStorage.getItem("username")} Dashboard`
            : `User ${localStorage.getItem("username")} Dashboard`}
        </Typography>

        <React.Fragment>
          <Button
            sx={{ margin: "1rem" }}
            color="inherit"
            component={Link}
            to={
              isAdmin === "true"
                ? "/admin/alltask"
                : `/student/${localStorage.getItem("studentId")}`
            }
          >
            {isAdmin === "true" ? "All Tasks" : "My Tasks"}
          </Button>

          {isAdmin === "true" ? (
            <Button
              sx={{ margin: "1rem" }}
              color="inherit"
              component={Link}
              to="/admin"
            >
              All Students
            </Button>
          ) : (
            <Button
              sx={{ margin: "1rem" }}
              color="inherit"
              component={Link}
              to="/student/pending"
            >
              Pending Tasks
            </Button>
          )}
        </React.Fragment>
        {isAdmin === "true" ? (
          <Button
            sx={{ margin: "1rem" }}
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <>
            {/* <Tooltip title="Deadline is nearing for 4 tasks">
              <IconButton>
                <Badge badgeContent={4} color="primary">
                  <MailIcon color="action" />
                </Badge>
              </IconButton>
            </Tooltip> */}
            <IconButton
              sx={{ margin: "1rem" }}
              color="inherit"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={Link}
                to="/account"
                onClick={handleMenuClose}
              >
                Account
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
