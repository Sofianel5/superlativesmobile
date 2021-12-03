import React, { Component, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PopinButton from 'react-native-popin-button';
import SuperlativeIcon from '../../../components/SuperlativeIcon';
import { useAppDispatch } from '../../../app/hooks';
import { inviteUserAction } from '../circlesSlice';
import Snackbar from 'react-native-snackbar';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

const InvitePhoneScreen = ({route, navigation}) => {
    const dispatch = useAppDispatch();
    const [phone, setPhone] = useState('');

    function handleSubmit() {
        const parsedPhone = parsePhoneNumberFromString(phone, 'US')?.format("E.164")
        if (parsedPhone && parsedPhone.trim().length > 0) {
            Snackbar.show({
                text: 'Invited!',
                duration: Snackbar.LENGTH_SHORT,
            })
            dispatch(inviteUserAction({circleId: route.params.circleId, phone: parsedPhone}));
            setPhone('');
        }
    }

    const onTextChange = (number: string) => {
        const num = parsePhoneNumberFromString(number, 'US')
        let reg = /^[0-9]/
        if (!!num && phone.length > number.length && !reg.test(phone[phone.length - 1])){
          let phoneNums = num.nationalNumber.split('')
          phoneNums.pop()
          let phoneNum = phoneNums.join('')
          setPhone(phoneNum)
        } else {
            setPhone(new AsYouType('US').input(number))
        }
    }

    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
            <View style={styles.topBar}>
                <Text style={styles.groupTitle}>
                    Invite Number
                </Text>
            </View>
            <View style={{paddingLeft: 20, paddingRight: 20,}}>
                <TextInput style={styles.addSuperlativeContainer} value={phone} autoFocus selectionColor={'white'} onSubmitEditing={handleSubmit} onChangeText={onTextChange} placeholder="(420) 420 6969" placeholderTextColor="#94A1B2" />
                <PopinButton onPress={handleSubmit}
                style={styles.readyBtn} shrinkTo={0.7}
                >
                    <Text style={styles.readyText}>
                        Invite
                    </Text>
                </PopinButton>
            </View>
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
        backgroundColor: '#16161A',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 8,
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        marginBottom: 7.5,
        marginTop: 15,
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
    },
    
    readyText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 23,
    },

})

export default InvitePhoneScreen;