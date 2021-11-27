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