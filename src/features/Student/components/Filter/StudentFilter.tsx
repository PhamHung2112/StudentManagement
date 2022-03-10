import { Box, Theme } from '@mui/material';
import { ListParams } from 'models';
import FilterByAge from './components/FilterByAge';
import FilterByCity from './components/FilterByCity';
import FilterByGender from './components/FilterByGender';
import FilterByMark from './components/FilterByMark';
import FilterByName from './components/FilterByName';

export interface CityOptions {
  label: string;
  value: string;
}

export interface StudentFilterProps {
  filter: ListParams;
  cityOptions: CityOptions[];

  onChange?: (newFilter: ListParams) => void;
}

export default function StudentFilter({ filter, cityOptions, onChange }: StudentFilterProps) {
  const handleChange = (newFilter: ListParams) => {
    if (onChange) onChange(newFilter);
  };

  return (
    <Box display="flex" flexDirection="column" padding="10px">
      <Box paddingTop="20px">
        <FilterByName filter={filter} onChange={handleChange} />
      </Box>

      <Box paddingTop="20px" borderTop={(theme: Theme) => `1px solid ${theme.palette.grey[300]}`}>
        <FilterByGender filter={filter} onChange={handleChange} />
      </Box>

      <Box paddingTop="20px" borderTop={(theme: Theme) => `1px solid ${theme.palette.grey[300]}`}>
        <FilterByAge filter={filter} onChange={handleChange} />
      </Box>

      <Box paddingTop="20px" borderTop={(theme: Theme) => `1px solid ${theme.palette.grey[300]}`}>
        <FilterByMark filter={filter} onChange={handleChange} />
      </Box>

      <Box paddingTop="20px" borderTop={(theme: Theme) => `1px solid ${theme.palette.grey[300]}`}>
        <FilterByCity filter={filter} onChange={handleChange} options={cityOptions} />
      </Box>
    </Box>
  );
}
