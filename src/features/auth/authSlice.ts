import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import User from '../../models/User';
import { requestSignup, getUser } from './authAPI';

interface AuthState {
  status: 'unauthenticated' | 'loading' | 'authenticated' | 'failed';
  user: User,
  formErrors: any,
  globalErrorMessage: string,
}

const initialState: AuthState = {
  status: 'loading',
  user: null,
  formErrors: {},
  globalErrorMessage: null
};

export const getUserAction = createAsyncThunk('auth/getUser', async ({getState}) => {
    try {
        const userData = await getUser();
        if (userData) {
            return {
                user: userData,
                status: 'authenticated'
            }
        } return {
            user: null,
            status: 'unauthenticated'
        }
    } catch (e) {
        return {
            user: null,
            status: 'failed'
        }
    }
})

export const requestSignupAction = createAsyncThunk('auth/requestSignup', async (data: any, {getState}) => {
    return await requestSignup(data.firstName, data.lastName, data.phone)
    .then(res => res.data)
    .catch(err => {
        if (err.response.status_code == 400) {
            return { globalErrorMessage: "Failed",
                     formErrors: err.response.data.reason }
        }
    });
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUserAction.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getUserAction.fulfilled, (state, action) => {
            state.status = action.payload.status;
            state.user = action.payload.user;
          })
          .addCase(requestSignupAction.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(requestSignupAction.fulfilled, (state, action) => {
            state.globalErrorMessage = action.payload.globalErrorMessage;
            state.formErrors = action.payload.formErrors;
          });
      },
});

export const {  } = authSlice.actions;

export default authSlice.reducer;