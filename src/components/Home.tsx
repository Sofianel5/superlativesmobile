import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Vote from '../features/vote/screens/Vote'
import Profile from '../features/profile/screens/Profile'
import Circles from '../features/circles/screens/Circles'

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Vote" component={Vote} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Circles" component={Circles} />
    </Tab.Navigator>
  );
}