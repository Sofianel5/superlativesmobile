import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Vote from '../features/vote/screens/Vote'
import Profile from '../features/profile/screens/Profile'
import CirclesStackScreen from '../features/circles/screens/CirclesStack'
import { useAppDispatch } from '../app/hooks';
import { getCirclesAction } from '../features/circles/circlesSlice';
import { getRankingsAction } from '../features/profile/profileSlice';

const Tab = createBottomTabNavigator();

export default function Home() {

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getCirclesAction());
        dispatch(getRankingsAction())
    }, []);
    
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
            <Tab.Screen name="Circles" component={CirclesStackScreen} options={{
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