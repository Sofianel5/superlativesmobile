import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Circles from './Circles';
import CircleDetail from './CircleDetail';
import SelectSuperlativeSourceScreen from './SelectSuperlativeSource';
import AddQuestionPackSuperlativesScreen from './AddQuestionPackSuperlative';
import CustomSuperlativeScreen from './CustomSuperlative';

const CirclesStack = createNativeStackNavigator();

const CirclesStackScreen = ({navigation}) => (
    <CirclesStack.Navigator screenOptions={{headerShown:false}} >
        <CirclesStack.Screen name="Circles" component={Circles}/>
        <CirclesStack.Screen name="CircleDetail" component={CircleDetail}/>
        <CirclesStack.Screen name="SelectSuperlativeSource" component={SelectSuperlativeSourceScreen}/>
        <CirclesStack.Screen name="AddQuestionPackSuperlatives" component={AddQuestionPackSuperlativesScreen}/>
        <CirclesStack.Screen name="CustomSuperlative" component={CustomSuperlativeScreen}/>
    </CirclesStack.Navigator>
)

export default CirclesStackScreen;