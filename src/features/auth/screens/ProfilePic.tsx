import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/';
import { uploadProfilePictureAction } from '../authSlice';
import Icon from 'react-native-vector-icons/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const ProfilePic = ({route, navigation}) => {
    const [photo, setPhoto] = React.useState(null);

    const dispatch = useAppDispatch();

    function handlePress() {
        launchImageLibrary({mediaType: 'photo'}, (result) => {
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else {
                ImageResizer.createResizedImage(
                    result.assets[0].uri, 
                    200, 
                    260,
                    "PNG",
                    50).then(res=>setPhoto(res))
            }
        });
    }

    function handleSubmit() {
        dispatch(uploadProfilePictureAction(photo.uri));
    }

    return (
        <View style={styles.container}>
            <View style={styles.flexTop}>
                <View>
                    <Icon name="chevron-left" color="white" size={40} onPress={() => navigation.pop()}/>
                </View>
                <View style={styles.circlesContainer}>
                    <View style={styles.circles}>
                        <View style={styles.unmarkedCircle}></View>
                        <View style={styles.unmarkedCircle}></View>
                        <View style={styles.markedCircle} />
                        <View style={styles.unmarkedCircle}></View>
                    </View>
                </View>
            </View>
            <Text style={styles.headline}>
                {/* {route.params.firstName}, you're a certified G. */}
                You're a certified G.
            </Text>
            <Text style={styles.subheader}>Add a photo of yourself</Text>
            <TouchableOpacity onPress={() => handlePress()} style={photo ? styles.profileSel : styles.profileSelNoImage}>
                {photo && <ImageBackground style={styles.backgroundImage} imageStyle={{borderRadius: 20}} source={{uri: photo.uri}} />}
                <View style={styles.plusSign}><Text style={styles.plus}>+</Text></View>
            </TouchableOpacity>
            <Text style={styles.error}>Error</Text>
            {photo &&  
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.meBtn} shrinkTo={0.7}>
                <Text style={styles.meText}>That's me</Text>
            </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({


    flexTop: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingBottom: '2%',
    },

    container: {
        paddingTop: '15%',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#16161A',
    },

    headline: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 25,
        marginBottom: 40,
        alignSelf: 'center'
    },

    subheader: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 20,
        marginBottom: 40,
        alignSelf: 'center'
    },

    profileSel: {
        height: 260,
        width: 200,
        // marginBottom: 70,
        borderRadius: 20,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center',
    },

    profileSelNoImage: {
        height: 260,
        width: 200,
        // marginBottom: 70,
        borderRadius: 20,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center',
        backgroundColor: '#4f4f4f',
    },

    circlesContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: '5%',
        paddingBottom: '5%',
    },

    circles: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    unmarkedCircle: {
        marginLeft: 13,
        height: 10,
        width: 10,
        backgroundColor: "#C4C4C4",
        borderRadius: 8,
    },

    markedCircle: {
        marginLeft: 13,
        height: 10,
        width: 10,
        backgroundColor: "#2CB67D",
        borderRadius: 8,
    },

    panel: {
        padding: 20,
        backgroundColor: '#242629',
        paddingTop: 20,
    },

    panelHeader: {
        alignItems: 'center',
    },

    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },

    panelTitle: {
        fontSize: 27,
        height: 35,
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

    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },

    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2CB67D',
        alignItems: 'center',
        marginVertical: 7,
    },

    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },

    meBtn: {
        backgroundColor: '#7F5AF0',
        marginTop: 70,
        paddingLeft: 80,
        paddingRight: 80,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 6,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center'
    },

    meText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 23,
    },

    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        height: 260,
        width: 200,
        //borderRadius: 20,
        //overflow: "hidden",
    },

    error: {
        color: 'red',
        fontFamily: 'Montserrat',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 30,
    }

})

export default ProfilePic;