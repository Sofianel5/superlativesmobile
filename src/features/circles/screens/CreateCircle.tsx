import React, { Component, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PopinButton from 'react-native-popin-button';
import SuperlativeIcon from '../../../components/SuperlativeIcon';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addCustomSuperlativeAction } from '../circlesSlice';
import Snackbar from 'react-native-snackbar';
import CheckBox from '@react-native-community/checkbox';
import QuestionPackPicker from '../../../components/QuestionPackPicker';

const CreateCircleScreen = ({route, navigation}) => {
    const questionPacks = useAppSelector((state) => state.circles.questionPacks);
    const dispatch = useAppDispatch();
    const [circleName, setCircleName] = useState('');
    const [value, setValue] = useState(null);

    function handleSubmit() {
        if (circleName && circleName.trim().length > 0) {
            setCircleName('');
            Snackbar.show({
                text: 'Superlative added!',
                duration: Snackbar.LENGTH_SHORT,
            });
            //dispatch(addCustomSuperlativeAction({circleId: route.params.circleId, superlative: question}));
            navigation.pop();
        }
    }

    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
            <View style={styles.topBar}>
                <Text style={styles.groupTitle}>
                    Create Circle
                </Text>
            </View>
            <View style={{paddingLeft: 20, paddingRight: 20,}}>
                <View>
                    <Text style={styles.inputTitle}>Circle Name</Text>
                </View>
                <TextInput style={styles.addSuperlativeContainer} autoFocus selectionColor={'white'} onSubmitEditing={() => handleSubmit()} onChangeText={text => setCircleName(text)} placeholder="Phi Psi @ Stanford" placeholderTextColor="#94A1B2" />
                <View style={{}}>
                    <QuestionPackPicker questionPacks={questionPacks} onChange={(i)=> {setValue(i)}}></QuestionPackPicker>
                </View>
                <PopinButton onPress={() => handleSubmit()}
                style={styles.readyBtn} shrinkTo={0.7}
                >
                    <Text style={styles.readyText}>
                        Create
                    </Text>
                </PopinButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    inputTitle: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 20,
    },

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
        backgroundColor: '#16161A',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 8,
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        marginBottom: 7.5,
        marginTop: 10,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        textAlign: 'left',
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
        fontSize: 25,
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

    readyBtn: {
        marginTop: 25,
        backgroundColor: '#7F5AF0',
        paddingLeft: 50,
        paddingRight: 50,
        paddingVertical: 15,
        borderRadius: 6,
        alignItems: 'center',
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        zIndex: -1
    },
    
    readyText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 23,
    },

})

export default CreateCircleScreen;