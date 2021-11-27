import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCircles } from './circlesAPI';

interface CirclesState {
    circles: any[];
    loading: boolean;
    error: string;
}

const initialState: CirclesState = {
    circles: null,
    loading: true,
    error: null,
};

export const getCirclesAction = createAsyncThunk('circles/getCircles', async (_, {getState}) => {
    console.log('getCirclesAction');
    const {auth: {user}} = getState();
    return await getCircles(user['id'], user['auth-token'])
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

export const circleSlice = createSlice({
    name: 'circles',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCirclesAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCirclesAction.fulfilled, (state, action) => {
                console.log(action);
                if (action.payload.status === "success") {
                    state.circles = action.payload.data;
                    console.log("circles", state.circles);
                    state.loading = false;
                } else {
                    state.error = action.payload.error;
                    state.loading = false;
                }
            })
    }
    });

export const {  } = circleSlice.actions;

export default circleSlice.reducer;