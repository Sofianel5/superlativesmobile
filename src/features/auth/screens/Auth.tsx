import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Name from './Name';
import Splash from './Splash';
import Verify from './Verify';
import ProfilePic from './ProfilePic';
import SetPass from './SetPass';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = ({navigation}) => (
    <AuthStack.Navigator screenOptions={{headerShown:false}} >
        <AuthStack.Screen name="Splash" component={Splash}/>
        <AuthStack.Screen name="Name" component={Name}/>
        <AuthStack.Screen name="Verify" component={Verify}/>
        <AuthStack.Screen name="ProfilePic" component={ProfilePic}/>
        <AuthStack.Screen name="SetPass" component={SetPass}/>
    </AuthStack.Navigator>
)

export default AuthStackScreen;