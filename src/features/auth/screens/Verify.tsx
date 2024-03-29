import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Platform, Keyboard } from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import { verifyNumberAction } from '../authSlice';
import PopinButton from 'react-native-popin-button';
import Icon from 'react-native-vector-icons/Entypo';

const Verify = ({navigation}) => {
    const [verify, setVerify] = useState('')
    const {auth: {status, formErrors, incompleteUser }} = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (incompleteUser.verified) {
            navigation.navigate('ProfilePic', {firstName: incompleteUser.firstName})
        }
    }, [incompleteUser]);

    const onTextChange = (number: string) => {
        setVerify(number)
        if (number.length === 6) {
            dispatch(verifyNumberAction(number));
        }
    }

    const handleSubmit = () => {
        Keyboard.dismiss()
        dispatch(verifyNumberAction(verify))
    }

    const renderButton = () => {
        if (status === 'loading') {
            return <TouchableOpacity style={styles.readyBtn}>
                        <ActivityIndicator size="large" color="white" />
                    </TouchableOpacity>
        } else {
            return <TouchableOpacity onPress={() => handleSubmit()} style={styles.readyBtn}>
                        <Text style={styles.readyText}>
                            I'm Real
                        </Text>
                    </TouchableOpacity>
        }
    }

    const renderFormError = (errs) => {
        console.log("form errors verify:", errs)
        if (errs && errs.length > 0) {
            return errs.map(err => <Text style={styles.error}>{err}</Text>)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.flexTop}>
                <View>
                    <Icon name="chevron-left" color="white" size={40} onPress={() => navigation.pop()}/>
                </View>
                <View style={styles.circlesContainer}>
                    <View style={styles.circles}>
                        <View style={styles.unmarkedCircle}></View>
                        <View style={styles.markedCircle} />
                        <View style={styles.unmarkedCircle}></View>
                        <View style={styles.unmarkedCircle}></View>
                    </View>
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.header}>
                    Verification code
                </Text>
                <TextInput style={styles.input} autoFocus selectionColor={'white'} returnKeyType="go" onSubmitEditing={() => handleSubmit()} onChangeText={num => onTextChange(num)} placeholder="042069" placeholderTextColor="#94A1B2" textAlign={'center'} keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"} />
            </View>
            {renderFormError(formErrors.phone)}
            {renderButton()}
        </View>
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
        paddingBottom: '2%',
    },

    circlesContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: '5%',
        paddingBottom: '5%',
    },

    inputView: {
        alignItems: 'center',
    },

    header: {
        color: 'white',
        fontSize: 27,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 10,
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
        marginTop: 17,
        marginBottom: 70,
        backgroundColor: '#7F5AF0',
        // paddingLeft: 102,
        // paddingRight: 102,
        width: 300,
        alignItems: 'center',
        paddingTop: 18,
        paddingBottom: 18,
        borderRadius: 6,
        // boxShadow: "0px 4px 4px 0px #00000040",
        shadowColor: "#00000040",
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    
    readyText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 23,
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
        marginLeft: 13,
        width: 10,
        backgroundColor: "#2CB67D",
        borderRadius: 8,
    },

    error: {
        color: 'red',
        fontFamily: 'Montserrat',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginLeft: 40,
        marginTop: 10,
    },
})

export default Verify;