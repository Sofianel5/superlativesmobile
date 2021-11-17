import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import { requestSignup } from './authAPI';

interface AuthState {
  status: 'unauthenticated' | 'loading' | 'authenticated' | 'failed';
  user: {
    firstName: string;
    lastName: string;
    phone: string;
    authToken: string;
    profilePic: string;
};
}

const initialState: AuthState = {
  status: 'loading',
  user: null
};

export const requestSignupAction = createAsyncThunk('auth/requestSignup', async (data: any, {getState}) => {
  const response = await requestSignup(data.firstName, data.lastName, data.phone);
  return response;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getUser: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
            state.status = action.payload.status;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(requestSignupAction.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(requestSignupAction.fulfilled, (state, action) => {
            state.status = action.payload.status;
            state.user = action.payload.user;
          });
      },
});

export default authSlice.reducer;