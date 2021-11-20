import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import SuperlativesLogo from '../../../../assets/icons/SuperlativesLogo.js';

const Splash = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.superlativesLogo}>
                <SuperlativesLogo width={78} height={60} />
            </View>
            <Text style={styles.superlatives}>
            Superlatives
            </Text>
            <Text style={styles.subHeader}>
                What are you known for?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Name')}
            style={styles.signupBtn}
            >
                <Text style={styles.signupText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.login}>
                <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>
                an OuttaControl Production
            </Text>
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

    superlativesLogo: {
        width: 78,
        height: 60,
        marginBottom: 25,
    },

    superlatives: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 42,
        marginBottom: 5,
    },

    subHeader: {
        color: '#94A1B2',
        fontFamily: 'Montserrat',
        fontSize: 19,
        marginBottom: 100,
    },

    signupBtn: {
        backgroundColor: '#7F5AF0',
        paddingLeft: 80,
        paddingRight: 80,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 6,
        shadowOffset : {height: 4, width: 0},
        shadowOpacity: 0.8,
        marginBottom: 10,
    },

    signupText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 23,
    },

    loginText: {
        color: 'white',
        fontSize: 23,
        fontFamily: 'Montserrat-SemiBold',
    },

    footer: {
        position: 'absolute',
        bottom: 55,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
    },
})

export default Splash;