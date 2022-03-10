import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@mui/material';
import { PathEnum } from 'constants/path';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export interface ListMenuOptions {
  icon: ReactElement;
  label: string;
  path: string;
}

export interface ListMenuProps {
  options: ListMenuOptions[];
}

export default function ListMenu({ options }: ListMenuProps) {
  return (
    <List sx={{ m: 0 }}>
      {options.map((option, index) => (
        <Box
          key={index}
          sx={{
            '& > a.active > li > div': {
              backgroundColor: (theme: Theme) => theme.palette.primary.main,

              '& > div': {
                color: '#fff',
              },
            },
          }}
        >
          <NavLink
            to={option.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
            exact={option.path === PathEnum.STUDENT_LIST ? false : true}
          >
            <ListItem disablePadding sx={{ padding: '5px 15px', backgroundColor: 'transparent' }}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '40px' }}>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </Box>
      ))}
    </List>
  );
}
