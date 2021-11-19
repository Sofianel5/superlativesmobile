import axios from 'axios';
import { getLocalUser } from '../../services/LocalData';
import FormData from 'form-data';
import fs from 'react-native-fs';

const baseUrl = 'http://localhost:8000/api/';
const Urls = {
    REQUEST_SIGNUP : baseUrl + 'auth/request-sign-up',
    VERIFY_NUMBER : baseUrl + 'auth/verify-phone',
}

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

export async function uploadProfilePicture(photoUri: string, authToken: string, phone: string) {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(photoUri));
    return axios({
        url: baseUrl + 'auth/upload-profile-picture',
        headers: {
            ...formData.getHeaders()
        },
        method: 'post',
        params: {
            'id': authToken,
            phone
        }
    })
}