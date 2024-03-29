import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { hideSuperlativeAction } from '../features/circles/circlesSlice';
import SuperlativeIcon from './SuperlativeIcon';

const SuperlativeDetails = ({route, navigation}) => {
    const rankings = route.params;
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useDispatch();
    console.log(JSON.stringify(rankings));
    const sortedRanks = [...rankings["rank/question"]["question/ranks"]].sort((a, b) => b["rank/value"] - a["rank/value"]);
    function renderWinner() {
        if (sortedRanks.length >= 1) {
            return (
                <View style={styles.firstPlaceContainer}>
                    <Text style={styles.winnerTitle}>
                        {rankings["rank/question"]["question/text"]}
                    </Text>
                    <SuperlativeIcon width={165} height={144} style={styles.superlativeIcon}/>
                    <Image source={{uri: sortedRanks[0]["rank/user"]["user/profile-pic"]}} style={styles.winnerImage }/>
                    <Text style={sortedRanks[0]["rank/user"]["user/id"] == user["id"] ? Object.assign({}, styles.winnerName, styles.isUser) : styles.winnerName}>
                        {sortedRanks[0]["rank/user"]["user/first-name"]} {sortedRanks[0]["rank/user"]["user/last-name"]}
                    </Text>
                    <Text style={styles.winnerScore}>{sortedRanks[0]["rank/value"] - 1400}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.firstPlaceContainer}>
                    <Text style={styles.errorText}>No rankings yet!</Text>
                </View>
            );
        }
    }

    function renderRankRow(rank: any) {
        return (
            <View style={styles.nonWinnerRow}>
                <Image source={{uri: rank["rank/user"]["user/profile-pic"]}} style={styles.nonWinnerImage}/>
                <Text style={rank["rank/user"]["user/id"] == user["id"] ? Object.assign({}, styles.nonWinnerName, styles.isUser) : styles.nonWinnerName}>{rank["rank/user"]["user/first-name"]} {rank["rank/user"]["user/last-name"]}</Text>
                <Text style={styles.nonWinnerScore}>{rank["rank/value"] - 1400}</Text>
            </View>
        );
    }

    function renderRunnersUp() {
        if (sortedRanks.length > 1) {
            return (
                [...sortedRanks].slice(1, 4).map(renderRankRow)
            );
        } else {
            return (
                <View style={styles.nonWinnerRow}>
                    <Text style={styles.errorText}>No further rankings!</Text>
                </View>
            );
        }
    }

    function renderLeftovers() {
        if (sortedRanks.length > 4) {
            return (
                [...sortedRanks].slice(4).map(renderRankRow)
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    function renderReportButton() {
        return (<Text style={styles.reportText} onPress={() => {Alert.alert(
            "Report Superlative",
            "Are you sure you want to report this superlative? You will no longer be able to view it.",
            [
              {
                text: "Nah",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => dispatch(hideSuperlativeAction({questionId: rankings["rank/question"]["question/id"], circleId: rankings["rank/question"]["question/circle"]["circle/id"]})) }
            ]
          );}}>Report superlative</Text>);
    }

    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
            <View style={styles.topBar}>
                <Text style={styles.superlativeTitle} ellipsizeMode='tail' numberOfLines={1}>
                    {rankings["rank/question"]["question/text"]} @ {rankings["rank/question"]["question/circle"]["circle/name"]}
                </Text>
            </View>
            <ScrollView>
                <View style={styles.voteCountContainer}>
                    {/* <Text style={styles.voteCount}>Vote Count: 100</Text> */}
                </View>
                {renderWinner()}
                <View style={styles.nonWinnerContainer}>
                    <Text style={styles.nonWinnerTitle}>Runners Up</Text>
                    {renderRunnersUp()}
                    {sortedRanks.length > 4 ? <Text style={styles.nonWinnerTitle}>Leftovers</Text> : <View></View>}
                    {renderLeftovers()}
                </View>
                {renderReportButton()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242629',
    },

    errorText: {
        color: 'white',
        fontSize: 20,
        fontFamily: "Montserrat-SemiBold",
        textAlign: 'center',
        alignSelf: 'center',
    },

    reportText: {
        color: 'white',
        fontSize: 12,
        textDecorationLine: 'underline',
        alignSelf: 'center',
        marginVertical: 30
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
        maxWidth: '80%',
        maxHeight: 22,
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
        textAlign: 'center',
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

    isUser: {
        color: '#7F5AF0',
        fontFamily: 'Montserrat-SemiBold',
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