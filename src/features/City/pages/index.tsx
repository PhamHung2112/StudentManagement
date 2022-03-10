import { Box, Breadcrumbs, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ListParams } from 'models';
import { useEffect } from 'react';
import { cityActions, selectCityFilter, selectCityList } from '../citySlice';
import CityFilters from '../components/CityFilters';
import CityTable from '../components/CityTable';

export default function CityPage() {
  const dispatch = useAppDispatch();
  const cityList = useAppSelector(selectCityList);
  const filter = useAppSelector(selectCityFilter);

  useEffect(() => {
    dispatch(cityActions.fetchCityList(filter));
  }, [dispatch, filter]);

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(cityActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(cityActions.setFilter(newFilter));
  };

  return (
    <Box margin="100px 30px 0 30px">
      <Box>
        <Typography variant="h5" fontWeight={500} marginBottom="5px">
          City
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit">Home</Typography>
          <Typography color="primary" fontWeight={500}>
            City
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box padding="30px">
        <Box>
          <Typography variant="h5" mb={3} sx={{ textDecoration: 'underline' }}>
            City Filters
          </Typography>
          <CityFilters
            filter={filter}
            onSearchChange={handleSearchChange}
            onChange={handleFilterChange}
          />
        </Box>

        <Box mt={3}>
          <Typography variant="h5" mb={3} sx={{ textDecoration: 'underline' }}>
            City List
          </Typography>
          <Container
            sx={{
              margin: 0,
              border: 1,
              borderColor: (theme) => theme.palette.divider,
              boxShadow: 1,
            }}
            maxWidth="xs"
          >
            <CityTable cityList={cityList} />
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
