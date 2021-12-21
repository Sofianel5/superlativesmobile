import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useAppDispatch } from '../../../app/hooks';
import SuperlativeIcon from './SuperlativeIcon';
import { seeAllMembersPageOpened } from '../../../services/Analytics';

const MemberList = ({route, navigation}) => {

    React.useEffect(seeAllMembersPageOpened, []);

    const circle = route.params.circle;


    function renderMemberRow(user: any) {
        return (
            <View style={styles.nonWinnerRow}>
                <Image source={{uri: user["user/profile-pic"]}} style={styles.nonWinnerImage}/>
                <Text style={styles.nonWinnerName}>{user["user/first-name"]} {user["user/last-name"]}</Text>
                <Text style={styles.nonWinnerScore}></Text>
            </View>
        );
    }
    

    function renderMembers() {
        return (
            [...Object.values(circle["circle/members"])].map(renderMemberRow)
        );
    }

    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
            <View style={styles.topBar}>
                <Text style={styles.superlativeTitle} ellipsizeMode='tail' numberOfLines={1}>
                 {circle["circle/name"]} Members
                </Text>
            </View>
            <ScrollView>
                <View style={styles.nonWinnerContainer}>
                    {renderMembers()}
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

    errorText: {
        color: 'white',
        fontSize: 20,
        fontFamily: "Montserrat-SemiBold",
        textAlign: 'center',
        alignSelf: 'center',
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
        maxHeight: 22
        
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

export default MemberList;