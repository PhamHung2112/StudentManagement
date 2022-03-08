import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User, UserPayload } from 'models';

export interface AuthState {
  isRegistering: boolean;
  isLogging: boolean;

  currentUser?: User;
}

const initialState: AuthState = {
  isRegistering: false,
  isLogging: false,

  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action: PayloadAction<UserPayload>) {
      state.isRegistering = true;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.isRegistering = false;
      state.currentUser = action.payload;
    },
    registerFailed(state) {
      state.isRegistering = false;
    },

    login(state, action: PayloadAction<UserPayload>) {
      state.isLogging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLogging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state) {
      state.isLogging = false;
    },

    logout(state) {
      state.isLogging = false;
      state.isRegistering = false;
      state.currentUser = undefined;
    },
  },
});

export const authActions = authSlice.actions;

export const selectRegisterLoading = (state: RootState) => state.auth.isRegistering;
export const selectLogginLoading = (state: RootState) => state.auth.isLogging;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

const authReducer = authSlice.reducer;
export default authReducer;
