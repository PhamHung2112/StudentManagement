import { Box, Button, Typography } from '@mui/material';
import NotFoundImage from 'assets/images/NotFoundImage.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { PathEnum } from 'constants/path';

export function NotFound() {
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        flexFlow: 'row wrap',
      }}
    >
      <Box>
        <Typography variant="h3" component="h1" marginBottom={3} color="red">
          OOP! Page Not Found
        </Typography>
        <Button
          color="info"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => history.push(PathEnum.DASHBOARD)}
        >
          Go to dashboard
        </Button>
      </Box>
      <Box marginLeft={2}>
        <img src={NotFoundImage} alt="not found" />
      </Box>
    </Box>
  );
}
