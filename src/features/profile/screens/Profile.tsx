import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import InnerBadge from '../../../../assets/icons/InnerBadge';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import SuperlativeIcon from '../../../components/SuperlativeIcon';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import ImageResizer from 'react-native-image-resizer';
import { getRankingsAction, resetProfilePicAction } from '../profileSlice';
import { navigate } from '../../../services/RootNavigation';
// import { uploadProfilePictureAction } from '../authSlice';
// import { launchImageLibrary } from 'react-native-image-picker';

const Profile = ({navigation}) => {

    const [photo, setPhoto] = React.useState(null);

    const {auth: {user}, profile: {rankings, loading}, circles: {hiddenSuperlatives}} = useAppSelector((state) => state);

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
                    50).then(res=>dispatch(resetProfilePicAction(res.uri)))
            }
        });
    }

    function getSuperlatives(rankings: any[]) {
        return rankings.filter(rank => rank.index == 1)
    }

    function areSuperlatives(rankings: any[]) {
        return getSuperlatives(rankings).length > 0;
    }

    function getNonSuperlatives(rankings: any[]) {
        return rankings.filter(rank => rank.index != 1)
    }

    function areNonSuperlatives(rankings: any[]) {
        return getNonSuperlatives(rankings).length > 0;
    }

    // function handleSubmit() {
    //     dispatch(resetProfilePicAction(photo.uri));
    // }

    function renderSuperlatives(rankings: any[]) {
        console.log("rankings", rankings);
        //console.log(getSuperlatives(rankings));
        if (loading) {
            return <View style={{alignItems: 'center'}}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
        } else if (!areSuperlatives(rankings)) {
            return <></>
        } return (
            <>
                <Text style={styles.mySuperlativeTxt}>My Superlatives</Text>
                <View style={styles.superlativesCard}>
                    {getSuperlatives(rankings).reduce(function(accumulator, currentValue, currentIndex, array) {
                            if (currentIndex % 2 === 0)
                            accumulator.push(array.slice(currentIndex, currentIndex + 2));
                            return accumulator;
                        }, []).map(res => (
                            <View style={styles.superlativeRowTwo}>
                                <TouchableOpacity style={styles.superlativeSuperContainer} onPress={() => navigation.navigate('SuperlativeDetails', res[0])}>
                                    <SuperlativeIcon width={148.5} height={129.6} style={styles.superlativeIcon} />
                                    <InnerBadge fill="#7F5AF0" width={84.6} style={styles.innerBadge} />
                                    <View style={styles.superlativeContainer}>
                                        <Text style={styles.superlativeTitle} numberOfLines={2}>{res[0]["rank/question"]["question/text"]}</Text>
                                        <Text style={styles.superlativeOne}>#1</Text>
                                    </View>
                                    <Text style={styles.superlativeGroup} numberOfLines={1}>{res[0]["rank/question"]["question/circle"]["circle/name"]}</Text>
                                </TouchableOpacity>
                                {res[1] && <TouchableOpacity style={styles.superlativeSuperContainer} onPress={() => navigation.navigate('SuperlativeDetails', res[1])}>
                                    <SuperlativeIcon width={148.5} height={129.6} style={styles.superlativeIcon} />
                                    <InnerBadge fill="#7F5AF0" width={84.6} style={styles.innerBadge} />
                                    <View style={styles.superlativeContainer}>
                                        <Text style={styles.superlativeTitle}>{res[1]["rank/question"]["question/text"]}</Text>
                                        <Text style={styles.superlativeOne}>#1</Text>
                                    </View>
                                    <Text style={styles.superlativeGroup} numberOfLines={1}>{res[1]["rank/question"]["question/circle"]["circle/name"]}</Text>
                                </TouchableOpacity>}
                            </View>
                        ))}
                </View>
            </>
        );
    }

    function renderNonSuperlatives(rankings: any[]) {
        if (loading) {
            return <View style={{alignItems: 'center'}}>
                        <ActivityIndicator></ActivityIndicator>
                    </View>
        } else if (!areNonSuperlatives(rankings)) {
            return <View>
                <Image style={styles.noRankingsImage} source={require('../../../../assets/images/ghost.png')}></Image>
                    <Text style={styles.noRankingsText}>This you? Get out there!</Text>
                </View>
        } return (
            <View style={styles.rankingCard}>
                {getNonSuperlatives(rankings).reduce(function(accumulator, currentValue, currentIndex, array) {
                        if (currentIndex % 2 === 0)
                        accumulator.push(array.slice(currentIndex, currentIndex + 2));
                        return accumulator;
                    }, []).map(res => (
                        <View style={styles.rankingRowTwo}>
                            <TouchableOpacity style={styles.rankingContainer} onPress={() => navigation.navigate('SuperlativeDetails', res[0])}>
                                <Text style={styles.rankingNumber} numberOfLines={1}>#{res[0]["index"]}</Text>
                                <Text style={styles.rankingTitle} numberOfLines={1}>{res[0]["rank/question"]["question/text"]}</Text>
                                <Text style={styles.rankingGroup} numberOfLines={1}>{res[0]["rank/question"]["question/circle"]["circle/name"]}</Text>
                            </TouchableOpacity>
                            {res[1] && <TouchableOpacity style={styles.rankingContainer} onPress={() => navigation.navigate('SuperlativeDetails', res[1])}>
                                <Text style={styles.rankingNumber} numberOfLines={1}>#{res[1]["index"]}</Text>
                                <Text style={styles.rankingTitle} numberOfLines={1}>{res[1]["rank/question"]["question/text"]}</Text>
                                <Text style={styles.rankingGroup} numberOfLines={1}>{res[1]["rank/question"]["question/circle"]["circle/name"]}</Text>
                            </TouchableOpacity>}
                        </View>
                    ))}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View style={{width: 50}}></View>
                {!!user && 
                <Text style={styles.title}>
                    {user["first-name"]} {user["last-name"]}
                </Text>}
                <EvilIcon name="gear" style={styles.topRightIcon} size={40} color="white" onPress={() => navigation.navigate('Settings')}/>
            </View>
            <ScrollView refreshControl={
          <RefreshControl
                    refreshing={loading}
                    onRefresh={() => {
                        dispatch(getRankingsAction())
                    }}
                />
                }>
                <TouchableOpacity onPress={() => handlePress()} style={photo ? styles.profileSel : styles.profileSelNoImage}>
                    <ImageBackground style={styles.backgroundImage} imageStyle={{borderRadius: 20}} source={{uri: photo ? photo.uri : user["profile-pic"]}} />
                    <View style={styles.plusSign}><EntypoIcon name="plus" size={35} color="white"/></View>
                </TouchableOpacity>
                {renderSuperlatives(rankings.filter(rank => !hiddenSuperlatives.includes(rank["rank/question"]["question/id"])))}
                <Text style={styles.myRankingsTxt}>My Rankings</Text>
                {renderNonSuperlatives(rankings.filter(rank => !hiddenSuperlatives.includes(rank["rank/question"]["question/id"])))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242629',
    }, 

    noRankingsText: {
        color: '#BABBBC',
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 20,
        alignSelf: 'center',
    },

    noRankingsImage: {
        height: 100,
        marginVertical: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
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
    
    topRightIcon: {
        paddingRight: 10,
        paddingTop: 3
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
        maxWidth: 150,
    },

    rankingContainer: {
        width: 130,
        margin: 8,
    },
})

export default Profile;