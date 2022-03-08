import { useAppDispatch } from 'app/hooks';
import { UserPayload } from 'models';
import { authActions } from '../authSlice';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const dispatch = useAppDispatch();

  const initialValues: UserPayload = {
    identifier: '',
    password: '',
  } as UserPayload;

  const handleLogin = (formValues: UserPayload) => {
    dispatch(authActions.login(formValues));
  };

  return <LoginForm initialValues={initialValues} onSubmit={handleLogin} />;
}
