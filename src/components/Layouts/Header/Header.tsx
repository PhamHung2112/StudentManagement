import { Avatar, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/Auth/authSlice';
import moment from 'moment';
import { getFirstLetter } from 'utils';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

export function Header() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      right={0}
      left="250px"
      borderBottom="1px solid rgba(0, 0, 0, 0.05)"
      zIndex={1}
      padding="18px 30px"
      bgcolor="#fff"
    >
      <Box>
        <Typography variant="h5">{moment().format('dddd, MMMM D, YYYY')}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" marginRight="10px">
          {currentUser?.user.fullName}
        </Typography>
        <Avatar sx={{ bgcolor: 'primary.main' }} onClick={handleClick}>
          {getFirstLetter(currentUser?.user.fullName)}
        </Avatar>

        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
