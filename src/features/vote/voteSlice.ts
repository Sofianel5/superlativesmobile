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
    var {circles: {circles, hiddenSuperlatives}, vote: {selectedCircle, votes, question}, auth: {user}} = getState();
    if (!selectedCircle) {
        // Make sure that this circle has at least 2 other users
        const savedCircleId = await getSelectedCircleId();
        if (savedCircleId != null && savedCircleId in circles) {
            selectedCircle = circles[savedCircleId];
        } else { 
            selectedCircle = Object.values(circles)[0];
        }
    }
    //const currentVotes = await getVotes();
    const res = await getNewQuestion(selectedCircle, user, votes, question, hiddenSuperlatives);
    if (res) {
        return {status: "success", data: res}
    } else {
        return {status: "failed", selectedCircle}
    }
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
    var { auth: {user}, vote: {selectedCircle}, circles: {circles, hiddenSuperlatives}} = getState();
    if (selectedCircle && selectedCircle["circle/id"] == circleId) {
        return;
    }
    saveSelectedCircleId(circleId);
    return [circles[circleId], user, hiddenSuperlatives];
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
            console.log('getQuestion.fulfilled', action.payload);
            if (action.payload.status == "success") {
                state.selectedCircle = action.payload.data.selectedCircle;
                state.question = action.payload.data.selectedQuestion;
                state.userA = action.payload.data.userA;
                state.userB = action.payload.data.userB;
                state.user = action.payload.data.user;
                state.loading = false;
            } else {
                state.loading = false;
                state.error = "No more questions";
                state.userA = null;
                state.userB = null;
                state.question = null;
                state.selectedCircle = action.payload.selectedCircle
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
            //state.votes = state.votes.slice() + getVoteStr(state.selectedCircle, action.meta.arg.winnerId, action.meta.arg.loserId);
            state.votes = state.votes.concat(getVoteStr(action.meta.arg.questionId, action.meta.arg.winnerId, action.meta.arg.loserId));
            console.log("after: ", state.votes)
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
                const res = getNewQuestion(state.selectedCircle, action.payload[1], state.votes, state.question, action.payload[2]);
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