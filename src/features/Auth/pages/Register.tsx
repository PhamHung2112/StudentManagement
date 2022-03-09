import { useAppDispatch } from 'app/hooks';
import { UserPayload } from 'models';
import { authActions } from '../authSlice';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  const dispatch = useAppDispatch();

  const initialValues: UserPayload = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  } as UserPayload;

  const handleRegister = (formValues: UserPayload) => {
    dispatch(authActions.register(formValues));
  };

  return <RegisterForm initialValues={initialValues} onSubmit={handleRegister} />;
}
