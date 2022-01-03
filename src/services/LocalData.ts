import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../models/User';
import { serialize, plainToClass } from 'class-transformer';

const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,
  
    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage
  
    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,
  
    // cache data in the memory. default is true.
    enableCache: true,
  
    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      // we'll talk about the details later.
    }
  });

const USER_KEY = 'user'

const CIRCLES_KEY = 'circles'

const VOTE_KEY = 'vote'

const SELECTED_CIRCLE_ID_KEY = 'selectedCircleId'

const HIDDEN_SUPERLATIVES = 'hiddenSuperlatives'

export const getLocalUser = async () => {
    // const userStr = await storage.load({
    //     key: USER_KEY,
    //     id: USER_KEY,
    // });
    const userStr = await AsyncStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
}

// Takes object user and saves it to AsyncStorage
export const saveUser = (user: any) => {
    // return storage.save({
    //     key: USER_KEY,
    //     id: USER_KEY,
    //     data: user,
    // });
    return AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const removeUser = () => {
    // return storage.remove({
    //     key: USER_KEY,
    //     id: USER_KEY,
    // });
    return AsyncStorage.removeItem(USER_KEY);
}

export const getLocalCircles = async () => {
    // const circlesStr = await storage.load({
    //     key: CIRCLES_KEY,
    //     id: CIRCLES_KEY,
    // });
    const circlesStr = await AsyncStorage.getItem(CIRCLES_KEY);
    return circlesStr ? JSON.parse(circlesStr) : null;
}

export const getVotes = async () => {
  try {
    const votesStr = await AsyncStorage.getItem(VOTE_KEY);
    return votesStr ?? "";
  } catch {
    return ""
  }
}

export const storeVote = async (voteString: string) => {
    // return storage.save({
    //     key: CIRCLES_KEY,
    //     id: CIRCLES_KEY,
    //     data: voteString,
    // });
    const votesStr = await getVotes();
    return AsyncStorage.setItem(VOTE_KEY, (!!votesStr ? votesStr : "") + voteString);
}

export const getSelectedCircleId = async () => {
    // const selectedCircleIdStr = await storage.load({
    //     key: SELECTED_CIRCLE_ID_KEY,
    //     id: SELECTED_CIRCLE_ID_KEY,
    // });
    const selectedCircleIdStr = await AsyncStorage.getItem(SELECTED_CIRCLE_ID_KEY);
    return selectedCircleIdStr;
}

export const saveSelectedCircleId = async (selectedCircleId: string) => {
    // return storage.save({
    //     key: SELECTED_CIRCLE_ID_KEY,
    //     id: SELECTED_CIRCLE_ID_KEY,
    //     data: selectedCircleId,
    // });
    return AsyncStorage.setItem(SELECTED_CIRCLE_ID_KEY, selectedCircleId);
}

export const getHiddenSuperlatives = async () => {
  try {
    const hiddenSuperlativesStr = await AsyncStorage.getItem(HIDDEN_SUPERLATIVES);
    return hiddenSuperlativesStr ?? "";
  } catch {
    return ""
  }
}

export const hideSuperlative = async (superlativeId: string) => {
  const hiddenSuperlativesStr = await getHiddenSuperlatives();
  AsyncStorage.setItem(HIDDEN_SUPERLATIVES, (!!hiddenSuperlativesStr ? hiddenSuperlativesStr : "") + superlativeId + ";");
}