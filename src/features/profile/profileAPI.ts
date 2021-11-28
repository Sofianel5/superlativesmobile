import axios from 'axios';
import Urls, { genAuthHeaders } from '../../services/RemoteData';
import FormData from 'form-data';

export async function getRankings(userId: string, authToken: string) {
    return axios({
        method: 'get',
        url: Urls.GET_RANKINGS,
        headers: genAuthHeaders(userId, authToken),
    });
}

export async function resetProfilePic(userId: string, authToken: string, newProfilePicUri: string) {
    const formData = new FormData();
    formData.append("image", {
        name: 'image',
        type: 'image/png',
        uri: newProfilePicUri,
    });
    return axios({
        method: 'post',
        url: Urls.RESET_PROFILE_PIC,
        data: formData,
        headers: genAuthHeaders(userId, authToken),
    });
}