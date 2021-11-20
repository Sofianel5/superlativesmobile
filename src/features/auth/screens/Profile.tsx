import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/';
import { uploadProfilePictureAction } from '../authSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';

const Profile = ({navigation}) => {

    const [photo, setPhoto] = React.useState(null);

    const dispatch = useAppDispatch();

    function handlePress() {
        launchImageLibrary({mediaType: 'photo'}, (result) => {
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else {
                setPhoto(result.assets[0]);
            }
        });
    }

    function handleSubmit() {
        dispatch(uploadProfilePictureAction(photo.uri));
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>
                    Jason Seo
                </Text>
            </View>
            <ScrollView>
                <TouchableOpacity onPress={() => handlePress()} style={photo ? styles.profileSel : styles.profileSelNoImage}>
                    {photo && <ImageBackground style={styles.backgroundImage} imageStyle={{borderRadius: 20}} source={{uri: photo.uri}} />}
                    <View style={styles.plusSign}><Icon name="plus" size={22} color="white"/></View>
                </TouchableOpacity>
                <View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242629',
    }, 

    topBar: {
        alignSelf: 'stretch',
        height: 120,
        backgroundColor: '#16161A',
        alignItems: 'center',
        paddingTop: 55,
        // flexDirection: 'row',
    },

    title: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 8,
    },

    profileSel: {
        height: 130,
        width: 100,
        marginTop: 30,
        marginBottom: 70,
        borderRadius: 20,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center',
    },

    profileSelNoImage: {
        height: 130,
        width: 100,
        marginTop: 30,
        marginBottom: 70,
        borderRadius: 20,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center',
        backgroundColor: '#4f4f4f',
    },

    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        height: 130,
        width: 100,
        //borderRadius: 20,
        //overflow: "hidden",
    },

    plusSign: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#2CB67D',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 80,
        marginTop: 110,
    },

})

export default Profile;