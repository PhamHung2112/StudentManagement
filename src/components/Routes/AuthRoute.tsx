import { StorageEnum } from 'constants/storage';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function AuthRoute(props: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem(StorageEnum.TOKEN));

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}
