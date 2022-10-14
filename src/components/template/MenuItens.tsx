import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import useAuth from "../../app/data/hook/useAuth";
import Link from "../../Link";
import HomeIcon from '@mui/icons-material/Home';



export default function MenuItem() {
  const { logout } = useAuth();
  return(
  <>
      <ListItemButton component={Link} noLinkStyle href="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} noLinkStyle href="/clientes">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItemButton>
      <ListItemButton component={Link} noLinkStyle href="/produtos">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Produtos" />
      </ListItemButton>
      <ListItemButton onClick={logout}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItemButton>
  </>)
}
