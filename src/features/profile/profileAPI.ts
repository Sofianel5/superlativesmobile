import axios, { AxiosError } from 'axios';
import Urls, { genAuthHeaders } from '../../services/RemoteData';
import FormData from 'form-data';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';

function errorIsAxiosError(error: Error): error is AxiosError {
    return !!(error as any).isAxiosError;
  }
  
  function simpleNetworkErrorCheck(error: Error) {
    console.log('Should retry?')
    if (errorIsAxiosError(error) && error.message === 'Network Error') {
        console.log('YES!')
      return true;
    } else {
        console.log('MAYBE!')
      return isNetworkOrIdempotentRequestError(error);
    }
  }

axiosRetry(axios, { 
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: simpleNetworkErrorCheck
});

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