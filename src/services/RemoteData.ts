const devUrl = 'http://localhost:5000/api/';
const prodUrl = 'https://superlatives.app/api/'

const baseUrl = devUrl;

const Urls = {
    REQUEST_SIGNUP : baseUrl + 'auth/request-sign-up',
    VERIFY_NUMBER : baseUrl + 'auth/verify-phone',
    UPLOAD_PROFILE_PIC : baseUrl + 'auth/upload-pfp',
    SET_PASSWORD : baseUrl + 'auth/complete-user',
    LOGIN: baseUrl + 'auth/login',
    GET_CIRCLES: baseUrl + 'circles/get-circles',
    GET_CIRCLE_RANKINGS: baseUrl + 'circles/get-rankings-in-circle',
    ADD_SUPERLATIVE: baseUrl + 'circles/add-question',
    SUBMIT_VOTE: baseUrl + 'circles/submit-vote',
}

export const genAuthHeaders = (userId: string, authToken: string) => {
    return {
        'request-user': userId,
        'authorization': authToken,
    }
}

export default Urls;