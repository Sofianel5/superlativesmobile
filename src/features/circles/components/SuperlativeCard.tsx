import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SuperlativeIcon from "../../../components/SuperlativeIcon";
import { recordCheckSuperlative } from '../../../services/Analytics';

function hasRanking(question: any) {
    return question["question/ranks"] && question["question/ranks"].length > 0;
}

function shouldShowRunnersUp(question: any) {
    return question["question/ranks"] && question["question/ranks"].length > 1;
}

function getAssocUser(userId: string, circle: any) {
    return circle["circle/members"][userId];
}

function sortedRanks(question: any) {
    let ranks = []
    for (let i in question["question/ranks"]) {
        ranks.push(question["question/ranks"][i])
    }
    return ranks.sort((a,b) => b["rank/value"] - a["rank/value"])
}


function getFullRankingsObj(question, circle) {
    return {
        "rank/question": {
            "question/id": question["question/id"],
            "question/text": question["question/text"],
            "question/circle": {
                "circle/name": circle["circle/name"],
                "circle/id": circle["circle/id"]
            },
            "question/ranks": question["question/ranks"].map((rank) => {
                return {
                    "rank/user": {
                        "user/id": rank["rank/user"]["user/id"],
                        "user/first-name": getAssocUser(rank["rank/user"]["user/id"], circle)["user/first-name"],
                        "user/last-name": getAssocUser(rank["rank/user"]["user/id"], circle)["user/last-name"],
                        "user/profile-pic": getAssocUser(rank["rank/user"]["user/id"], circle)["user/profile-pic"],
                    },
                    "rank/value": rank["rank/value"],
                };
            }),
        }
    }
}

