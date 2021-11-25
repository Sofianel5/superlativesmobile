import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Vote from '../features/vote/screens/Vote'
import Profile from '../features/profile/screens/Profile'
import Circles from '../features/circles/screens/Circles'

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
    initialRouteName="Vote"
    screenOptions={{
        headerShown:false,
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "#16161A",
            borderTopWidth: 0,
        },
    }}>
        <Tab.Screen name="Circles" component={Circles} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source={require('../../assets/icons/groups.png')}
                            resizeMode="contain"
                            style={{
                                marginTop: 8,
                                width: 30,
                                height: 30,
                                tintColor: focused ? 'white' : '#748c94',
                            }}
                        />
                    </View>
                )
            }}/>
        <Tab.Screen name="Vote" component={Vote} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source={require('../../assets/icons/badge.png')}
                            resizeMode="contain"
                            style={{
                                marginTop: 8,
                                width: 45,
                                height: 45,
                                tintColor: focused ? 'white' : '#748c94',
                            }}
                        />
                    </View>
                )
            }} />
        <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source={require('../../assets/icons/profile.png')}
                            resizeMode="contain"
                            style={{
                                marginTop: 10,
                                width: 22,
                                height: 22,
                                tintColor: focused ? 'white' : '#748c94',
                            }}
                        />
                    </View>
                )
            }}/>
    </Tab.Navigator>
  );
}