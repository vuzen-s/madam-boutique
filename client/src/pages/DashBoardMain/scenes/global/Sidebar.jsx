import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import logoDashBoard from "../../../../assets/images/logoDashBoard.png";
import { tokens } from "../../theme";

import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const handleClick4 = () => {
    setOpen4(!open4);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={logoDashBoard}
                  style={{ cursor: "pointer" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Nguyen Van A
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Member
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            <List
            >
              {/* Users module */}
              <ListItemButton onClick={handleClick1} style={{ color: colors.grey[100] }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Users" />
              </ListItemButton>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/*  */}
                  <Item
                    title="List Users"
                    to="/dashboard/user"
                    icon={<StarBorder />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {/*  */}
                  <Item
                    title="Create Users"
                    to="/dashboard/user/create"
                    icon={<StarBorder />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </List>
              </Collapse>
              {/* Collections module */}
              <ListItemButton onClick={handleClick2} style={{ color: colors.grey[100] }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Collections" />
              </ListItemButton>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/*  */}
                  <Item
                    title="List Collections"
                    to="/dashboard/collection"
                    icon={<StarBorder />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {/*  */}
                  <Item
                    title="Create Collections"
                    to="/dashboard/collection/create"
                    icon={<StarBorder />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </List>
              </Collapse>
              {/* Categories module */}
              <ListItemButton onClick={handleClick3} style={{ color: colors.grey[100] }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Categories" />
              </ListItemButton>
              <Collapse in={open3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/*  */}
                  <Item
                    title="List Categories"
                    to="/dashboard/category"
                    icon={<StarBorder />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {/*  */}
                  <Item
                    title="Create Categories"
                    to="/dashboard/category/create"
                    icon={<StarBorder />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </List>
              </Collapse>
              {/* Products module */}
              <ListItemButton onClick={handleClick4} style={{ color: colors.grey[100] }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Products" />
              </ListItemButton>
              <Collapse in={open4} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/*  */}
                  <Item
                    title="List Products"
                    to="/dashboard/product"
                    icon={<StarBorder />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {/*  */}
                  <Item
                    title="Create Products"
                    to="/dashboard/product/create"
                    icon={<StarBorder />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </List>
              </Collapse>
            </List>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
