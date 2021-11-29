import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import SuperlativeDetails from '../../../components/SuperlativeDetails';

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{headerShown:false}} >
        <ProfileStack.Screen name="Profile" component={Profile}/>
        <ProfileStack.Screen name="SuperlativeDetails" component={SuperlativeDetails}/>
    </ProfileStack.Navigator>
)

export default ProfileStackScreen;