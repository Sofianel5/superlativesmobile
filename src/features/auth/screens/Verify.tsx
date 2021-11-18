import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Platform } from 'react-native';
import { AsYouType } from 'libphonenumber-js';
import PopinButton from 'react-native-popin-button';

const Verify = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <Text style={styles.header}>
                    Verify
                </Text>
                <TextInput style={styles.input} selectionColor={'white'} placeholder="42069" placeholderTextColor="#94A1B2" textAlign={'center'} keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"} />
            </View>
            <PopinButton onPress={() => console.log('hi')}
            style={styles.readyBtn} shrinkTo={0.7}
            >
                <Text style={styles.readyText}>
                    I'm Real
                </Text>
            </PopinButton>
            <View style={styles.circles}>
                <View style={styles.unmarkedCircle1}></View>
                <View style={styles.markedCircle} />
                <View style={styles.unmarkedCircle}></View>
                <View style={styles.unmarkedCircle}></View>
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

    inputView: {
        marginBottom: 17,
        alignItems: 'center',
    },

    header: {
        color: 'white',
        fontSize: 27,
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
        marginBottom: 70,
        backgroundColor: '#7F5AF0',
        paddingLeft: 102,
        paddingRight: 102,
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

export default Verify;