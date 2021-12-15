import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import Icon from 'react-native-vector-icons/Entypo';
import { logOut } from '../../auth/authSlice';
// import { uploadProfilePictureAction } from '../authSlice';
// import { launchImageLibrary } from 'react-native-image-picker';

const Settings = ({navigation}) => {

    const dispatch = useAppDispatch();


    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Icon name="chevron-left" size={40} color="white" onPress={() => navigation.pop()}/> 
                <Text style={styles.title}>Settings</Text>
                <View style={{width: 40}}></View>
            </View>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.signOutButton}>
                    <Text style={styles.myRankingsTxt} onPress={() => dispatch(logOut())}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: { 
        paddingVertical: 20,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#242629',
    }, 

    signOutButton: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#BABBBC',
        borderRadius: 10,
        width: 300,
        paddingVertical: 10,
    },
    back: {
        position: 'absolute',
        top: 60,
        left: 10,
        zIndex: 300,
    },

    topBar: {
        alignSelf: 'stretch',
        height: 120,
        backgroundColor: '#16161A',
        justifyContent: 'space-between',
        paddingTop: 55,
        flexDirection: 'row',
    },

    title: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 25,
    },

    profileSel: {
        height: 173.3,
        width: 133.3,
        marginTop: 30,
        marginBottom: 50,
        borderRadius: 20,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center',
    },

    profileSelNoImage: {
        height: 173.3,
        width: 133.3,
        marginTop: 30,
        marginBottom: 50,
        borderRadius: 20,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center',
        backgroundColor: '#4f4f4f',
    },

    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        height: 173.3,
        width: 133.3,
        //borderRadius: 20,
        //overflow: "hidden",
    },

    plusSign: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#2CB67D',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 105,
        marginTop: 140,
    },

    mySuperlativeTxt: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 21,
    },

    superlativesCard: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'black',
        borderRadius: 8,
        shadowOffset: {height: 4},
        shadowOpacity: 0.8,
        margin: 20,
    },

    superlativeRowTwo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },

    superlativeRowOne: {
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
    },

    superlativeContainer: {
        alignItems: 'center',
        position: 'absolute',
        width: 70,
        marginTop: 12,
        alignSelf: 'center',
    },

    superlativeGroup: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: 18.5,
        marginTop: 5,
    },

    superlativeIcon: {
        shadowOffset: {height: 4},
        shadowOpacity: 0.8,
    },

    superlativeTitle: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        marginTop: 7,
        fontSize: 14,
        maxHeight: 60,
    },

    superlativeOne: {
        color: 'yellow',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 31,
        position: 'absolute',
        top: 54,
    },

    myRankingsTxt: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        //marginTop: 20,
    },

    rankingCard: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: 'black',
        borderRadius: 8,
        shadowOffset: {height: 4},
        shadowOpacity: 0.8,
        margin: 20,
        marginBottom: 80,
    },

    rankingRowTwo:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },

    rankingRowOne: {
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
    },

    rankingGroup: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: 18.5,
        marginBottom: 20,
    },

    rankingTitle: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: 15,
    },

    rankingNumber: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: 30,
    },

    innerBadge: {
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
    },

    superlativeSuperContainer: {
        
    },

    rankingContainer: {
        width: 130,
        margin: 8,
    },
})

export default Settings;