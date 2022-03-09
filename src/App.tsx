import { AuthRoute, PrivateRoute } from 'components';
import { PathEnum } from 'constants/path';
import LoginPage from 'features/Auth/pages/Login';
import RegisterPage from 'features/Auth/pages/Register';
import HomeLayout from 'layout/Home/HomeLayout';
import React from 'react';
import { Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <AuthRoute path={PathEnum.LOGIN} exact>
        <LoginPage />
      </AuthRoute>

      <AuthRoute path={PathEnum.REGISTER} exact>
        <RegisterPage />
      </AuthRoute>

      <PrivateRoute path={PathEnum.HOME_PAGE}>
        <HomeLayout />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
