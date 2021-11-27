import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import circleReducer from '../features/circles/circlesSlice';
import voteReducer from '../features/vote/voteSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    circles: circleReducer,
    vote: voteReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
