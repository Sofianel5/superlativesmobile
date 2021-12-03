import axios from 'axios';
import FormData from 'form-data';
import Urls, { genAuthHeaders } from '../../services/RemoteData';
import Contacts from 'react-native-contacts';

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

export async function addCustomSuperlatives(userId: string, authToken: string, circleId: string, superlatives: string[]) {
    return axios({
        method: 'post',
        url: Urls.ADD_SUPERLATIVES,
        params: {
            "circle-id": circleId,
            "new-questions": superlatives,
        },
        headers: genAuthHeaders(userId, authToken),
    });
}

export async function getQuestionPacks() {
    return axios({
        method: 'get',
        url: Urls.GET_QUESTION_PACKS,
    });
}

export async function getContacts() {
    return Contacts.checkPermission().then(res => {
        console.log(res);
        if (res) {
            return Contacts.getAllWithoutPhotos().then(contacts => {
                return {
                    status: "success", 
                    data: contacts.filter(contact => contact.phoneNumbers.length > 0).map(contact => {return {recordID: contact.recordID, givenName: contact.givenName, phoneNumbers: contact.phoneNumbers, familyName: contact.familyName}})

                };
            });
        } return {status: "error", error: "Permission denied"};
    })
}

export async function createCircle(userId: string, authToken: string, circleName: string, packName: string) {
    return axios({
        method: 'post',
        params: {
            "circle-name": circleName,
            "question-pack": packName,
        },
        url: Urls.CREATE_CIRCLE,
        headers: genAuthHeaders(userId, authToken),
    });
}

export async function inviteUser(userId: string, authToken: string, circleId: string, phoneNumber: string) {
    console.log([circleId, phoneNumber]);
    return axios({
        method: 'post',
        params: {
            "circle-id": circleId,
            "phone": phoneNumber,
        },
        url: Urls.INVITE_USER,
        headers: genAuthHeaders(userId, authToken),
    }).then(res => console.log(res)).catch(err => console.log(err, err.response));
}