import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Picker from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Entypo';


const NewCircle = ({navigation}) => {
    const data = [{
        value: 'Love',
    }, {
        value: 'Drugs',
    }, {
        value: 'General',
    }]
    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
            <View style={styles.topBar}>
                <Text style={styles.groupTitle}>
                    New Circle
                </Text>
            </View>
            <View style={{paddingLeft: 20,}}>
                <Text style={styles.question}>Circle Name</Text>
                <TextInput style={styles.input} selectionColor={'white'} placeholder="Frat Brothers" placeholderTextColor="#72757E" />
                <Text style={styles.question}>Questions</Text>
                {/* <Picker label='' data={data}>
                </Picker> */}
            </View>
            <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createText}>Create Circle</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242629',
    },

    back: {
        position: 'absolute',
        top: 60,
        left: 10,
        zIndex: 300,
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

    question: {
        color: "white",
        marginTop: 23,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 23,
    },

    groupTitle: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 8,
    },

    members: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 20,
    },

    input: {
        height: 50,
        width: 338,
        fontFamily: 'Montserrat',
        fontSize: 23,
        padding: 10,
        backgroundColor: "#16161A",
        borderRadius: 10,
        color: 'white',
        marginTop: 10,
        shadowColor: "#00000040",
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },

    view: {
        width: 250,
        backgroundColor: '#2CB67D',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        height: 40,
        borderRadius: 8,
    },

    viewText: {
        fontFamily: 'Montserrat',
        color: 'white',
        fontSize: 18,
    },

    createButton: {
        backgroundColor: "#7F5AF0",
        height: 50,
        width: 140,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        alignSelf: 'center',
        marginTop: 20,
    },

    createText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
    }
})

export default NewCircle;