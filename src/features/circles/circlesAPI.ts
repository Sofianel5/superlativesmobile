import axios from 'axios';
import FormData from 'form-data';
import Urls, { genAuthHeaders } from '../../services/RemoteData';

export async function getCircles(userId: string, authToken: string) {
    return axios({
        method: 'get',
        url: Urls.GET_CIRCLES,
        headers: genAuthHeaders(userId, authToken),
    });
}

export async function getCircleRanking(userId: string, authToken: string, circleId: string) {
    return axios({
        method: 'get',
        url: Urls.GET_CIRCLE_RANKINGS,
        params: {
            "circle-id": circleId,
        },
        headers: genAuthHeaders(userId, authToken),
    });
}

export async function addCustomSuperlative(userId: string, authToken: string, circleId: string, superlative: string) {
    return axios({
        method: 'post',
        url: Urls.ADD_SUPERLATIVE,
        params: {
            "circle-id": circleId,
            "new-question": superlative,
        },
        headers: genAuthHeaders(userId, authToken),
    });
}