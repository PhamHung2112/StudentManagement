import { Dashboard, Home, LocationCity, People } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import logo from 'assets/images/logo.svg';
import { PathEnum } from 'constants/path';
import ListMenu from '../components/ListMenu';

const MAIN_MENU = [
  {
    icon: <Home />,
    label: 'Homepage',
    path: PathEnum.HOME_PAGE,
  },
  {
    icon: <Dashboard />,
    label: 'Dashboard',
    path: PathEnum.DASHBOARD,
  },
];

const MANAGEMENT_MENU = [
  {
    icon: <People />,
    label: 'Student',
    path: PathEnum.STUDENT_LIST,
  },
  {
    icon: <LocationCity />,
    label: 'City',
    path: PathEnum.CITY_LIST,
  },
];

export function Sidebar() {
  return (
    <Box borderRight="1px solid rgba(0, 0, 0, 0.05)" height="100%">
      <Box
        padding="15px 0"
        marginBottom="30px"
        textAlign="center"
        borderBottom="1px solid rgba(0, 0, 0, 0.05)"
      >
        <img src={logo} alt="logo" width="165px" />
      </Box>
      <Box>
        <Box marginBottom="10px">
          <Typography variant="caption" color="GrayText" padding="5px 25px 5px 25px">
            MAIN
          </Typography>
          <ListMenu options={MAIN_MENU} />
        </Box>
        <Box>
          <Typography variant="caption" color="GrayText" padding="5px 25px 5px 25px">
            MANAGEMENT
          </Typography>
          <ListMenu options={MANAGEMENT_MENU} />
        </Box>
      </Box>
    </Box>
  );
}
