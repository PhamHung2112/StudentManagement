import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/City/citySlice';
import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './AddEditPage';
import ListPage from './ListPage';

export default function StudentPage() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList({ _page: 1, _limit: 5 }));
  }, [dispatch]);

  return (
    <Switch>
      <Route path={match.url} exact>
        <ListPage />
      </Route>

      <Route path={`${match.url}/add`}>
        <AddEditPage />
      </Route>

      <Route path={`${match.url}/:studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
