import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Name from './Name';
import Splash from './Splash';
import Verify from './Verify';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = ({navigation}) => (
    <AuthStack.Navigator screenOptions={{headerShown:false}} >
        <AuthStack.Screen name="Splash" component={Splash}/>
        <AuthStack.Screen name="Name" component={Name}/>
        <AuthStack.Screen name="Verify" component={Verify}/>
    </AuthStack.Navigator>
)

export default AuthStackScreen;