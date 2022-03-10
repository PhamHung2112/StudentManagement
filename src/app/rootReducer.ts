import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import authReducer from 'features/Auth/authSlice';
import cityReducer from 'features/City/citySlice';
import dashboardReducer from 'features/Dashboard/dashboardSlice';
import studentReducer from 'features/Student/studentSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { history } from 'utils';

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
  student: studentReducer,
});

export default rootReducer;
