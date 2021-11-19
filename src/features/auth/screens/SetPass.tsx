import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import PopinButton from 'react-native-popin-button';

const SetPass = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
            One last thing.
            </Text>
            <Text style={styles.prompt}>
            Set Password
            </Text>
            <View>
            <TextInput style={styles.input} selectionColor={'white'} placeholderTextColor="#94A1B2" secureTextEntry={true}/>
            <Text style={styles.kinky}>
            Maybe something kinky?
            </Text>
            </View>
            <PopinButton onPress={() => console.log("done")}
            style={styles.rollinBtn} shrinkTo={0.7}
            >
                <Text style={styles.signupText}>Get Rollin'</Text>
            </PopinButton>
            <View style={styles.circles}>
                <View style={styles.unmarkedCircle1}></View>
                <View style={styles.unmarkedCircle} />
                <View style={styles.unmarkedCircle}></View>
                <View style={styles.markedCircle}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#16161A',
    },

    header: {
        fontFamily: 'Montserrat',
        color: 'white',
        fontSize: 30,
        marginBottom: 40,
    },

    prompt: {
        fontFamily: 'Montserrat',
        color: 'white',
        fontSize: 28,
        marginBottom: 20,
    },

    input: {
        height: 60,
        width: 300,
        fontFamily: 'Montserrat',
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
        marginBottom: 5,
    },

    kinky: {
        color: '#94A1B2',
        fontFamily: 'Montserrat',
        fontSize: 14,
        marginBottom: 200,
    },

    rollinBtn: {
        backgroundColor: '#C95AF0',
        paddingLeft: 80,
        paddingRight: 80,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 6,
        shadowOffset : { height: 4, width: 0},
        shadowOpacity: 0.8,
    },

    signupText: {
        fontFamily: 'Montserrat',
        color: 'white',
        fontSize: 23,
    },

    circles: {
        marginTop: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },

    unmarkedCircle: {
        marginLeft: 13,
        height: 16,
        width: 16,
        backgroundColor: "#C4C4C4",
        borderRadius: 8,
    },

    unmarkedCircle1: {
        height: 16,
        width: 16,
        backgroundColor: "#C4C4C4",
        borderRadius: 8,
    },

    markedCircle: {
        marginLeft: 13,
        height: 16,
        width: 16,
        backgroundColor: "#2CB67D",
        borderRadius: 8,
    },
})

export default SetPass;