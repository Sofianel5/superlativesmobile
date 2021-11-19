import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import User from '../../models/User';
import { requestSignup, getUser, verifyNumber, uploadProfilePicture } from './authAPI';
import * as RootNavigator from '../../services/RootNavigation';

interface AuthState {
  status: 'unauthenticated' | 'loading' | 'authenticated' | 'failed';
  user: User,
  incompleteUser: any,
  formErrors: any,
  globalErrorMessage: string,
  tempAuthToken: string,
}

const initialState: AuthState = {
  status: 'loading',
  user: null,
  incompleteUser: {},
  formErrors: {},
  globalErrorMessage: null,
  tempAuthToken: null,
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
        console.log(err);
        console.log(err.response);
        if (err.response.status == 400) {
            return { globalErrorMessage: "Failed",
                     formErrors: err.response.data.reason }
        } return { globalErrorMessage: "Unknown error. Check your internet connection",
                     formErrors: {} }
    });
});

export const verifyNumberAction = createAsyncThunk('auth/verifyNumber', async (verify: string, {getState}) => {
    const {incompleteUser, tempAuthToken} = getState().auth;
    return await verifyNumber(tempAuthToken, incompleteUser.phone, verify)
    .then(res => res.data)
    .catch(err => err.response.data);
});

export const uploadProfilePictureAction = createAsyncThunk('auth/uploadPfp', async (photoUri: string, {getState}) => {
    const {incompleteUser, tempAuthToken} = getState().auth;
    return await uploadProfilePicture(photoUri, tempAuthToken, incompleteUser.phone)
    .then(res => res.data)
    .catch(err => {console.log(err); return err.response.data});
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
              if (action.payload.user) {
                    state.user = action.payload.user;
                    state.status = 'authenticated';
              } else {
                    state.user = null;
                    state.status = 'unauthenticated';
              }
          })
          .addCase(requestSignupAction.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(requestSignupAction.fulfilled, (state, action) => {
              console.log(action)
              if (action.payload.globalErrorMessage) {
                  state.globalErrorMessage = action.payload.globalErrorMessage;
                  state.formErrors = action.payload.formErrors;
              } else {
                  state.tempAuthToken = action.payload.id
                  state.incompleteUser = {
                      firstName: action.meta.arg.firstName,
                      lastName: action.meta.arg.lastName,
                      phone: action.meta.arg.phone
                  }
                  state.globalErrorMessage = "";
                  state.formErrors = {};
                  RootNavigator.navigate('Verify', {})
                  console.log(state.tempAuthToken);
              }
              state.status = 'unauthenticated';
          })
          .addCase(verifyNumberAction.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(verifyNumberAction.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload.status == 'success') {
                state.globalErrorMessage = "";
                state.formErrors = {};
                state.tempAuthToken = action.payload.id
                state.incompleteUser["verified"] = true
                state.status = 'authenticated';
                RootNavigator.navigate('ProfilePic', {firstName: state.incompleteUser.firstName})
            } else {
                state.globalErrorMessage = "Failed to verify number";
                state.formErrors = {phone: "Invalid verification code"};
            }
        })
        .addCase(uploadProfilePictureAction.pending, (state) => {
            state.status = 'loading';
            console.log("uploadProfilePictureAction.pending")
        })
        .addCase(uploadProfilePictureAction.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload.status == 'success') {
                state.globalErrorMessage = "";
                state.formErrors = {};
                state.tempAuthToken = action.payload.id
                state.incompleteUser["profile_picture"] = action.payload["profile-pic"]
                RootNavigator.navigate('SetPass', {})
            } else {
                state.globalErrorMessage = "Failed to upload profile picture";
                state.formErrors = {};
            }
        })
      },
});

export const {  } = authSlice.actions;

export default authSlice.reducer;