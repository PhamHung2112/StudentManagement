import { Box, Breadcrumbs, Typography } from '@mui/material';
import StudentsImage from 'assets/images/StudentsImage.webp';

export default function HomePage() {
  return (
    <Box margin="100px 30px 0 30px" textAlign="center">
      <Box>
        <Typography variant="h6" fontWeight={500} marginBottom="5px" align="left">
          Homepage
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit">Home</Typography>
          <Typography color="text.primary">Homepage</Typography>
        </Breadcrumbs>
      </Box>
      <Box padding="30px">
        <img src={StudentsImage} alt="home page" />
      </Box>
    </Box>
  );
}
