import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/';
import { setPasswordAction } from '../authSlice';
import PopinButton from 'react-native-popin-button';
import Icon from 'react-native-vector-icons/Entypo';
import { useWindowDimensions } from 'react-native';

const SetPass = ({navigation}) => {

    const [password, setPassword] = React.useState(null);

    const windowWidth = useWindowDimensions().width;

    const dispatch = useAppDispatch();

    function handleSubmit() {
        dispatch(setPasswordAction(password));
    }

    function passwordValid(text: string) {
        return !!(text && text.length >= 6);
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
            <View style={{width: '100%'}}>
                <TextInput style={styles.input} selectionColor={'white'} placeholderTextColor="#94A1B2" secureTextEntry={true} onChangeText={text => setPassword(text) }/>
                <Text style={Object.assign({marginLeft: (windowWidth-300)/2}, styles.kinky)}>
                Maybe something kinky?
                </Text>
            </View>
            {passwordValid(password) && <PopinButton onPress={() => handleSubmit()}
            style={styles.rollinBtn} shrinkTo={0.7}
            >
                <Text style={styles.signupText}>Get Rollin'</Text>
            </PopinButton>}
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
})

export default SetPass;