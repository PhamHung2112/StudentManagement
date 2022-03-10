import { Add } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Grid, Pagination, Paper, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityMap, selectCityOptions } from 'features/City/citySlice';
import { ListParams, Student } from 'models';
import queryString from 'query-string';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentList from '../components/Common/StudentList';
import StudentFilter from '../components/Filter/StudentFilter';
import StudentSort from '../components/Sort/StudentSort';
import {
  selectStudentList,
  // selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';

export default function ListPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const match = useRouteMatch();

  // const loading = useAppSelector(selectStudentLoading);
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const cityMap = useAppSelector(selectCityMap);
  const cityOptions = useAppSelector(selectCityOptions);

  const totalPages = Math.ceil(pagination._totalRows / pagination._limit);
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page as string) || 1,
      _limit: Number.parseInt(params._limit as string) || 15,
    };
  }, [location.search]);

  useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(queryParams),
    });
  }, []);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(queryParams));
  }, [dispatch, queryParams]);

  const handlePageChange = (e: ChangeEvent<any>, page: number) => {
    const filters: ListParams = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newFilter: ListParams) => {
    const filters: ListParams = {
      ...queryParams,
      ...newFilter,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilterChange = (newFilter: ListParams) => {
    const filters: ListParams = {
      ...queryParams,
      _page: 1,
      ...newFilter,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleDeleteStudent = async (student: Student) => {
    try {
      await studentApi.delete(student?.id || '');
      toast.success('Delete student successfully');

      dispatch(studentActions.fetchStudentList(queryParams));
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box margin="100px 30px 0 30px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight={500} marginBottom="5px">
            Student
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="inherit">Home</Typography>
            <Typography color="primary" fontWeight={500}>
              Student
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            color="primary"
            onClick={() => history.push(`${match.url}/add`)}
          >
            Add new student
          </Button>
        </Box>
      </Box>

      <Box padding="30px">
        <Grid container spacing={1}>
          <Grid item width="250px">
            <Paper elevation={0}>
              <StudentFilter
                filter={queryParams}
                onChange={handleFilterChange}
                cityOptions={cityOptions}
              />
            </Paper>
          </Grid>

          <Grid item flex="1 1 0">
            <Paper elevation={0}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="15px"
                marginBottom="10px"
              >
                <StudentSort filter={queryParams} onChange={handleSortChange} />

                <Typography variant="body1" fontWeight={500}>
                  Page: {pagination._page} / {totalPages}
                </Typography>
              </Box>

              <StudentList
                studentList={studentList}
                cityMap={cityMap}
                onDelete={handleDeleteStudent}
                onUpdate={handleEditStudent}
              />

              <Box display="flex" justifyContent="center" marginTop="20px" paddingBottom="20px">
                <Pagination
                  color="primary"
                  count={totalPages}
                  page={pagination._page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
