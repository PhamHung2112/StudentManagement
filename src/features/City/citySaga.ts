import { PayloadAction } from '@reduxjs/toolkit';
import cityApi from 'api/cityApi';
import { City, ListParams, ListResponse } from 'models';
import { toast } from 'react-toastify';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* fetchCityList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll, action.payload);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    yield put(cityActions.fetchCityListFailed());
    yield call(toast.error, (error as Error).message);
  }
}

function* fetchCityListWithDebounce(action: PayloadAction<ListParams>) {
  yield put(cityActions.setFilter(action.payload));
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
  yield debounce(500, cityActions.setFilterWithDebounce.type, fetchCityListWithDebounce);
}
