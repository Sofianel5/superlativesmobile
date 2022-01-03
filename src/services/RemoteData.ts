import axios from "axios";

const devUrl = 'http://localhost:5000/api/';
const prodUrl = 'https://superlatives.app/api/'

const baseUrl = prodUrl;

const Urls = {
    REQUEST_SIGNUP : baseUrl + 'auth/request-sign-up',
    VERIFY_NUMBER : baseUrl + 'auth/verify-phone',
    UPLOAD_PROFILE_PIC : baseUrl + 'auth/upload-pfp',
    SET_PASSWORD : baseUrl + 'auth/complete-user',
    LOGIN: baseUrl + 'auth/login',
    GET_CIRCLES: baseUrl + 'circles/get-circles',
    GET_CIRCLE_RANKINGS: baseUrl + 'circles/get-rankings-in-circle',
    ADD_SUPERLATIVES: baseUrl + 'circles/add-questions',
    SUBMIT_VOTE: baseUrl + 'circles/submit-vote',
    GET_QUESTION_PACKS: baseUrl + 'circles/question-packs',
    GET_RANKINGS: baseUrl + 'profile/get-rankings',
    RESET_PROFILE_PIC: baseUrl + 'profile/reset-profile-pic',
    CREATE_CIRCLE: baseUrl + 'circles/create-circle',
    INVITE_USER: baseUrl + 'circles/invite-user',
    GET_RESULTS: baseUrl + 'circles/get-results',
    REMOVE_SUPERLATIVE: baseUrl + 'circles/remove-question',
    REMOVE_MEMBER: baseUrl + 'circles/remove-member',
    UPLOAD_DEVICE_TOKEN: baseUrl + 'profile/set-device-token',
    REPORT_SUPERLATIVE: baseUrl + 'circles/report-superlative',
    BLOCK: baseUrl + 'circles/block',
}

export const genAuthHeaders = (userId: string, authToken: string) => {
    return {
        'request-user': userId,
        'authorization': authToken,
    }
}

export const uploadDeviceToken = (userId: string, authToken: string, deviceToken: string) => {
    return axios({
        method: 'post',
        url: Urls.UPLOAD_DEVICE_TOKEN,
        params: {
            'device-token': deviceToken,
        },
        headers: genAuthHeaders(userId, authToken),
    }).then(console.log).catch(console.log);
}

export default Urls;