import { Box, Button, TextField, Typography } from '@mui/material';
import { ListParams } from 'models';
import { ChangeEvent, useState } from 'react';

export interface FilterByMarkProps {
  filter: ListParams;

  onChange?: (newFilter: ListParams) => void;
}

export default function FilterByMark({ filter, onChange }: FilterByMarkProps) {
  const [values, setValues] = useState({
    mark_gte: 0,
    mark_lte: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(values);
  };

  const handleClear = () => {
    setValues({
      mark_gte: 0,
      mark_lte: 0,
    });

    if (onChange) {
      onChange({
        mark_gte: undefined,
        mark_lte: undefined,
      });
    }
  };

  return (
    <Box marginBottom="20px">
      <Typography variant="body1" fontWeight={500} marginBottom="10px">
        Mark
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        sx={{ '&>span': { margin: '0 15px' } }}
        marginBottom="10px"
      >
        <TextField
          name="mark_gte"
          value={filter.mark_gte ? filter.mark_gte : values.mark_gte}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <Typography variant="body1" component="span">
          -
        </Typography>
        <TextField
          name="mark_lte"
          value={filter.mark_lte ? filter.mark_lte : values.mark_lte}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginRight: '10px' }}
        >
          Apply
        </Button>
        <Button variant="contained" color="error" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Box>
  );
}
