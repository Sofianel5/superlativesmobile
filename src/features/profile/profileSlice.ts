import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRankings, resetProfilePic } from './profileAPI';

interface ProfileState {
    rankings: any[];
    loading: boolean;
    error: string;
}

const initialState: ProfileState = {
    rankings: null,
    loading: true,
    error: null,
};

export const getRankingsAction = createAsyncThunk('profile/getRankings', async (_, {getState}) => {
    console.log('getRankingsAction');
    const {auth: {user}} = getState();
    return await getRankings(user['id'], user['auth-token'])
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        if (Math.floor(err.response.status/100) == 4) {
            return { 
                status: "failed",
                error: err.response.data.reason
            }
        } return { 
            status: "failed",
            error: "Unknown error. Check your internet connection"
        }
    });
});

export const resetProfilePicAction = createAsyncThunk('profile/resetProfilePic', async (newProfilePicUri: string, {getState}) => {
    console.log('resetProfilePicAction');
    const {auth: {user}} = getState();
    return await resetProfilePic(user['id'], user['auth-token'], newProfilePicUri)
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        if (Math.floor(err.response.status/100) == 4) {
            return {
                status: "failed",
                error: "Unauthorized"
            }
        } return {
            status: "failed",
            error: "Unknown error. Check your internet connection"
        }
    });
});


export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getRankingsAction.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getRankingsAction.fulfilled, (state, action) => {
            if (action.payload.status === 'success') {
                state.rankings = action.payload.data;
            } else {
                state.error = action.payload.error;
            }
            state.loading = false;
        })
        .addCase(resetProfilePicAction.fulfilled, (state, action) => {
            if (action.payload.status !== 'success') {
                state.error = action.payload.error;
            } 
        })

    }
});

export const {  } = profileSlice.actions;

export default profileSlice.reducer;