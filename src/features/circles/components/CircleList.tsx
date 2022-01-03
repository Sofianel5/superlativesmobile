import React from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getCirclesAction } from "../circlesSlice";
import { recordCircleOpen, recordCircleCreationPageOpen } from "../../../services/Analytics";

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
}

function renderCircles({circles, navigation}) {
    const user = useAppSelector((state) => state.auth.user);
    return Object.values(circles).map((circle) => {
        return (
            <View key={circle["circle/id"]} style={styles.group}>
                <Text style={styles.groupTitle}>
                    {circle["circle/name"]}
                </Text>
                <Text style={styles.members}>
                    {Object.keys(circle["circle/members"]).length} members
                </Text>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={user.id === circle?.["circle/admin"]?.["user/id"] ? styles.manage : styles.view} onPress={() => {ReactNativeHapticFeedback.trigger("impactHeavy", options);recordCircleOpen(circle["circle/id"]);navigation.navigate('CircleDetail', {circleId: circle["circle/id"]})}}>
                        <Text style={styles.viewText}>
                            {user.id === circle?.["circle/admin"]?.["user/id"] ? "Manage" : "View"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    });
}

export default function CirclesList(circles) {
    const navigation = useNavigation();
    console.log("CirclesHere:", JSON.stringify(circles));
    //console.log(circles.circles["d1dc0820-ddd6-4a23-bf4a-9c97c14363ee"]["circle/questions"].length);
    const loading = useAppSelector((state) => state.circles.loading);
    const dispatch = useAppDispatch();
    return (
        <ScrollView style={{paddingRight: 20}} keyboardShouldPersistTaps={"always"} refreshControl={
            <RefreshControl
                      refreshing={loading}
                      onRefresh={() => {
                          dispatch(getCirclesAction())
                      }}
                  />
                  }>
            {renderCircles(circles)}
            <View>
                <TouchableOpacity style={styles.newGroup} onPress={() => {ReactNativeHapticFeedback.trigger("impactHeavy", options);recordCircleCreationPageOpen();navigation.navigate('CreateCircle')}}>
                    <Icon name="plus" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{height: 50}}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    
    title: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        marginTop: 40,
        marginBottom: 15,
    },

    group: {
        marginTop: 30,
        backgroundColor: '#16161A',
        width: '100%',
        height: 200,
        borderRadius: 8,
        shadowOffset : {height: 4, width: 4},
        shadowOpacity: 0.8,
    },

    groupTitle: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
    },

    members: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 20,
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

    manage: {
        width: 250,
        backgroundColor: '#7F5AF0',
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

    newGroup: {
        backgroundColor: "#7F5AF0",
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset : {height: 4, width: 4},
        shadowOpacity: 0.8,
        alignSelf: 'center',
        marginTop: 30,
    },

    plus: {
        fontFamily: 'Montserrat',
        fontSize: 40,
        color: 'white',
    }
})