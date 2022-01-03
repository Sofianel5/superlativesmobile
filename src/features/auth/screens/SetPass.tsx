import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/';
import { setPasswordAction } from '../authSlice';
import PopinButton from 'react-native-popin-button';
import Icon from 'react-native-vector-icons/Entypo';
import { useWindowDimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Communications from 'react-native-communications';

const SetPass = ({navigation}) => {

    const [password, setPassword] = React.useState(null);

    const windowWidth = useWindowDimensions().width;

    const dispatch = useAppDispatch();

    const {auth: {status, globalErrorMessage}} = useAppSelector((state) => state);

    const [tos, setTos] = React.useState(false);

    function handleSubmit() {
        dispatch(setPasswordAction(password));
    }

    function passwordValid(text: string) {
        return !!(text && text.length >= 6) && tos;
    }

    const renderButton = () => {
        if (status === 'loading') {
            return <PopinButton onPress={() => handleSubmit()}
            style={styles.rollinBtn} shrinkTo={0.7}
            >
                 <ActivityIndicator size="large" color="white" />
            </PopinButton> 
        } else {
            return <PopinButton onPress={() => handleSubmit()}
            style={styles.rollinBtn} shrinkTo={0.7}
            >
                <Text style={styles.signupText}>Get Rollin'</Text>
            </PopinButton>
        }
    }

    const renderError = (err) => {
        if (err) {
            <Text style={styles.error}>{err}</Text>
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
                        <View style={styles.unmarkedCircle}></View>
                        <View style={styles.unmarkedCircle}></View>
                        <View style={styles.markedCircle} />
                    </View>
                </View>
            </View>
            <Text style={styles.header}>
            One last thing.
            </Text>
            <Text style={styles.prompt}>
            Set Password
            </Text>
            {renderError(globalErrorMessage)}
            <View style={{width: '100%'}}>
                <TextInput style={styles.input} selectionColor={'white'} placeholderTextColor="#94A1B2" secureTextEntry={true} onChangeText={text => setPassword(text) }/>
                <Text style={Object.assign({marginLeft: (windowWidth-300)/2}, styles.kinky)}>
                Maybe something kinky?
                </Text>
            </View>
            <View style={styles.checkRow}>
                <CheckBox 
                    boxType="square" 
                    onCheckColor="#7F5AF0" 
                    onFillColor="#7F5AF0" 
                    onTintColor="rgba(0,0,0,0)" 
                    animationDuration={0}
                    style={{backgroundColor: "#16161A", borderColor: "#16161A"}}
                    value={tos}
                    onValueChange={(added) => {
                        setTos(added);
                    }}></CheckBox>
                <Text style={styles.annoyingText}>
                    I agree to <Text style={styles.linkText} onPress={() => Communications.web("https://superlatives-files.s3.amazonaws.com/tos.html")}>ToS </Text>
                    & <Text style={styles.linkText} onPress={() => Communications.web("https://superlatives-files.s3.amazonaws.com/privacy.html")}>privacy policy</Text></Text>
            </View>
            {passwordValid(password) && renderButton()}
        </View>
    )
}

const styles = StyleSheet.create({

    flexTop: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingBottom: '2%',
    },

    checkRow: {
        flexDirection: 'row',
        marginLeft: 30,
        marginBottom: 20
    },

    annoyingText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        lineHeight: 30
    },

    linkText: {
        color: '#7F5AF0',
        textDecorationLine: 'underline',
    },

    container: {
        flex: 1,
        paddingTop: '15%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#16161A',
    },

    header: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 30,
        marginBottom: 40,
        alignSelf: 'center'
    },

    prompt: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 28,
        marginBottom: 20,
        alignSelf: 'center'
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
        shadowColor: "#ffffff",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        marginBottom: 5,
        alignSelf: 'center'
    },

    kinky: {
        color: '#94A1B2',
        fontFamily: 'Montserrat',
        fontSize: 14,
        marginBottom: 20,
    },

    rollinBtn: {
        backgroundColor: '#C95AF0',
        paddingVertical: 20,
        width: 300,
        borderRadius: 6,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
        alignSelf: 'center',
        textAlign: 'center',
    },

    signupText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
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
        marginLeft: 13,
        height: 10,
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
        marginBottom: 10,
    },
})

export default SetPass;