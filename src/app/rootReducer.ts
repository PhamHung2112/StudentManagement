import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import authReducer from 'features/Auth/authSlice';
import { history } from 'utils';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
});

export default rootReducer;
