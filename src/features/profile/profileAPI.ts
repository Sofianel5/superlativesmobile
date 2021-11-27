import axios from 'axios';
import Urls, { genAuthHeaders } from '../../services/RemoteData';

export async function getRankings(userId: string, authToken: string) {
    return axios({
        method: 'get',
        url: Urls.GET_RANKINGS,
        headers: genAuthHeaders(userId, authToken),
    });
}