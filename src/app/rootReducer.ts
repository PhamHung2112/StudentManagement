import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import authReducer from 'features/Auth/authSlice';
import { history } from 'utils';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import dashboardReducer from 'features/Dashboard/dashboardSlice';
import cityReducer from 'features/City/citySlice';

const authConfigReducer = {
  key: 'auth',
  storage,
  whitelist: ['currentUser'],
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: persistReducer(authConfigReducer, authReducer),
  dashboard: dashboardReducer,
  city: cityReducer,
});

export default rootReducer;
