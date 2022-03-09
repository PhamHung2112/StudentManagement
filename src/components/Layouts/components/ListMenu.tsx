import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export interface ListMenuOptions {
  icon: ReactElement;
  label: string;
  path: string;
}

export interface ListMenuProps {
  options: ListMenuOptions[];
}

export default function ListMenu({ options }: ListMenuProps) {
  const location = useLocation();

  return (
    <List sx={{ m: 0 }}>
      {options.map((option, index) => (
        <NavLink to={option.path} style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
          <ListItem sx={{ padding: '5px 15px', backgroundColor: 'none' }}>
            <ListItemButton
              sx={
                location.pathname === option.path
                  ? {
                      padding: '5px 15px',
                      backgroundColor: (theme) => theme.palette.action.selected,
                      '&>div': {
                        minWidth: '40px',
                        color: (theme) => theme.palette.primary.main,
                      },
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.action.selected,
                      },
                    }
                  : {
                      padding: '5px 15px',
                      '&>div': { minWidth: '40px' },
                      '&:hover': {
                        '&>div': {
                          color: (theme) => theme.palette.primary.main,
                        },
                      },
                    }
              }
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      ))}
    </List>
  );
}
