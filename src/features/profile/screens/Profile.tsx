import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollableView, ImageBackground } from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
// import { uploadProfilePictureAction } from '../authSlice';
// import { launchImageLibrary } from 'react-native-image-picker';

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

    // function handleSubmit() {
    //     dispatch(uploadProfilePictureAction(photo.uri));
    // }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>
                    Jason Seo
                </Text>
            </View>
            <ScrollableView>
                <TouchableOpacity style={styles.profileSelNoImage}>
                    <ImageBackground style={styles.backgroundImage} source={{uri: "https://superlatives-files.s3.amazonaws.com/93d8437d-d9db-4b4b-bacc-efc1a9435a46.png"}} />
                    <View style={styles.plusSign}>
                        <Text style={styles.plus}>+</Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => handlePress()} style={photo ? styles.profileSel : styles.profileSelNoImage}>
                {photo && <ImageBackground style={styles.backgroundImage} imageStyle={{borderRadius: 20}} source={{uri: photo.uri}} />}
                <View style={styles.plusSign}><Text style={styles.plus}>+</Text></View>
                </TouchableOpacity> */}
            </ScrollableView>
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
        justifyContent: 'space-between',
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
        height: 260,
        width: 200,
        marginBottom: 70,
        borderRadius: 20,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center',
    },

    profileSelNoImage: {
        height: 260,
        width: 200,
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
        height: 260,
        width: 200,
        //borderRadius: 20,
        //overflow: "hidden",
    },

    plusSign: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#2CB67D',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 160,
        marginTop: 220,
    },

    plus: {
        color: 'white',
        fontSize: 50,
        fontFamily: 'Montserrat-SemiBold',
    },

})

export default Profile;