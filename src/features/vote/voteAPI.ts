import axios from 'axios';
import Urls, { genAuthHeaders } from '../../services/RemoteData';
import { getVotes, storeVote } from '../../services/LocalData';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay});

export async function submitVote(userId: string, authToken: string, question: string, winner: string, loser: string) {
    return axios({
        method: 'post',
        url: Urls.SUBMIT_VOTE,
        params: {
            question,
            winner,
            loser
        },
        headers: genAuthHeaders(userId, authToken),
    });
}

export function getNewQuestion(selectedCircle: any, user, votes, currentQuestion, hiddenSuperlatives: string[]) {
    var questions = selectedCircle["circle/questions"]
    if (hiddenSuperlatives) {
        questions = selectedCircle["circle/questions"].filter(q => !hiddenSuperlatives.includes(q["question/id"]))
    }
    console.log("getNewQuestion")
    console.log(votes);
    var i = 0;
    var questionPool = [];
    while (i < questions.length) {
        var count = 0;
        const question = questions[i];
        for (var j = 0; j < votes.length - 36; j += 109) {
            const q2 = votes.substring(j, j + 36);
            if (q2 == question["question/id"]) {
                count++;
            }
        }
        if (count < (Object.keys(selectedCircle["circle/members"]).length - 1) / 2 && question["question/id"] != (!currentQuestion ? null : currentQuestion["question/id"])) {
            questionPool.push(question);
            console.log("adding " + question["question/id"] + " because count is " + count + " which is less than " + (Object.keys(selectedCircle["circle/members"]).length - 1) / 2)
        } else {
            console.log("removing " + question["question/id"] + " because count is " + count + " which is not less than " + (Object.keys(selectedCircle["circle/members"]).length - 1) / 2);
        }
        i++;
    }
    if (questionPool.length == 0) { 
        console.log("No more questions")
        return null;
    } else {
        console.log("there are " + questionPool.length + " questions left")
    }
    const selectedQuestion = questionPool[~~(Math.random() * questionPool.length)];
    var pool = [...Object.values(selectedCircle["circle/members"])];
    var i = 0;
    while (i < pool.length) {
        if (pool[i]["user/id"] == user.id) {
            pool.splice(i, 1);
        }
        i++;
    }
    if (pool.length == 0) {
        console.log("No more usersA")
        return null;
    }
    var userA = pool[~~(Math.random() * pool.length)];
    pool.splice(pool.indexOf(userA), 1);
    // Remove users who you've already voted for
    var i = 0;
    while (i < pool.length) {
        if (!validateUniqueVote(votes, selectedQuestion, userA["user/id"], pool[i]["user/id"])) {
            pool.splice(i, 1);
        }
        i++;
    }
    if (pool.length == 0) {
        console.log("No more userB")
        return null;
    }
    var userB = pool[~~(Math.random() * pool.length)];
    return {selectedQuestion, userA, userB, selectedCircle, user};
}

export function getVoteStr(superlativeId: string, userA: string, userB: string) {
    return superlativeId + userA + userB + ";";
}

export async function saveVote(superlativeId: string, userA: string, userB: string) {
    return storeVote(getVoteStr(superlativeId, userA, userB));
}

export async function validateUniqueVote(votes: string, superlativeId: string, userA: string, userB: string) {
    return !(votes?.includes(superlativeId + userA + userB) || votes?.includes(superlativeId + userB + userA));
}

export async function getResults(userId: string, authToken: string, superlativeId: string, userA: string, userB: string) {
    return axios({
        method: 'get',
        url: Urls.GET_RESULTS,
        params: {
            "question-id":superlativeId,
            "user-1": userA,
            "user-2": userB
        },
        headers: genAuthHeaders(userId, authToken),
    });
}