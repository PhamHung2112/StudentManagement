import { PathEnum } from 'constants/path';
import { StorageEnum } from 'constants/storage';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem(StorageEnum.TOKEN));

  if (!isLoggedIn) {
    <Redirect to={PathEnum.LOGIN} />;
  }

  return <Route {...props} />;
}
