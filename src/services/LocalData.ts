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

export const getLocalUser = async () => {
    const userStr = await storage.load({
        key: USER_KEY,
    });
    return userStr ? plainToClass(User, JSON.parse(userStr)) : null;
}

// Takes object user and saves it to AsyncStorage
export const setUser = (user: User) => {
    return storage.save({
        key: USER_KEY,
        data: user,
    });
}