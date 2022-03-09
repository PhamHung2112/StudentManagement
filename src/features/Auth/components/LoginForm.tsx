import { yupResolver } from '@hookform/resolvers/yup';
import { Login } from '@mui/icons-material';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import LoginImage from 'assets/images/LoginImage.jpg';
import { InputField, PasswordField } from 'components';
import { PathEnum } from 'constants/path';
import { UserPayload } from 'models';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { selectLogginLoading } from '../authSlice';

export interface LoginFormProps {
  initialValues?: UserPayload;
  onSubmit?: (formValues: UserPayload) => void;
}

export default function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const history = useHistory();
  const loading = useAppSelector(selectLogginLoading);
  const schema = yup.object().shape({
    identifier: yup.string().required('Please enter your username'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least six characters'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues: UserPayload) => {
    if (!onSubmit) return;

    formValues.username = formValues.email;
    onSubmit(formValues);
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center">
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexFlow: 'row-reverse nowrap',
          alignItems: 'center',
          border: 1,
          borderColor: (theme) => theme.palette.divider,
          boxShadow: 1,
          padding: '30px',
        }}
      >
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} padding={1}>
          <Typography variant="h4" align="center" mb={2} fontWeight={500}>
            Login
          </Typography>

          <InputField control={control} name="identifier" label="Username" />
          <PasswordField control={control} name="password" label="Password" />

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            fullWidth
            startIcon={<Login />}
            disabled={loading}
          >
            Log in {loading && <CircularProgress sx={{ ml: 1 }} size={20} />}
          </Button>
        </Box>
        <Box mr={4}>
          <img src={LoginImage} alt="login" />
          <Typography
            variant="body1"
            mt={3}
            align="center"
            onClick={() => history.push(PathEnum.REGISTER)}
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',

              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Don't have an account?
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
