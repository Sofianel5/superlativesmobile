import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import PopinButton from 'react-native-popin-button';
import SuperlativesLogo from '../../../../assets/icons/SuperlativesLogo.js';

const Splash = ({navigation}) => {
    return (
        <View style={styles.container}>
            <SuperlativesLogo />
            <Text style={styles.superlatives}>
            Superlatives
            </Text>
            <PopinButton onPress={() => navigation.navigate('Name')}
            style={styles.signupBtn} shrinkTo={0.7}
            >
                <Text style={styles.signupText}>Sign up</Text>
            </PopinButton>
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

    superlatives: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 42,
        marginBottom: 40,
    },

    signupBtn: {
        backgroundColor: '#7F5AF0',
        paddingLeft: 80,
        paddingRight: 80,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 6,
        shadowOffset : {height: 4, width: 0},
        shadowOpacity: 0.8,
    },

    signupText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 23,
    }
})

export default Splash;