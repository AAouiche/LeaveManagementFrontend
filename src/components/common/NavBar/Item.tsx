import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem } from "react-pro-sidebar";
import { Typography, useTheme } from "@mui/material";

interface ItemProps {
    title: string;
    to: string;
    icon: React.ReactNode;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
    const theme = useTheme();
    
    return (
      <MenuItem
        active={selected === title}
        style={{ color: theme.palette.text.primary }}
        onClick={() => setSelected(title)}
        icon={icon}
        component={<NavLink to={to} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };
  
  export default Item;