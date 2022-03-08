import { PathEnum } from 'constants/path';
import { StorageEnum } from 'constants/storage';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function AuthRoute(props: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem(StorageEnum.TOKEN));

  if (isLoggedIn) {
    <Redirect to={PathEnum.DASHBOARD} />;
  }

  return <Route {...props} />;
}
