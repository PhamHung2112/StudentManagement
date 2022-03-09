import { yupResolver } from '@hookform/resolvers/yup';
import { HowToReg } from '@mui/icons-material';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import RegisterImage from 'assets/images/RegisterImage.jpg';
import { InputField, PasswordField } from 'components';
import { PathEnum } from 'constants/path';
import { UserPayload } from 'models';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { selectRegisterLoading } from '../authSlice';

export interface RegisterFormProps {
  initialValues?: UserPayload;
  onSubmit?: (formValues: UserPayload) => void;
}

export default function RegisterForm({ initialValues, onSubmit }: RegisterFormProps) {
  const history = useHistory();
  const loading = useAppSelector(selectRegisterLoading);
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name')
      .test('two words', 'Please enter at least two words', (value) => {
        if (!value) return true;

        return value.split(' ').length >= 2;
      }),
    email: yup.string().required('Please enter your email').email('Email is invalid'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least six characters'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Password does not match'),
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
          flexFlow: 'row nowrap',
          alignItems: 'center',
          border: 1,
          borderColor: (theme) => theme.palette.divider,
          boxShadow: 1,
          padding: '30px',
        }}
      >
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} padding={1}>
          <Typography variant="h4" align="center" mb={2} fontWeight={500}>
            Sign up
          </Typography>

          <InputField control={control} name="fullName" label="Full name" />
          <InputField control={control} name="email" label="Email" />
          <PasswordField control={control} name="password" label="Password" />
          <PasswordField control={control} name="confirmPassword" label="Confirm password" />

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            fullWidth
            startIcon={<HowToReg />}
            disabled={loading}
          >
            Sign up {loading && <CircularProgress sx={{ ml: 1 }} size={20} />}
          </Button>
        </Box>
        <Box ml={4}>
          <img src={RegisterImage} alt="register" />
          <Typography
            variant="body1"
            mt={3}
            align="center"
            onClick={() => history.push(PathEnum.LOGIN)}
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',

              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Already have an account?
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
