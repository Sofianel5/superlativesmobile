import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Platform, Image, TouchableOpacity, ImageBackground } from 'react-native';

const Vote = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.group}>SAE MIT</Text>
            </View>
            <View style={styles.questionBar}>
                <Text style={styles.question}>Best Head</Text>
            </View>
            <TouchableOpacity style={styles.card1}>
                <ImageBackground source={require("../../../../assets/images/liam.jpg")} style={styles.image1} imageStyle={{opacity: 0.7}}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Liam Kronman</Text>
                </View>
                </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.or}>OR</Text>
            <TouchableOpacity style={styles.card2}>
                <ImageBackground source={require("../../../../assets/images/jason.jpeg")} style={styles.image2} imageStyle={{opacity: 0.7}}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Jason Seo</Text>
                </View>
                </ImageBackground>
            </TouchableOpacity>
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
    
    card1: {
        backgroundColor: '#7F5AF0',
        height: '32%',
        width: '92%',
        shadowOffset : {height: 4, width: 4},
        shadowOpacity: 0.8,
        borderRadius: 4,
        marginTop:30,
        flexDirection: 'row',
        padding: 10,
    },
    
    or: {
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 10,
        fontSize: 25,
        color: 'white',
    },

    card2: {
        backgroundColor: '#2CB67D',
        height: '32%',
        width: '92%',
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        borderRadius: 4,
        marginTop: 10,
        flexDirection: 'row',
        padding: 10,
    },

    image1: {
        // height: 180,
        // width: 120,
        // marginTop: 20,
        // marginLeft: 20,
        // shadowOffset : {height: 4},
        // shadowOpacity: 0.8,
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
    },

    image2: {
        // height: 180,
        // width: 120,
        // borderRadius: 6,
        // marginTop: 20,
        // marginRight: 20,
        // shadowOffset : {height: 4},
        // shadowOpacity: 0.8,
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
    },

    nameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // width: 205,
    },

    name: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        marginTop: 140,
    }
})

export default Vote;