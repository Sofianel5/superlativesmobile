import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import { loginAction } from '../authSlice';
import Icon from 'react-native-vector-icons/Entypo';


const Login = ({navigation}) => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const phoneRef = useRef();
    const passwordRef = useRef();
    const dispatch = useAppDispatch();

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

    const handleSubmit = () => {
        Keyboard.dismiss()
        dispatch(loginAction({phone: parsePhoneNumberFromString(phone, 'US')?.format("E.164"), password}))
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.flexTop}>
                    <View>
                        <Icon name="chevron-left" color="white" size={40} onPress={() => navigation.navigate('Splash')}/>
                    </View>
                    <View style={styles.circlesContainer}>
                    </View>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.error}>Error</Text>
                    <Text style={styles.header}>Phone Number</Text>
                    <TextInput style={styles.input} autoFocus ref={phoneRef} returnKeyType="go" onSubmitEditing={() => passwordRef.current.focus()} selectionColor={'white'} placeholder="(420) 420-6969" placeholderTextColor="#94A1B2" onChangeText={num => onTextChange(num)} value={phone} keyboardType='phone-pad' />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.header}>Password</Text>
                    <TextInput style={styles.input} ref={passwordRef} onSubmitEditing={handleSubmit} selectionColor={'white'} placeholderTextColor="#94A1B2" secureTextEntry={true} onChangeText={text => setPassword(text) }/>
                </View>
                {[phone, password].every(v => v && v !== '') && 
                <TouchableOpacity onPress={() => handleSubmit()}
                style={styles.readyBtn}
                >
                    <Text style={styles.readyText}>
                        I'm Ready ;)
                    </Text>
                </TouchableOpacity>}
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: '15%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#16161A',
    },

    flexTop: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingBottom: '2%',
    },

    inputView: {
        marginBottom: 17,
    },

    header: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 5,
    },

    input: {
        height: 60,
        width: 300,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 28,
        padding: 10,
        backgroundColor: "#242629",
        borderRadius: 10,
        color: 'white',
        shadowColor: "#00000040",
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },

    readyBtn: {
        //marginTop: 120,
        //marginBottom: 70,
        backgroundColor: '#7F5AF0',
        paddingLeft: 80,
        paddingRight: 80,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 6,
        shadowOffset : { width: 4, height: 4},
        shadowOpacity: 0.8,
    },
    
    readyText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 23,
    },

    circlesContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: '5%',
        paddingBottom: '5%',
    },

    circles: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    unmarkedCircle: {
        marginLeft: 13,
        height: 10,
        width: 10,
        backgroundColor: "#C4C4C4",
        borderRadius: 8,
    },

    markedCircle: {
        height: 10,
        width: 10,
        backgroundColor: "#2CB67D",
        borderRadius: 8,
    },

    error: {
        color: 'red',
        fontFamily: 'Montserrat',
        fontSize: 22,
        marginBottom: 6,
    }
})

export default Login;