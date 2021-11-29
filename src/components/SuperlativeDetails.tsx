import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import SuperlativeIcon from './SuperlativeIcon';

const SuperlativeDetails = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
            <View style={styles.topBar}>
                <Text style={styles.superlativeTitle}>
                    Worst Person @ SAE MIT
                </Text>
            </View>
            <ScrollView>
                <View style={styles.voteCountContainer}>
                    <Text style={styles.voteCount}>Vote Count: 100</Text>
                </View>
                <View style={styles.firstPlaceContainer}>
                    <Text style={styles.winnerTitle}>
                        Worst Person
                    </Text>
                    <SuperlativeIcon width={165} height={144} style={styles.superlativeIcon}/>
                    <Image source={require('../../assets/images/liam.jpg')} style={styles.winnerImage }/>
                    <Text style={styles.winnerName}>
                        Liam Kronman
                    </Text>
                    <Text style={styles.winnerScore}>1791</Text>
                </View>
                <View style={styles.nonWinnerContainer}>
                    <Text style={styles.nonWinnerTitle}>Runners Up</Text>
                    <View style={styles.nonWinnerRow}>
                        <Image source={require('../../assets/images/liam.jpg')} style={styles.nonWinnerImage}/>
                        <Text style={styles.nonWinnerName}>Liam Kronman</Text>
                        <Text style={styles.nonWinnerScore}>1400</Text>
                    </View>
                    <View style={styles.nonWinnerRow}>
                        <Image source={require('../../assets/images/liam.jpg')} style={styles.nonWinnerImage}/>
                        <Text style={styles.nonWinnerName}>Liam Kronman</Text>
                        <Text style={styles.nonWinnerScore}>1300</Text>
                    </View>
                    <View style={styles.nonWinnerRow}>
                        <Image source={require('../../assets/images/liam.jpg')} style={styles.nonWinnerImage}/>
                        <Text style={styles.nonWinnerName}>Liam Kronman</Text>
                        <Text style={styles.nonWinnerScore}>1200</Text>
                    </View>
                    <Text style={styles.nonWinnerTitle}>Leftovers</Text>
                    <View style={styles.nonWinnerRow}>
                        <Image source={require('../../assets/images/liam.jpg')} style={styles.nonWinnerImage}/>
                        <Text style={styles.nonWinnerName}>Liam Kronman</Text>
                        <Text style={styles.nonWinnerScore}>1400</Text>
                    </View>
                    <View style={styles.nonWinnerRow}>
                        <Image source={require('../../assets/images/liam.jpg')} style={styles.nonWinnerImage}/>
                        <Text style={styles.selfName}>Liam Kronman</Text>
                        <Text style={styles.selfScore}>1300</Text>
                    </View>
                    <View style={styles.nonWinnerRow}>
                        <Image source={require('../../assets/images/liam.jpg')} style={styles.nonWinnerImage}/>
                        <Text style={styles.nonWinnerName}>Liam Kronman</Text>
                        <Text style={styles.nonWinnerScore}>1200</Text>
                    </View>
                    <View style={styles.nonWinnerRow}>
                        <Image source={require('../../assets/images/liam.jpg')} style={styles.nonWinnerImage}/>
                        <Text style={styles.nonWinnerName}>Liam Kronman</Text>
                        <Text style={styles.nonWinnerScore}>1400</Text>
                    </View>
                    <View style={styles.nonWinnerRow}>
                        <Image source={require('../../assets/images/liam.jpg')} style={styles.nonWinnerImage}/>
                        <Text style={styles.nonWinnerName}>Liam Kronman</Text>
                        <Text style={styles.nonWinnerScore}>1300</Text>
                    </View>
                    <View style={styles.nonWinnerRow}>
                        <Image source={require('../../assets/images/liam.jpg')} style={styles.nonWinnerImage}/>
                        <Text style={styles.nonWinnerName}>Liam Kronman</Text>
                        <Text style={styles.nonWinnerScore}>1200</Text>
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
        alignItems: 'center',
        paddingTop: 55,
        justifyContent: 'space-between',
        // flexDirection: 'row',
    },

    superlativeTitle: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 19,
        alignSelf: 'center',
        marginTop: 13,
    },

    voteCountContainer: {
        alignItems: 'flex-end',
        padding: 12,
    },

    voteCount: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 16.5,
    },

    firstPlaceContainer: {
        alignItems: 'center',
    },

    winnerTitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 18,
        marginBottom: 5,
    },

    superlativeIcon: {
        shadowOffset: {height: 4},
        shadowOpacity: 0.8,
    },

    winnerImage: {
        width: 90,
        position: 'absolute',
        height: 125,
        top: 36.5,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },

    winnerName: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 16,
        marginTop: 5,
    },

    winnerScore: {
        alignSelf: 'flex-end',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        color: 'white',
        position: 'absolute',
        right: 15,
        top: 88,
    },

    nonWinnerContainer: {
        padding: 15,
    },

    nonWinnerTitle: {
        color: '#2CB67D',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        marginTop: 12,
    },

    nonWinnerRow: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    nonWinnerImage: {
        height: 50,
        width: 50,
        borderRadius: 12,
    },

    nonWinnerName: {
        marginLeft: 8,
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: 'white',
    },

    nonWinnerScore: {
        position: 'absolute',
        right: 0,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: 'white',
    },

    selfName: {
        marginLeft: 8,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: '#7F5AF0',
    },

    selfScore: {
        position: 'absolute',
        right: 0,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: '#7F5AF0',
    },
})

export default SuperlativeDetails;