import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import { requestSignupAction } from '../authSlice';
import Icon from 'react-native-vector-icons/Entypo';


const Name = ({navigation}) => {
    const [phone, setPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const dispatch = useAppDispatch();
    const {auth: {status, formErrors, incompleteUser}} = useAppSelector((state) => state);

    React.useEffect(() => {
        if (incompleteUser.firstName && incompleteUser.lastName && incompleteUser.phone) {
            navigation.navigate('Verify', {})
        }
    }, [incompleteUser]);

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
        dispatch(requestSignupAction({firstName, lastName, phone: parsePhoneNumberFromString(phone, 'US')?.format("E.164")}))
        // navigation.navigate('Verify', {phone, firstName, lastName})
    }

    const renderButton = () => {
        if (status === 'loading') {
            return <TouchableOpacity style={styles.readyBtn}>
                        <ActivityIndicator size="large" color="white" />
                    </TouchableOpacity>
        } else {
            return <TouchableOpacity onPress={() => handleSubmit()} style={styles.readyBtn}>
                        <Text style={styles.readyText}>
                            I'm Ready ;)
                        </Text>
                    </TouchableOpacity>
        }
    }

    const renderFormError = (errs) => {
        if (errs && errs.length > 0) {
            return errs.map(err => <Text style={styles.error}>{err}</Text>)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.flexTop}>
                    <View>
                        <Icon name="chevron-left" color="white" size={40} onPress={() => navigation.navigate('Splash')}/>
                    </View>
                    <View style={styles.circlesContainer}>
                        <View style={styles.circles}>
                            <View style={styles.markedCircle} />
                            <View style={styles.unmarkedCircle}></View>
                            <View style={styles.unmarkedCircle}></View>
                            <View style={styles.unmarkedCircle}></View>
                        </View>
                    </View>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.header}>
                        First Name
                    </Text>
                    <TextInput style={styles.input} autoFocus autoCorrect={false} returnKeyType="next" onSubmitEditing={() => lastNameRef.current.focus()} selectionColor={'white'} placeholder="McLovin'" placeholderTextColor="#94A1B2" value={firstName} onChangeText={text => setFirstName(text) }/>
                    {renderFormError(formErrors["first-name"])}
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.header}>
                        Last Name
                    </Text>
                    <TextInput style={styles.input} ref={lastNameRef} autoCorrect={false} returnKeyType="next" onSubmitEditing={() => phoneRef.current.focus()} selectionColor={'white'} placeholder="Just McLovin'" placeholderTextColor="#94A1B2" value={lastName} onChangeText={text => setLastName(text) } />
                    {renderFormError(formErrors["last-name"])}
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.header}>Phone Number</Text>
                    <TextInput style={styles.input} ref={phoneRef} returnKeyType="go" onSubmitEditing={() => handleSubmit()} selectionColor={'white'} placeholder="(420) 420-6969" placeholderTextColor="#94A1B2" onChangeText={num => onTextChange(num)} value={phone} keyboardType='phone-pad' />
                    {renderFormError(formErrors["phone"])}
                </View>
                {[firstName, lastName, phone].every(v => v && v !== '') && 
                renderButton()}
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

    error: {
        color: 'red',
        fontFamily: 'Montserrat',
        fontSize: 22,
        marginBottom: 6,
        maxWidth:300
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
        width: 300,
        alignItems: 'center',
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
})

export default Name