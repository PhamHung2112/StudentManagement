import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ListParams } from 'models';

export interface StudentSortProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
}

export default function StudentSort({ filter, onChange }: StudentSortProps) {
  const handleSortChange = (e: SelectChangeEvent<string>) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = value.split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onChange(newFilter);
  };

  return (
    <FormControl variant="outlined" sx={{ width: '300px' }}>
      <InputLabel id="studentSort">Sort</InputLabel>
      <Select
        labelId="studentSort"
        label="Sort"
        value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
        onChange={handleSortChange}
      >
        <MenuItem value="">
          <em>No sort</em>
        </MenuItem>
        <MenuItem value="name.asc">Name Ascending</MenuItem>
        <MenuItem value="name.desc">Name Descending</MenuItem>
        <MenuItem value="mark.asc">Mark Ascending</MenuItem>
        <MenuItem value="mark.desc">Mark Descending</MenuItem>
      </Select>
    </FormControl>
  );
}
