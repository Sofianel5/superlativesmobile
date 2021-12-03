import axios from 'axios';
import Urls, { genAuthHeaders } from '../../services/RemoteData';
import { getVotes, storeVote } from '../../services/LocalData';

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

export function getNewQuestion(selectedCircle: any, user, votes, currentQuestion) {
    const questions = selectedCircle["circle/questions"] 
    console.log("getNewQuestion")
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
        console.log("Count:", count, "memberCount:", Object.keys(selectedCircle["circle/members"]).length)
        if (count < (Object.keys(selectedCircle["circle/members"]).length - 1) / 2 && question["question/id"] != (!currentQuestion ? null : currentQuestion["question/id"])) {
            questionPool.push(question);
        }
        i++;
    }
    console.log("Question Pool:", questionPool)
    if (questionPool.length == 0) { 
        console.log("No more questions")
        return null;
    }
    console.log("questionPool:", questionPool.map(q => q["question/id"] + q["question/text"]))
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