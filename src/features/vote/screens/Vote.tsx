import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Platform, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Card from '../../../components/Card';

const Vote = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.group}>SAE MIT</Text>
            </View>
            <View style={styles.questionBar}>
                <Text style={styles.question}>Best Head</Text>
            </View>
            <Card name="Liam Kronman" cardNum="1" image='require("../../assets/images/liam.jpg")' />
            <Text style={styles.or}>OR</Text>
            <Card name="Liam Kronman" cardNum="2" image='require("../../assets/images/liam.jpg")' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#242629',
        height: '100%',
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

    group: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
    },

    questionBar: {
        height: 50,
        alignSelf: 'stretch',
        backgroundColor: '#C4C4C4',
        alignItems: 'center',
        justifyContent: 'center',
    },

    question: {
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 25,
    },
    
    or: {
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 10,
        fontSize: 25,
        color: 'white',
    },
})

export default Vote;