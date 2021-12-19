import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVotes, getSelectedCircleId, saveSelectedCircleId } from '../../services/LocalData';
import { submitVote, getNewQuestion, getVoteStr, saveVote, getResults} from './voteAPI';

interface VoteState {
    selectedCircle: any;
    loading: boolean;
    question: any;
    userA: any,
    userB: any,
    user: any,
    error: string;
    votes: string;
    results: any;
}

const initialState: VoteState = {
    selectedCircle: null,
    loading: true,
    question: null,
    userA: null,
    userB: null,
    user: null,
    error: null,
    votes: null,
    results: null
};

export const getQuestion = createAsyncThunk('vote/getQuestion', async (_, {getState}) => {
    console.log('getQuestion');
    var {circles: {circles}, vote: {selectedCircle, votes, question}, auth: {user}} = getState();
    if (!selectedCircle) {
        // Make sure that this circle has at least 2 other users
        const savedCircleId = await getSelectedCircleId();
        if (savedCircleId != null && circles[savedCircleId]) {
            selectedCircle = circles[savedCircleId];
        } else {
            selectedCircle = Object.values(circles)[0];
        }
    }
    return getNewQuestion(selectedCircle, user, votes, question);
})

export const submitVoteAction = createAsyncThunk('vote/submitVote', async (data: any, {getState}) => {
    console.log('submitVoteAction');
    const { auth: {user}} = getState();
    saveVote(data.questionId, data.winnerId, data.loserId);
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

export const getVotesAction = createAsyncThunk('vote/getVotes', async (_, {getState}) => {
    console.log('getVotesAction');
    return await getVotes()
})

export const selectCircleAction = createAsyncThunk('vote/selectCircle', async (circleId: string, {dispatch, getState}) => {
    console.log('selectCircle');
    var { auth: {user}, vote: {selectedCircle}, circles: {circles}} = getState();
    if (selectedCircle && selectedCircle["circle/id"] == circleId) {
        return;
    }
    saveSelectedCircleId(circleId);
    return [circles[circleId], user];
});

export const getResultsAction = createAsyncThunk('vote/getResults', async (data: any, {getState}) => {
    var { auth: {user}, vote: {userA, userB, question}} = getState();
    return await getResults(user['id'], user['auth-token'], question["question/id"], userA["user/id"], userB["user/id"])
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        return {
            status: "failed",
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
        .addCase(getVotesAction.fulfilled, (state, action) => {
            console.log(action)
            state.votes = action.payload;
        })
        .addCase(getQuestion.fulfilled, (state, action) => {
            console.log('getQuestion.fulfilled');
            if (action.payload) {
                state.selectedCircle = action.payload.selectedCircle;
                state.question = action.payload.selectedQuestion;
                state.userA = action.payload.userA;
                state.userB = action.payload.userB;
                state.user = action.payload.user;
                state.loading = false;
            } else {
                state.loading = false;
                state.error = "No more questions";
            }
        })
        .addCase(submitVoteAction.pending, (state) => {
            console.log('submitVoteAction.pending');
            state.loading = true;
        })
        .addCase(submitVoteAction.fulfilled, (state, action) => {
            console.log('submitVoteAction.fulfilled');
            state.loading = false;
            // const res = getNewQuestion(state.selectedCircle, state.user, state.votes + getVoteStr(state.selectedCircle, action.meta.arg.winnerId, action.meta.arg.loserId), state.question);
            state.votes = state.votes + getVoteStr(state.selectedCircle, action.meta.arg.winnerId, action.meta.arg.loserId);
            // if (res) {
            //     state.question = res.selectedQuestion;
            //     state.userA = res.userA;
            //     state.userB = res.userB;
            // } else {
            //     state.error = "No more questions";
            // }
        })
        .addCase(selectCircleAction.pending, (state) => {
            console.log('selectCircle.pending');
            state.loading = true;
        })
        .addCase(selectCircleAction.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload) {
                state.selectedCircle = action.payload[0];
                const res = getNewQuestion(state.selectedCircle, action.payload[1], state.votes + getVoteStr(state.selectedCircle, action.meta.arg.winnerId, action.meta.arg.loserId), state.question);
                state.votes = state.votes + getVoteStr(state.selectedCircle, action.meta.arg.winnerId, action.meta.arg.loserId);
                if (res) {
                    state.question = res.selectedQuestion;
                    state.userA = res.userA;
                    state.userB = res.userB;
                } else {
                    state.error = "No more questions";
                    state.question = null;
                    state.userA = null;
                    state.userB = null;
                }
            }
        })
    }
});

export const {  } = voteSlice.actions;

export default voteSlice.reducer;