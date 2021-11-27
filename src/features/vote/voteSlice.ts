import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCirclesAction, addCustomSuperlativeAction } from '../circles/circlesSlice';
import { submitVote, getNewQuestion } from './voteAPI';

interface VoteState {
    selectedCircle: any;
    loading: boolean;
    question: any;
    userA: any,
    userB: any,
    user: any,
    error: string;
}

const initialState: VoteState = {
    selectedCircle: null,
    loading: true,
    question: null,
    userA: null,
    userB: null,
    user: null,
    error: null,
};

export const getQuestion = createAsyncThunk('vote/getQuestion', async (_, {getState}) => {
    console.log('getQuestion');
    var {circles: {circles}, vote: {selectedCircle}, auth: {user}} = getState();
    if (!selectedCircle) {
        // Make sure that this circle has at least 2 other users
        selectedCircle = Object.values(circles)[0];
    }
    return getNewQuestion(selectedCircle, user)
})

export const submitVoteAction = createAsyncThunk('vote/submitVote', async (data: any, {getState}) => {
    console.log('submitVoteAction');
    const { auth: {user}} = getState();
    return await submitVote(user['id'], user['auth-token'], data.questionId, data.winnerId, data.loserId)
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        if (~~(err.response.status/100) == 4) {
            return {
                status: "failed",
            }
        }
    });
});

export const voteSlice = createSlice({
    name: 'vote',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getQuestion.fulfilled, (state, action) => {
            console.log('getQuestion.fulfilled');
            state.selectedCircle = action.payload.selectedCircle;
            state.question = action.payload.selectedQuestion;
            state.userA = action.payload.userA;
            state.userB = action.payload.userB;
            state.user = action.payload.user;
            state.loading = false;
        })
        .addCase(submitVoteAction.pending, (state) => {
            console.log('submitVoteAction.pending');
            state.loading = true;
        })
        .addCase(submitVoteAction.fulfilled, (state, action) => {
            console.log('submitVoteAction.fulfilled');
            state.loading = false;
            const { selectedQuestion, userA, userB } = getNewQuestion(state.selectedCircle, state.user);
            state.question = selectedQuestion;
            state.userA = userA;
            state.userB = userB;
        })
    }
});

export const {  } = voteSlice.actions;

export default voteSlice.reducer;