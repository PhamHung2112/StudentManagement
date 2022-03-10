import authSaga from 'features/Auth/authSaga';
import citySaga from 'features/City/citySaga';
import dashboardSaga from 'features/Dashboard/dashboardSaga';
import studentSaga from 'features/Student/studentSaga';
import { all, call } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([call(authSaga), call(dashboardSaga), call(citySaga), call(studentSaga)]);
}
