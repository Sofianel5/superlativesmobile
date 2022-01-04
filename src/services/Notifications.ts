import messaging from '@react-native-firebase/messaging';
import { uploadDeviceToken  } from './RemoteData';
import { navigate } from './RootNavigation';

const firebaseMessaging = messaging()

export async function checkApplicationPermission() {
  const authorizationStatus = await firebaseMessaging.requestPermission();
  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('User has notification permissions enabled.');
    return true;
  } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    console.log('User has provisional notification permissions.');
    return true;
  } else {
    console.log('User has notification permissions disabled');
    return false;
  }
}

export async function requestNotificationPermission(userId: string, authToken: string) {
    if (!checkApplicationPermission()) {
        const authorizationStatus = await firebaseMessaging.requestPermission();
        if (authorizationStatus) {
          console.log('Permission status:', authorizationStatus);
          if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL || authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            const token = await firebaseMessaging.getToken();
            console.log('FirebaseNotifToken:', token);
            uploadDeviceToken(userId, authToken, token);
          }
        }
    }
    const token = await firebaseMessaging.getToken();
    console.log('FirebaseNotifToken:', token);
    uploadDeviceToken(userId, authToken, token);
}

export function handleNotification() {
  firebaseMessaging.onNotificationOpenedApp((message) => {
    if ("route" in message.data && message.data.route in ["Profile", "Circles", "Vote"]) 
      navigate(message.data.route, {})
  });
}