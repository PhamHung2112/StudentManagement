import { Box } from '@mui/material';
import { NotFound, Sidebar } from 'components';
import { Header } from 'components/Layouts/Header/Header';
import { PathEnum } from 'constants/path';
import CityPage from 'features/City/pages';
import DashboardPage from 'features/Dashboard/pages';
import HomePage from 'features/Homepage/pages';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default function HomeLayout() {
  const match = useRouteMatch();

  return (
    <Box
      display="grid"
      gridTemplateAreas={`'sidebar header' 'sidebar main'`}
      gridTemplateColumns="250px 1fr"
      gridTemplateRows="auto 1fr"
      minHeight="100vh"
    >
      <Box gridArea="sidebar">
        <Sidebar />
      </Box>
      <Box gridArea="header">
        <Header />
      </Box>
      <Box gridArea="main" bgcolor="#f4f5f7">
        <Switch>
          <Route path={PathEnum.DASHBOARD} exact>
            <DashboardPage />
          </Route>

          <Route path={PathEnum.STUDENT_LIST} exact></Route>

          <Route path={PathEnum.CITY_LIST} exact>
            <CityPage />
          </Route>

          <Route path={match.path} exact>
            <HomePage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
