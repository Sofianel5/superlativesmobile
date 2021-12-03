import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CirclesList from '../components/CircleList';
import CircleLoading from '../components/CircleLoading';
import {useAppDispatch, useAppSelector } from '../../../app/hooks';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { getQuestionPacksAction } from '../circlesSlice';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
}

const Circles = ({navigation}) => {
    const circlesState = useAppSelector((state) => state.circles);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getQuestionPacksAction());
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Your Circles
            </Text>
            {(circlesState.loading || (circlesState.circles == null)) ?
                <View style={{height: '100%', paddingRight: 20}}>
                    <CircleLoading></CircleLoading>
                    <CircleLoading></CircleLoading>
                    <CircleLoading></CircleLoading>
                </View> : <CirclesList circles={circlesState.circles} navigation={navigation} />}
            {/* <TouchableOpacity style={styles.newGroup} onPress={() => {ReactNativeHapticFeedback.trigger("impactHeavy", options);navigation.navigate('CreateCircle')}}>
                <Icon name="plus" size={35} color="white" />
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242629',
        paddingLeft: 20,
        paddingTop: 30,
    },
    
    title: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        marginTop: 40,
        marginBottom: 15,
    },

    group: {
        marginTop: 30,
        backgroundColor: '#16161A',
        width: '100%',
        height: 200,
        borderRadius: 8,
        shadowOffset : {height: 4, width: 4},
        shadowOpacity: 0.8,
    },

    groupTitle: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
    },

    members: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 20,
    },

    view: {
        width: 250,
        backgroundColor: '#2CB67D',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        height: 40,
        borderRadius: 8,
    },

    viewText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 18,
    },

    newGroup: {
        backgroundColor: "#7F5AF0",
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset : {height: 4, width: 4},
        shadowOpacity: 0.8,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 40,
    },

    plus: {
        fontFamily: 'Montserrat',
        fontSize: 40,
        color: 'white',
    }
})

export default Circles;