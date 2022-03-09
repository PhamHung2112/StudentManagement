import { Box, Skeleton } from '@mui/material';

export default function ListSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={150} />
    </Box>
  );
}
