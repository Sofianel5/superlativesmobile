import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCircles, getCircleRanking, addCustomSuperlatives, getQuestionPacks, getContacts, createCircle, inviteUser } from './circlesAPI';

interface CirclesState {
    circles: any[];
    loading: boolean;
    error: string;
    questionPacks: any[];
    contacts: any[];
    invitedContacts: string[];
}

const initialState: CirclesState = {
    circles: null,
    loading: true,
    error: null,
    questionPacks: null,
    contacts: null,
    invitedContacts: [],
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
    const {auth: {user}} = getState();
    return await addCustomSuperlatives(user['id'], user['auth-token'], circleId, superlatives)
    .then(res => res.data)
    .catch(err => {
        console.log(err);
        console.log(err.response);
        return {
            status: "failed",
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
                    state.circles[action.meta.arg.circleId]["circle/questions"].concat(action.payload.data)
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
        }
    }
);

export const {  } = circleSlice.actions;

export default circleSlice.reducer;