import { delay } from 'redux-saga/effects';

export default function* rootSaga() {
  yield delay(500);
  console.log('root saga');
}
