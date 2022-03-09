import { Female, Male, Mood, MoodBad, Refresh } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ListSkeleton from 'components/Layouts/components/ListSkeleton';
import { useEffect } from 'react';
import ListStudent from '../components/ListStudent';
import StatisticItem from '../components/StatisticItem';
import Widget from '../components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCity,
} from '../dashboardSlice';

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectDashboardLoading);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const statistics = useAppSelector(selectDashboardStatistics);
  const rankingByCity = useAppSelector(selectRankingByCity);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  const handleRefreshDashboard = () => {
    dispatch(dashboardActions.fetchData());
  };

  return (
    <Box margin="100px 30px 0 30px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" fontWeight={500} marginBottom="5px">
            Dashboard
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="inherit">Home</Typography>
            <Typography color="text.primary">Dashboard</Typography>
          </Breadcrumbs>
        </Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            color="primary"
            onClick={handleRefreshDashboard}
          >
            Refresh
          </Button>
        </Box>
      </Box>
      <Box padding="30px">
        <Box>
          <Typography variant="h5" mb={3} sx={{ textDecoration: 'underline' }}>
            Statistics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3} xl={3}>
              <StatisticItem
                label="Male"
                value={statistics.maleCount}
                icon={<Male fontSize="large" color="primary" />}
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3}>
              <StatisticItem
                label="Female"
                value={statistics.femaleCount}
                icon={<Female fontSize="large" color="secondary" />}
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3}>
              <StatisticItem
                label="High score"
                value={statistics.highMarkCount}
                icon={<Mood fontSize="large" color="success" />}
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3}>
              <StatisticItem
                label="Low score"
                value={statistics.lowMarkCount}
                icon={<MoodBad fontSize="large" color="warning" />}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={3}>
          <Typography variant="h5" mb={3} sx={{ textDecoration: 'underline' }}>
            Student List
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              {loading ? (
                <ListSkeleton />
              ) : (
                <Widget label="Highest score">
                  <ListStudent studentList={highestStudentList} />
                </Widget>
              )}
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              {loading ? (
                <ListSkeleton />
              ) : (
                <Widget label="Lowest score">
                  <ListStudent studentList={lowestStudentList} />
                </Widget>
              )}
            </Grid>
          </Grid>
        </Box>

        <Box mt={3}>
          <Typography variant="h5" mb={3} sx={{ textDecoration: 'underline' }}>
            Ranking By City
          </Typography>
          <Grid container spacing={2}>
            {rankingByCity.map((x) => (
              <Grid item xs={12} lg={6} xl={3} md={6} key={x.cityId}>
                {loading ? (
                  <ListSkeleton />
                ) : (
                  <Widget label={x.cityName}>
                    <ListStudent studentList={x.studentList} />
                  </Widget>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
