import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/';
import { uploadProfilePictureAction } from '../../auth/authSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import SuperlativeIcon from '../../../../assets/icons/superlative';

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
                <Text style={styles.mySuperlativeTxt}>My Superlatives</Text>
                <View style={styles.superlativesCard}>
                    <View style={styles.superlativeRowTwo}>
                        <View>
                            <SuperlativeIcon width={123.75} height={108} style={styles.superlativeIcon} />
                            <View style={styles.superlativeContainer}>
                                <Text style={styles.superlativeGroup}>SAE</Text>
                                <Text style={styles.superlativeTitle}>Best Head-Giver</Text>
                            </View>
                        </View>
                        <View>
                            <SuperlativeIcon width={123.75} height={108} style={styles.superlativeIcon}/>
                            <View style={styles.superlativeContainer}>
                                <Text style={styles.superlativeGroup}>SAE</Text>
                                <Text style={styles.superlativeTitle}>Best Head-Giver</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.superlativeRowOne}>
                        <View>
                            <SuperlativeIcon width={123.75} height={108} style={styles.superlativeIcon}/>
                            <View style={styles.superlativeContainer}>
                                <Text style={styles.superlativeGroup}>SAE</Text>
                                <Text style={styles.superlativeTitle}>Best Head-Giver</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={styles.myRankingsTxt}>My Rankings</Text>
                <View style={styles.rankingCard}>
                    <View style={styles.rankingRowTwo}>
                        <View>
                            <Text style={styles.rankingGroup}>SAE</Text>
                            <Text style={styles.rankingTitle}>Best Head-Giver</Text>
                            <Text style={styles.rankingNumber}>#2</Text>
                        </View>
                        <View>
                            <Text style={styles.rankingGroup}>SAE</Text>
                            <Text style={styles.rankingTitle}>Best Head-Giver</Text>
                            <Text style={styles.rankingNumber}>#2</Text>
                        </View>
                    </View>
                    <View style={styles.rankingRowOne}>
                        <View>
                            <Text style={styles.rankingGroup}>SAE</Text>
                            <Text style={styles.rankingTitle}>Best Head-Giver</Text>
                            <Text style={styles.rankingNumber}>#2</Text>
                        </View>
                    </View>
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
        marginBottom: 50,
        borderRadius: 20,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center',
    },

    profileSelNoImage: {
        height: 130,
        width: 100,
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

    mySuperlativeTxt: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 21,
    },

    superlativesCard: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: 'black',
        borderRadius: 8,
        shadowOffset: {height: 4},
        shadowOpacity: 0.8,
        margin: 20,
    },

    superlativeRowTwo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        width: 80,
        marginTop: 12,
        alignSelf: 'center',
    },

    superlativeGroup: {
        color: '#7F5AF0',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: 20,
    },

    superlativeIcon: {
        shadowOffset: {height: 4},
        shadowOpacity: 0.8,
    },

    superlativeTitle: {
        color: '#7F5AF0',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: 14,
    },

    myRankingsTxt: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        marginTop: 20,
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
        justifyContent: 'space-between',
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
        fontSize: 20,
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
        fontSize: 18,
    }
})

export default Profile;