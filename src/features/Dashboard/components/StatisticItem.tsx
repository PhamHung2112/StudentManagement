import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';

export interface StatisticItemProps {
  label: string;
  icon: ReactElement;
  value: number;
}

export default function StatisticItem({ label, icon, value }: StatisticItemProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="#fff"
      padding="20px"
      boxShadow={1}
      border={1}
      borderColor={(theme) => theme.palette.divider}
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="body2" marginBottom="10px">
          {label}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
      <Box>{icon}</Box>
    </Box>
  );
}
