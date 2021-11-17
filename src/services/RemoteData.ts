import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/';
const Urls = {
    REQUEST_SIGNUP : baseUrl + 'auth/request-sign-up',
}

export async function requestSignup(firstName: string, lastName: string, phone: string) {
    const resp = await axios.post(Urls.REQUEST_SIGNUP, {
        firstName,
        lastName,
        phone
    });
    return resp.data;
}