import { PayloadAction } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import { push } from 'connected-react-router';
import { PathEnum } from 'constants/path';
import { StorageEnum } from 'constants/storage';
import { User, UserPayload } from 'models';
import { toast } from 'react-toastify';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { authActions } from './authSlice';

function* handleRegister(action: PayloadAction<UserPayload>) {
  try {
    const response: User = yield call(userApi.register, action.payload);
    yield put(authActions.registerSuccess(response));
    yield call(toast.success, 'Register successfully', {
      theme: 'colored',
    });
    yield put(push(PathEnum.LOGIN));
  } catch (error) {
    yield put(authActions.registerFailed());
    yield call(toast.error, (error as Error).message, {
      theme: 'colored',
    });
  }
}

function* handleLogin(action: PayloadAction<UserPayload>) {
  try {
    const response: User = yield call(userApi.login, action.payload);
    yield put(authActions.loginSuccess(response));
    localStorage.setItem(StorageEnum.TOKEN, response.jwt);
    localStorage.setItem(StorageEnum.USER, JSON.stringify(response.user));
    yield put(push(PathEnum.DASHBOARD));
  } catch (error) {
    yield put(authActions.loginFailed());
    yield call(toast.error, (error as Error).message, {
      theme: 'colored',
    });
  }
}

function* handleLogout() {
  localStorage.removeItem(StorageEnum.TOKEN);
  localStorage.removeItem(StorageEnum.USER);
  yield push(PathEnum.LOGIN);
}

function* watchRegisterFlow() {
  yield takeLatest(authActions.register.type, handleRegister);
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem(StorageEnum.TOKEN));

    if (!isLoggedIn) {
      const action: PayloadAction<UserPayload> = yield take(authActions.login);
      yield fork(handleLogin, action);
    }

    yield take([authActions.logout.type, authActions.loginFailed.type]);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield all([call(watchLoginFlow), call(watchRegisterFlow)]);
}
