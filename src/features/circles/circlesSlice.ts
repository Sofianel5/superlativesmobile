import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCircles, getCircleRanking, addCustomSuperlatives, getQuestionPacks, getContacts, createCircle, inviteUser, removeSuperlative, removeMember, reportSuperlative, block } from './circlesAPI';
import { hideSuperlative, getHiddenSuperlatives } from '../../services/LocalData';

interface CirclesState {
    circles: any[];
    loading: boolean;
    error: string;
    questionPacks: any[];
    contacts: any[];
    invitedContacts: string[];
    lastAddedQuestion: string;
    hiddenSuperlatives: string[];
}

const initialState: CirclesState = {
    circles: null,
    loading: true,
    error: null,
    questionPacks: null,
    contacts: null,
    invitedContacts: [],
    lastAddedQuestion: null,
    hiddenSuperlatives: [],
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

export const addSuperlativesAction = createAsyncThunk('circles/addCustomSuperlative', async (data: any, {getState}) => {
    console.log('addCustomSuperlativeAction');
    const {superlatives, circleId } = data;
    console.log("Superlatives: " + superlatives)
    console.log("Circle Id " + circleId)
    const {auth: {user}, circles: {circles}} = getState();
    const maxQuestions = 12 + 3 * (Object.values(circles[circleId]["circle/members"]).length - 4);
    if (circles[circleId]["circle/questions"].length + superlatives.length > maxQuestions) { 
        console.log("too many questions");
        return {
            status: "failed",
            error: "Too many superlatives: add more people to your circle first!"
        }
    }
    for (var i = 0; i < superlatives.length; i++) {
        if (superlatives[i].length > 55) {
            console.log("too long");
            return {
                status: "failed",
                error: "A question is too long: shorten it to less than 36 characters."
            }
        }
    }
    for (var i = 0; i < superlatives.length; i++) {
        for (var j = 0; j < circles[circleId]["circle/questions"].length; j++) {
            if (superlatives[i] == circles[circleId]["circle/questions"][j]["question/text"]) {
                console.log("duplicate");
                return {
                    status: "failed",
                    error: "You have duplicate questions. Please remove one of them."
                }
            }
        }
    }
    return await addCustomSuperlatives(user['id'], user['auth-token'], circles[circleId], superlatives)
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        return {
            status: "failed",
            error: "Unknown error. Check your internet connection"
        }
    });
});

export const getContactsAction = createAsyncThunk('circles/getContacts', async (_, {getState}) => {
    console.log('getContactsAction');
    return await getContacts()
});

export const createCircleAction = createAsyncThunk('circles/createCircle', async (data: any, {getState}) => {
    console.log('createCircleAction');
    const {auth: {user}} = getState();
    return await createCircle(user['id'], user['auth-token'], data.circleName, data.questionPack)
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        return {
            status: "failed",
        }
    });
});

export const inviteUserAction = createAsyncThunk('circles/inviteUser', async (data: any, {getState}) => {
    console.log('inviteUserAction');
    const {auth: {user}} = getState();
    return await inviteUser(user['id'], user['auth-token'], data.circleId, data.phone)
});

export const removeMemberAction = createAsyncThunk('circles/removeMember', async (data: any, {getState}) => {
    console.log('removeMemberAction');
    const {auth: {user}} = getState();
    return await removeMember(user['id'], user['auth-token'], data.circleId, data.memberId)
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        return {
            status: "failed",
        }
    });
});

export const removeSuperlativeAction = createAsyncThunk('circles/removeSuperlative', async (data: any, {getState}) => {
    console.log('removeSuperlativeAction');
    const {auth: {user}} = getState();
    return await removeSuperlative(user['id'], user['auth-token'], data.circleId, data.questionId)
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        return {
            status: "failed",
        }
    });
});

export const getHiddenSuperlativesAction = createAsyncThunk('circles/getHiddenSuperlatives', async (_, {getState}) => {
    console.log('getHiddenSuperlativesAction');
    return await getHiddenSuperlatives();
});

