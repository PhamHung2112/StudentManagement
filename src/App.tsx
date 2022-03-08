import { AuthRoute, NotFound, PrivateRoute } from 'components';
import { PathEnum } from 'constants/path';
import Login from 'features/Auth/pages/Login';
import Register from 'features/Auth/pages/Register';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <AuthRoute path={PathEnum.LOGIN} exact>
        <Login />
      </AuthRoute>

      <AuthRoute path={PathEnum.REGISTER} exact>
        <Register />
      </AuthRoute>

      <PrivateRoute path="/"></PrivateRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
