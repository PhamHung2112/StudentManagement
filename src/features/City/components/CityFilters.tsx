import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ListParams } from 'models';
import { ChangeEvent, useRef } from 'react';

export interface CityFiltersProps {
  filter: ListParams;

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function CityFilters({ filter, onChange, onSearchChange }: CityFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilters: ListParams = {
      ...filter,
      name_like: e.target.value,
    };

    onSearchChange(newFilters);
  };

  const handleSortChange = (e: SelectChangeEvent<any>) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');

    const newFilters: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onChange(newFilters);
  };

  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      name_like: undefined,
    };
    onChange(newFilter);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box>
      <Container sx={{ margin: 0 }} maxWidth="xs">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="searchByName">Search by name</InputLabel>
              <OutlinedInput
                id="searchByName"
                endAdornment={<Search />}
                label="Search by name"
                onChange={handleSearchChange}
                defaultValue={filter.name_like}
                inputRef={searchRef}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4} md={12} lg={12} xl={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="sortBy">Sort</InputLabel>
              <Select
                labelId="sortBy"
                label="Sort"
                value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                onChange={handleSortChange}
              >
                <MenuItem value="">
                  <em>No sort</em>
                </MenuItem>
                <MenuItem value="name.asc">Name ASC</MenuItem>
                <MenuItem value="name.desc">Name DESC</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClearFilter}
              size="large"
              fullWidth
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
