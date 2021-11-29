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
                    data: contacts.filter(contact => contact.phoneNumbers.length > 0).map(contact => {return {givenName: contact.givenName, phoneNumbers: contact.phoneNumbers, familyName: contact.familyName}})

                };
            });
        } return {status: "error", error: "Permission denied"};
    })
}