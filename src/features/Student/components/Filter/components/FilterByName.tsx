import { Search } from '@mui/icons-material';
import { Box, FormControl, OutlinedInput, Typography } from '@mui/material';
import { ListParams } from 'models';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export interface FilterByNameProps {
  filter: ListParams;

  onChange?: (newFilter: ListParams) => void;
}

export default function FilterByName({ filter, onChange }: FilterByNameProps) {
  const [value, setValue] = useState<string>('');
  const typingTimeoutRef = useRef<any>();

  useEffect(() => {
    const value = filter.name_like ? filter.name_like : '';
    setValue(value);
  }, [filter.name_like]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const value = e.target.value;

    setValue(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onChange({ name_like: value ? value : undefined });
    }, 500);
  };

  return (
    <Box marginBottom="20px">
      <Typography variant="body1" fontWeight={500} marginBottom="10px">
        Name
      </Typography>
      <FormControl variant="outlined" fullWidth>
        <OutlinedInput endAdornment={<Search />} onChange={handleChange} value={value} />
      </FormControl>
    </Box>
  );
}
