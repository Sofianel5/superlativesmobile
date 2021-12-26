import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import User from '../../models/User';
import { requestSignup, getUser, verifyNumber, uploadProfilePicture, setPassword, login } from './authAPI';
import { saveUser, getLocalUser, removeUser } from '../../services/LocalData';
// import * as RootNavigator from '../../services/RootNavigation';
import { resetProfilePicAction } from '../profile/profileSlice';
import * as Sentry from "@sentry/react-native";
import { setUserId, recordLogin, recordLogOut, recordSignupRequest, recordSuccessfulVerify, recordUnsuccessfulVerify, recordSignup } from '../../services/Analytics';
import { requestNotificationPermission } from '../../services/Notifications';
interface AuthState {
  status: 'unauthenticated' | 'loading' | 'authenticated' | 'failed';
  user: any,
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

export const getUserAction = createAsyncThunk('auth/getUser', async () => {
    try {
        const userData = await getUser();
        console.log(userData);
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
        console.log(e);
        return {
            user: null,
            status: 'failed'
        }
    }
})

export const requestSignupAction = createAsyncThunk('auth/requestSignup', async (data: any, {getState}) => {
    recordSignupRequest(data.firstName, data.lastName, data.phone);
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

export const setPasswordAction = createAsyncThunk('auth/setPassword', async (password: string, {getState}) => {
    const {incompleteUser, tempAuthToken} = getState().auth;
    return await setPassword(tempAuthToken, incompleteUser.phone, password)
    .then(res => res.data)
    .catch(err => err.response.data);
});

export const loginAction = createAsyncThunk('auth/login', async (data: any, {dispatch}) => {
    return await login(data.phone, data.password)
    .then(res => res.data)
    .catch(err => err.response.data);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            console.log("logging out!")
            state.status = 'unauthenticated';
            state.user = null;
            state.incompleteUser = {};
            state.formErrors = {};
            state.globalErrorMessage = null;
            state.tempAuthToken = null;
            removeUser();
            recordLogOut();
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUserAction.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getUserAction.fulfilled, (state, action) => {
              console.log(action);
              state.user = action.payload.user;
              if (state.user) {
                Sentry.setUser({ id: action.payload.user["id"] });
                setUserId(action.payload.user["id"]);
                requestNotificationPermission(action.payload.user["id"], action.payload.user["auth-token"]);
              }
              state.status=action.payload.status;
          })
          .addCase(requestSignupAction.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(requestSignupAction.fulfilled, (state, action) => {
              console.log(action)
              state.status = 'unauthenticated';
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
                //   RootNavigator.navigate('Verify', {})
                  console.log(state.tempAuthToken);
              }
          })
          .addCase(verifyNumberAction.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(verifyNumberAction.fulfilled, (state, action) => {
            console.log(action)
            state.status = 'unauthenticated';
            if (action.payload.status == 'success') {
                state.globalErrorMessage = "";
                state.formErrors = {};
                state.tempAuthToken = action.payload.id
                state.incompleteUser = {
                    ...state.incompleteUser,
                    "verified": true
                }
                recordSuccessfulVerify();
            } else {
                state.globalErrorMessage = "Failed to verify number";
                state.formErrors = {phone: ["Invalid verification code"]};
                recordUnsuccessfulVerify();
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
                state.incompleteUser = {
                    ...state.incompleteUser,
                    "profile_picture": action.payload["profile-pic"]
                }
            } else {
                state.globalErrorMessage = "Failed to upload profile picture";
                state.formErrors = {};
            }
            state.status = 'unauthenticated';
        })
        .addCase(setPasswordAction.pending, (state) => {
            state.status = 'loading';
            console.log("setPasswordAction.pending")
        })
        .addCase(setPasswordAction.fulfilled, (state, action) => {
            console.log(JSON.stringify(action))
            if (action.payload.status == 'success') {
                state.globalErrorMessage = "";
                state.formErrors = {};
                state.user = action.payload.data;
                Sentry.setUser({ id: action.payload.data["id"] });
                setUserId(action.payload.data["id"]);
                requestNotificationPermission(action.payload.data["id"], action.payload.data["auth-token"]);
                recordSignup();
                saveUser(state.user);
                state.status = 'authenticated';
            } else {
                state.globalErrorMessage = "Failed to set password";
                state.formErrors = {};
            }
        })
        .addCase(loginAction.pending, (state) => {
            state.status = 'loading';
            console.log("loginAction.pending")
        })
        .addCase(loginAction.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload.status == 'success') {
                state.globalErrorMessage = null;
                state.formErrors = {};
                state.user = action.payload.data;
                Sentry.setUser({ id: action.payload.data["id"] });
                setUserId(action.payload.data["id"]);
                requestNotificationPermission(action.payload.data["id"], action.payload.data["auth-token"]);
                recordLogin();
                saveUser(state.user);
                state.status = 'authenticated';
            } else {
                state.status = 'unauthenticated';
                state.globalErrorMessage = "Failed to login";
                state.formErrors = {"password": "Incorrect password"}; // make this responsive to the error
            }
        })
        .addCase(resetProfilePicAction.fulfilled, (state, action) => {
            if (action.payload.status === 'success') {
                state.user["profile-pic"] = action.payload.data.url;
                saveUser(state.user);
            } 
        })
      },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;