export const hideSuperlativeAction = createAsyncThunk('circles/hideSuperlative', async (data: any, {getState}) => {
    console.log('hideSuperlative');
    const {auth: {user}} = getState();
    reportSuperlative(user['id'], user['auth-token'], data.circleId, data.questionId)
    await hideSuperlative(data.questionId)
    return {'status' : 'success'}
});

export const blockAction = createAsyncThunk('circles/block', async (data: any, {getState}) => {
    console.log('blockAction');
    const {auth: {user}} = getState();
    return await block(user['id'], user['auth-token'], data.circleId, data.memberId).then(res => res.data).catch(err => err.response.data);
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
            .addCase(addSuperlativesAction.fulfilled, (state, action) => {
                console.log(action)
                if (action.payload.status === "success") {
                    const newQuestions = [...state.circles[action.meta.arg.circleId]["circle/questions"]]
                    console.log("original questions: " + newQuestions.length)
                    console.log(action.payload.data)
                    const newestQuestions = newQuestions.concat(action.payload.data)
                    console.log("concated questions: " + newestQuestions.length)
                    state.circles[action.meta.arg.circleId]["circle/questions"] = newestQuestions
                    console.log("final questions: " + state.circles[action.meta.arg.circleId]["circle/questions"].length)
                    state.lastAddedQuestion = action.payload.data[action.payload.data.length-1]["question/id"]
                } else {
                    state.error = action.payload.error;
                }
            })
            .addCase(getContactsAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContactsAction.fulfilled, (state, action) => {
                console.log("action:", action);
                if (action.payload.status === "success") {
                    state.contacts = action.payload.data;
                    console.log(state.contacts.length)
                    state.loading = false;
                } else {
                    state.error = action.payload.error;
                    state.loading = false;
                }
            })
            .addCase(createCircleAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCircleAction.fulfilled, (state, action) => {
                console.log("action:", action);
                if (action.payload.status === "success") {
                    state.circles = action.payload.data;
                    state.loading = false;
                } else {
                    state.error = action.payload.error;
                    state.loading = false;
                }
            })
            .addCase(inviteUserAction.pending, (state, action) => {
                state.invitedContacts.push(action.meta.arg.contactId);
            })
            .addCase(removeMemberAction.fulfilled, (state, action) => {
                console.log(action)
                if (action.payload.status === "success") {
                    const circleId = action.meta.arg.circleId;
                    const memberId = action.meta.arg.memberId;
                    delete state.circles[circleId]["circle/members"][memberId]
                    state.circles[circleId]["circle/questions"] = action.payload.data["circle/questions"]
                }
            })
            .addCase(removeSuperlativeAction.fulfilled, (state, action) => {
                console.log(action)
                if (action.payload.status === "success") {
                    const circleId = action.meta.arg.circleId
                    const questionId = action.meta.arg.questionId
                    const newQuestions = state.circles[circleId]["circle/questions"].filter(question => question["question/id"] !== questionId)
                    state.circles[circleId]["circle/questions"] = newQuestions
                }
            })
            .addCase(getHiddenSuperlativesAction.fulfilled, (state, action) => {
                console.log(action)
                if (action.payload) {
                    state.hiddenSuperlatives = action.payload.split(';')
                }
                console.log(state.hiddenSuperlatives)
            })
            .addCase(hideSuperlativeAction.fulfilled, (state, action) => {
                console.log(action)
                if (action.payload.status === "success") {
                    const circleId = action.meta.arg.circleId
                    const questionId = action.meta.arg.questionId
                    const newQuestions = state.circles[circleId]["circle/questions"].filter(question => question["question/id"] !== questionId)
                    state.circles[circleId]["circle/questions"] = newQuestions
                    state.hiddenSuperlatives.push(questionId);
                }
            })
            .addCase(blockAction.fulfilled, (state, action) => {
                console.log(action)
                if (action.payload.status === "success") {
                    const circleId = action.meta.arg.circleId
                    const memberId = action.meta.arg.memberId
                    delete state.circles[circleId]["circle/members"][memberId]
                    //delete state.circles[circleId]
                }
            })
        }
    }
);

export const {  } = circleSlice.actions;

export default circleSlice.reducer;