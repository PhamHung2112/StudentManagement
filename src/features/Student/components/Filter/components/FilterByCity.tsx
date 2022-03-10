import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { ListParams } from 'models';
import { ChangeEvent } from 'react';
import { CityOptions } from '../StudentFilter';

export interface FilterByCityProps {
  options: CityOptions[];
  filter: ListParams;

  onChange?: (newFilter: ListParams) => void;
}

export default function FilterByCity({ options, filter, onChange }: FilterByCityProps) {
  const handleChange = (e: ChangeEvent<any>, value: string) => {
    if (!onChange) return;

    const newValue = {
      city: value ? value : undefined,
    };

    onChange(newValue);
  };

  return (
    <Box marginBottom="20px">
      <Typography variant="body1" fontWeight={500} marginBottom="10px">
        City
      </Typography>

      <Box>
        <FormControl component="fieldset" variant="standard">
          <RadioGroup value={filter.city ? filter.city : ''} onChange={handleChange} name="city">
            <FormControlLabel value="" control={<Radio />} label="All" />
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
}
