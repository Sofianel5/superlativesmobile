import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import SuperlativeIcon from '../../../components/SuperlativeIcon';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getRankingsForCircleAction } from '../circlesSlice';
import SuperlativeCard from '../components/SuperlativeCard';

const CircleDetail = ({route, navigation}) => {

    const circle = useAppSelector((state) => state.circles.circles[route.params.circleId]);
    const user = useAppSelector((state) => state.auth.user);
    const loading = useAppSelector((state) => state.circles.loading);

    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getRankingsForCircleAction(circle["circle/id"]));
    }, []);

    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
            <View style={styles.topBar}>
                <Text style={styles.groupTitle}>
                    {circle["circle/name"]}
                </Text>
            </View>
            <ScrollView refreshControl={
          <RefreshControl
                    refreshing={loading}
                    onRefresh={() => {
                        dispatch(getRankingsForCircleAction(circle["circle/id"]));
                    }}
                />
                }>
                <View style={{paddingLeft: 20, paddingRight: 20,}}>
                    { (user.id === circle["circle/admin"]["user/id"]) ? <TouchableOpacity style={styles.addSuperlativeContainer} onPress={() => navigation.navigate('ManageSuperlatives', {circle})}>
                        <Text style={styles.superlativeText}>Manage superlatives</Text>
                        <Icon name="chevron-right" size={30} style={styles.superlativeRight} color="white" /> 
                    </TouchableOpacity> : <View></View> }
                    { (user.id === circle["circle/admin"]["user/id"]) ? <TouchableOpacity style={styles.addSuperlativeContainer} onPress={() => navigation.navigate('ModifyMembers', {circle})}>
                        <Text style={styles.superlativeText}>Modify members</Text>
                        <Icon name="chevron-right" size={30} style={styles.superlativeRight} color="white" /> 
                    </TouchableOpacity> : <View></View> }
                    <TouchableOpacity style={styles.addSuperlativeContainer} onPress={() => navigation.navigate('SelectSuperlativeSource', {circleId: route.params.circleId})}>
                        <Text style={styles.superlativeText}>Add a Superlative</Text>
                        <Icon name="chevron-right" size={30} style={styles.superlativeRight} color="white" /> 
                    </TouchableOpacity>
                    <Text style={styles.membersTitle}>Members ({Object.keys(circle["circle/members"]).length})</Text>
                    {Object.values(circle["circle/members"]).slice(0, 3).map((member: any) => (
                        <View key={member["user/id"]} style={styles.memberCard}>
                            <Image source={{uri: member["user/profile-pic"]}} style={styles.profilePic} />
                            <Text style={styles.member}>{member["user/first-name"]} {member["user/last-name"]} {member["user/id"] == circle["circle/admin"]["user/id"] ? "(Admin)" : ""}</Text>
                        </View>
                    ))}
                    {Object.keys(circle["circle/members"]).length > 3 && <Text style={styles.seeAll} onPress={() => (user.id === circle["circle/admin"]["user/id"]) ? navigation.navigate('ModifyMembers', {circle}) : navigation.navigate('MemberList', {circle})}>See all...</Text>}
                    <Text style={styles.leaderboardsTitle}>Superlatives</Text>
                    {Object.values(circle["circle/questions"]).map((question: any) => (
                        <SuperlativeCard key={question["question/id"]} question={question} circle={circle} navigation={navigation} />
                    ))}
                    <View style={{height: 100}}></View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.inviteBtn} onPress={() => navigation.navigate('Invite', {circleId: route.params.circleId})}>
                <Text style={styles.inviteText}>Invite</Text>
            </TouchableOpacity>
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
        fontSize: 20,
        marginBottom: 5,
    },

    superlativeWinner: {
        alignItems: 'center',
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

    closeComers: {
        paddingLeft: 50,
    },

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
        fontFamily: "Montserrat-SemiBold",
        color: 'white',
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

export default CircleDetail;