function SuperlativeCard({ question, navigation, circle, id }) {
    return (
        <TouchableOpacity style={styles.superlativeCard} onPress={() => {
            if (hasRanking(question)) {
                recordCheckSuperlative(question["question/id"], "circle_detail");
                navigation.navigate('SuperlativeDetails', getFullRankingsObj(question, circle))
            }
            }}>
            {hasRanking(question) ? (
                <>
                    <View style={styles.superlativeWinner}>
                        {(id === sortedRanks(question)[0]["rank/user"]["user/id"])
                            ? <Text style={styles.superlativeTitleMe} numberOfLines={1}>{question["question/text"]}</Text>
                            : <Text style={styles.superlativeTitle} numberOfLines={1}>{question["question/text"]}</Text>
                        }
                        <View style={styles.superlativeBadge}>
                            <SuperlativeIcon width={82.5} height={72}/>
                        </View>
                        <Image source={{uri: getAssocUser(sortedRanks(question)[0]["rank/user"]["user/id"], circle)["user/profile-pic"]}} style={styles.superlativeWinnerPic} />
                        {(id === sortedRanks(question)[0]["rank/user"]["user/id"])
                        ? <Text style={styles.superlativeWinnerNameMe}>
                            {getAssocUser(sortedRanks(question)[0]["rank/user"]["user/id"], circle)["user/first-name"]}
                            {" "}
                            {getAssocUser(sortedRanks(question)[0]["rank/user"]["user/id"], circle)["user/last-name"].charAt(0)}.
                        </Text>
                        : <Text style={styles.superlativeWinnerName}>
                        {getAssocUser(sortedRanks(question)[0]["rank/user"]["user/id"], circle)["user/first-name"]}
                        {" "}
                        {getAssocUser(sortedRanks(question)[0]["rank/user"]["user/id"], circle)["user/last-name"].charAt(0)}.
                    </Text>
                        }
                    </View>
                    <View style={styles.closeComers}>
                        <Text style={styles.closeComerText}>Runners Up</Text>
                        {shouldShowRunnersUp(question) && sortedRanks(question).slice(1, 4).map((rank: any) => (
                            <View key={rank["rank/user"]["user/id"]} style={styles.closeComer}>
                                <Image source={{uri: getAssocUser(rank["rank/user"]["user/id"], circle)["user/profile-pic"]}} style={styles.closeComerPic} />
                                {(id === rank["rank/user"]["user/id"])
                                    ? <Text style={styles.closeComerNameMe}>{getAssocUser(rank["rank/user"]["user/id"], circle)["user/first-name"]} {getAssocUser(rank["rank/user"]["user/id"], circle)["user/last-name"].charAt(0)}.</Text>
                                    : <Text style={styles.closeComerName}>{getAssocUser(rank["rank/user"]["user/id"], circle)["user/first-name"]} {getAssocUser(rank["rank/user"]["user/id"], circle)["user/last-name"].charAt(0)}.</Text>
                                }
                            </View>
                        ))}
                    </View>
                </>
                
            ) : <>
                <View style={{alignItems: 'center', width: '100%'}}>
                    <Text style={styles.superlativeTitleNoRank} numberOfLines={1}>{question["question/text"]}</Text>
                    <Text style={styles.superlativeSubtitleNoRank} numberOfLines={1}>No rankings yet</Text>
                </View>
                </>}
        </TouchableOpacity>
    );
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

    addSuperlativeContainer: {
        flexDirection: 'row',
        backgroundColor: '#16161A',
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8,
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        justifyContent: 'space-between',
    },

    superlativeText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
    },

    superlativeRight: {
        alignSelf: 'flex-end',
    },

    membersTitle: {
        color: "white",
        marginTop: 23,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 21,
    },

    groupTitle: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 8,
    },

    members: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 20,
    },

    memberCard: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    profilePic: {
        height: 50,
        width: 50,
        borderRadius: 13,
        marginRight: 10,
    },

    member: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
    },

    seeAll: {
        marginTop: 10,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 19,
    },

    superlativeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#16161A',
        padding: 20,
        marginTop: 15,
        borderRadius: 12,
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        height: 160,
    },

    superlativeBadge: {
        width: 82.5,
        height: 72,
    },

    superlativeTitle: {
        fontFamily: "Montserrat-SemiBold",
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
    },

    superlativeTitleMe: {
        fontFamily: "Montserrat-SemiBold",
        color: '#7F5AF0',
        fontSize: 14,
        marginBottom: 5,
    },

    superlativeTitleNoRank: {
        fontFamily: "Montserrat-SemiBold",
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
    },

    superlativeSubtitleNoRank: {
        fontFamily: "Montserrat-SemiBold",
        color: 'white',
        fontSize: 15,
        marginTop: 15,
        alignSelf: 'center',
    },

    superlativeWinner: {
        alignItems: 'center',
        marginLeft: 25,
        width: 120,
    },

    superlativeWinnerPic: {
        height: 60,
        width: 45,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'relative',
        bottom: 66,
    },

    superlativeWinnerName: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 16,
        color: 'white',
        position: 'relative',
        bottom: 57,
    },

    superlativeWinnerNameMe: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 16,
        color: '#7F5AF0',
        position: 'relative',
        bottom: 57,
    },

    // closeComers: {
    //     paddingLeft: 50,
    // },

    closeComer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },

    closeComerPic: {
        height: 29,
        width: 29,
        borderRadius: 8,
        marginRight: 10,
    },

    closeComerText: {
        fontFamily: "Montserrat-SemiBold",
        color: "white",
        fontSize: 18,
    },

    closeComerName: {
        fontFamily: "Montserrat",
        color: 'white',
        fontSize: 16,
    },

    closeComerNameMe: {
        fontFamily: "Montserrat-SemiBold",
        color: '#7F5AF0',
        fontSize: 16,
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

    createButton: {
        backgroundColor: "#7F5AF0",
        height: 50,
        width: 140,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        alignSelf: 'center',
        marginTop: 20,
    },

    createText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
    },

    leaderboardsTitle: {
        marginTop: 15,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 23,
        alignSelf: 'center',
    },

    inviteBtn: {
        backgroundColor: '#7F5AF0',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        height: 50,
        width: 120,
        borderRadius: 16,
    },

    inviteText: {
        color: 'white',
        fontSize: 22,
        fontFamily: "Montserrat-SemiBold",
    },
})

export default SuperlativeCard;