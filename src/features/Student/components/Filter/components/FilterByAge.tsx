import { Box, Button, Slider, Typography } from '@mui/material';
import { ListParams } from 'models';
import { useEffect, useState } from 'react';

export interface FilterByAgeProps {
  filter: ListParams;

  onChange?: (newFilter: ListParams) => void;
}

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 60,
    label: '60',
  },
];

export default function FilterByAge({ filter, onChange }: FilterByAgeProps) {
  const [value, setValue] = useState<number[]>(() => {
    const gte = filter.age_gte ? Number.parseInt(filter.age_gte) : 0;
    const lte = filter.age_lte ? Number.parseInt(filter.age_lte) : 0;

    return [gte, lte];
  });

  useEffect(() => {
    const gte = filter.age_gte ? Number.parseInt(filter.age_gte) : 0;
    const lte = filter.age_lte ? Number.parseInt(filter.age_lte) : 0;

    setValue([gte, lte]);
  }, [filter.age_gte, filter.age_lte]);

  const valueText = (value: number) => {
    return `${value} years old`;
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleSubmit = () => {
    if (!onChange) return;

    const [gte, lte] = value;
    const newFilter = {
      age_gte: gte || undefined,
      age_lte: lte || undefined,
    };

    onChange(newFilter);
  };

  const handleClear = () => {
    setValue([0, 0]);

    if (onChange) {
      onChange({
        age_gte: undefined,
        age_lte: undefined,
      });
    }
  };

  return (
    <Box marginBottom="20px">
      <Typography variant="body1" fontWeight={500} marginBottom="10px">
        Age
      </Typography>

      <Box>
        <Slider
          getAriaLabel={() => 'age'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          marks={marks}
          max={60}
        />
        <Button variant="contained" onClick={handleSubmit} sx={{ marginRight: '10px' }}>
          Apply
        </Button>
        <Button variant="contained" onClick={handleClear} color="error">
          Clear
        </Button>
      </Box>
    </Box>
  );
}
