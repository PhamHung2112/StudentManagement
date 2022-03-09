import { ArrowBack } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import NotFoundImage from 'assets/images/NotFoundImage.png';
import { PathEnum } from 'constants/path';
import { useHistory } from 'react-router-dom';

export function NotFound() {
  const history = useHistory();

  return (
    <Box position="relative" bgcolor="#252836">
      <Button
        variant="contained"
        startIcon={<ArrowBack />}
        onClick={() => history.push(PathEnum.HOME_PAGE)}
        sx={{
          position: 'absolute',
          top: '100px',
          marginLeft: '30px',
        }}
      >
        Go to homepage
      </Button>
      <img src={NotFoundImage} alt="not found" width="100%" height="100%" />
    </Box>
  );
}
