import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCircles, getCircleRanking, addCustomSuperlative, getQuestionPacks } from './circlesAPI';

interface CirclesState {
    circles: any[];
    loading: boolean;
    error: string;
    questionPacks: any[];
}

const initialState: CirclesState = {
    circles: null,
    loading: true,
    error: null,
    questionPacks: null,
};

export const getCirclesAction = createAsyncThunk('circles/getCircles', async (_, {getState}) => {
    console.log('getCirclesAction');
    const {auth: {user}} = getState();
    return await getCircles(user['id'], user['auth-token'])
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        if (~~(err.response.status/100) == 4) {
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

export const getRankingsForCircleAction = createAsyncThunk('circle/getCircleRankings', async (circleId: string, {getState}) => {
    console.log('getRankingsForCircleAction');
    const {auth: {user}} = getState();
    return await getCircleRanking(user['id'], user['auth-token'], circleId)
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

export const getQuestionPacksAction = createAsyncThunk('circles/getQuestionPacks', async () => {
    console.log('getQuestionPacksAction');
    return await getQuestionPacks()
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
    });
});

export const addCustomSuperlativeAction = createAsyncThunk('circles/addCustomSuperlative', async (data: any, {getState}) => {
    console.log('addCustomSuperlativeAction');
    const {superlative, circleId } = data;
    const {auth: {user}} = getState();
    return await addCustomSuperlative(user['id'], user['auth-token'], circleId, superlative)
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        return {
            status: "failed",
        }
    });
});

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
                if (action.payload.status === "success") {
                    state.circles = action.payload.data;
                    state.loading = false;
                } else {
                    state.error = action.payload.error;
                    state.loading = false;
                }
            })
            .addCase(getRankingsForCircleAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRankingsForCircleAction.fulfilled, (state, action) => {
                console.log("action:", action);
                if (action.payload.status === "success") {
                    console.log("Success in StateCircleRank")
                    state.circles[action.meta.arg]["circle/questions"] = action.payload.data["circle/questions"]
                    state.loading = false;
                } else {
                    state.error = action.payload.error;
                    state.loading = false;
                }
            })
            .addCase(getQuestionPacksAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getQuestionPacksAction.fulfilled, (state, action) => {
                console.log("action:", action);
                if (action.payload.status === "success") {
                    state.questionPacks = action.payload.data;
                    state.loading = false;
                } else {
                    state.error = "Failed to get superlatives";
                    state.loading = false;
                }
            })
            .addCase(addCustomSuperlativeAction.fulfilled, (state, action) => {
                if (action.payload.status === "success") {
                    state.circles[action.meta.arg.circleId]["circle/questions"].push(action.payload.data)
                    console.log(state.circles[action.meta.arg.circleId]["circle/questions"])
                } else {
                    state.error = action.payload.error;
                }
            })
        }
    }
);

export const {  } = circleSlice.actions;

export default circleSlice.reducer;