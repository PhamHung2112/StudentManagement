import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { ListParams } from 'models';
import { ChangeEvent } from 'react';

export interface FilterByGenderProps {
  filter: ListParams;

  onChange?: (newFilter: ListParams) => void;
}

export default function FilterByGender({ filter, onChange }: FilterByGenderProps) {
  const handleChange = (e: ChangeEvent<any>, value: string) => {
    if (onChange) {
      onChange({
        gender: value || undefined,
      });
    }
  };

  return (
    <Box marginBottom="20px">
      <Typography variant="body1" fontWeight={500} marginBottom="10px">
        Gender
      </Typography>

      <Box>
        <FormControl component="fieldset" variant="standard">
          <RadioGroup
            value={filter.gender ? filter.gender : ''}
            onChange={handleChange}
            name="gender"
          >
            <FormControlLabel value="" control={<Radio />} label="All" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
}
