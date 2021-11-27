import axios from 'axios';
import Urls, { genAuthHeaders } from '../../services/RemoteData';

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

export function getNewQuestion(selectedCircle: any, user) {
    const selectedQuestion = selectedCircle["circle/questions"][~~(Math.random() * selectedCircle["circle/questions"].length)];
    var pool = [...Object.values(selectedCircle["circle/members"])];
    var i = 0;
    while (i < pool.length) {
        if (pool[i]["user/id"] == user.id) {
            pool.splice(i, 1);
        }
        i++;
    }
    var userA = pool[~~(Math.random() * pool.length)];
    pool.splice(pool.indexOf(userA), 1);
    var userB = pool[~~(Math.random() * pool.length)];
    return {selectedQuestion, userA, userB, selectedCircle, user};
}