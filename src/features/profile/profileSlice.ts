import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRankings } from './rankingsAPI';

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
})

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
        });
    }
});

export const {  } = profileSlice.actions;

export default profileSlice.reducer;