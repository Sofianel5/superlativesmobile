import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/';
import { uploadProfilePictureAction } from '../../auth/authSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import SuperlativeIcon from '../../../../assets/icons/superlative';
import InnerBadge from '../../../../assets/icons/InnerBadge';

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
                    <View style={styles.plusSign}><Icon name="plus" size={35} color="white"/></View>
                </TouchableOpacity>
                <Text style={styles.mySuperlativeTxt}>My Superlatives</Text>
                <View style={styles.superlativesCard}>
                    <View style={styles.superlativeRowTwo}>
                        <View style={styles.superlativeSuperContainer}>
                            <SuperlativeIcon width={165} height={144} style={styles.superlativeIcon} />
                            <InnerBadge fill="#7F5AF0" width={94} style={styles.innerBadge} />
                            <View style={styles.superlativeContainer}>
                                <Text style={styles.superlativeTitle}>Best Head-Giver</Text>
                            </View>
                            <Text style={styles.superlativeGroup}>SAE</Text>
                        </View>
                        <View style={styles.superlativeSuperContainer}>
                            <SuperlativeIcon width={165} height={144} style={styles.superlativeIcon} />
                            <InnerBadge fill="#7F5AF0" width={94} style={styles.innerBadge} />
                            <View style={styles.superlativeContainer}>
                                <Text style={styles.superlativeTitle}>Best Head-Giver</Text>
                            </View>
                            <Text style={styles.superlativeGroup}>SAE</Text>
                        </View>
                    </View>
                    <View style={styles.superlativeRowOne}>
                        <View style={styles.superlativeSuperContainer}>
                            <SuperlativeIcon width={165} height={144} style={styles.superlativeIcon} />
                            <InnerBadge fill="#7F5AF0" width={94} style={styles.innerBadge} />
                            <View style={styles.superlativeContainer}>
                                <Text style={styles.superlativeTitle}>Best Head-Giver</Text>
                            </View>
                            <Text style={styles.superlativeGroup}>SAE</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.myRankingsTxt}>My Rankings</Text>
                <View style={styles.rankingCard}>
                    <View style={styles.rankingRowTwo}>
                        <View>
                            <Text style={styles.rankingNumber}>#2</Text>
                            <Text style={styles.rankingTitle}>Best Head-Giver</Text>
                            <Text style={styles.rankingGroup}>SAE</Text>
                        </View>
                        <View>
                            <Text style={styles.rankingNumber}>#2</Text>
                            <Text style={styles.rankingTitle}>Best Head-Giver</Text>
                            <Text style={styles.rankingGroup}>SAE</Text>
                        </View>
                    </View>
                    <View style={styles.rankingRowOne}>
                        <View>
                            <Text style={styles.rankingNumber}>#2</Text>
                            <Text style={styles.rankingTitle}>Best Head-Giver</Text>
                            <Text style={styles.rankingGroup}>SAE</Text>
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
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: 20,
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
        marginTop: 12,
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
})

export default Profile;