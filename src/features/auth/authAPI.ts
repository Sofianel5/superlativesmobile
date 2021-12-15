import axios from 'axios';
import { getLocalUser } from '../../services/LocalData';
import FormData from 'form-data';
import Urls from '../../services/RemoteData';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay});

export async function getUser() {
    try {
        const savedUserData = await getLocalUser();
        return savedUserData;
    } catch  {
        return null;
    }
}

export async function requestSignup(firstName: string, lastName: string, phone: string) {
    return axios({
        url: Urls.REQUEST_SIGNUP, 
        method: 'post',
        params: {
            'first-name': firstName,
            'last-name': lastName,
            phone
        }
    });
}

export async function verifyNumber(id: string, phone: string, verify: string) {
    return axios({
        url: Urls.VERIFY_NUMBER, 
        method: 'post',
        params: {
            phone,
            id,
            verify
        }
    });
}


export async function uploadProfilePicture(photoUri: string, id: string, phone: string) {
    const formData = new FormData();
    formData.append("image", {
        name: 'image',
        type: 'image/png',
        uri: photoUri,
    });
    console.log(formData)
    return axios({
        url: Urls.UPLOAD_PROFILE_PIC,
        headers: {
            //...formData.getHeaders()
        },
        method: 'post',
        data: formData,
        params: {
            id,
            phone
        }
    })
}

export async function setPassword(id: string, phone: string, password: string) {
    return axios({
        url: Urls.SET_PASSWORD, 
        method: 'post',
        params: {
            id,
            phone,
            password
        }
    });
}

export async function login(phone: string, password: string) {
    return axios({
        url: Urls.LOGIN, 
        method: 'post',
        params: {
            phone,
            password
        }
    });
}