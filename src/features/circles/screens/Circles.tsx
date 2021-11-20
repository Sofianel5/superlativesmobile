import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Circles = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Your Circles
            </Text>
            <ScrollView style={{paddingRight: 20}}>
            <View style={styles.group}>
                <Text style={styles.groupTitle}>
                    SAE MIT
                </Text>
                <Text style={styles.members}>
                    45 members
                </Text>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.view} onPress={() => navigation.navigate('GChild')}>
                        <Text style={styles.viewText}>
                            View
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>
                    SAE MIT
                </Text>
                <Text style={styles.members}>
                    45 members
                </Text>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.view} onPress={() => navigation.navigate('GChild')}>
                        <Text style={styles.viewText}>
                            View
                        </Text>
                    </TouchableOpacity>
                </View>
            </View><View style={styles.group}>
                <Text style={styles.groupTitle}>
                    SAE MIT
                </Text>
                <Text style={styles.members}>
                    45 members
                </Text>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.view} onPress={() => navigation.navigate('GChild')}>
                        <Text style={styles.viewText}>
                            View
                        </Text>
                    </TouchableOpacity>
                </View>
            </View><View style={styles.group}>
                <Text style={styles.groupTitle}>
                    SAE MIT
                </Text>
                <Text style={styles.members}>
                    45 members
                </Text>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.view} onPress={() => navigation.navigate('GChild')}>
                        <Text style={styles.viewText}>
                            View
                        </Text>
                    </TouchableOpacity>
                </View>
            </View><View style={styles.group}>
                <Text style={styles.groupTitle}>
                    SAE MIT
                </Text>
                <Text style={styles.members}>
                    45 members
                </Text>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.view} onPress={() => navigation.navigate('GChild')}>
                        <Text style={styles.viewText}>
                            View
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
            <TouchableOpacity style={styles.newGroup} onPress={() => navigation.navigate('NewGroup')}>
                <Icon name="plus" size={35} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242629',
        paddingLeft: 20,
        paddingTop: 30,
    },
    
    title: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 30,
        marginTop: 40,
        marginBottom: 15,
    },

    group: {
        marginTop: 30,
        backgroundColor: '#16161A',
        width: '100%',
        height: 200,
        borderRadius: 8,
        shadowOffset : {height: 4, width: 4},
        shadowOpacity: 0.8,
    },

    groupTitle: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
    },

    members: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 20,
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

    newGroup: {
        backgroundColor: "#7F5AF0",
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset : {height: 4, width: 4},
        shadowOpacity: 0.8,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 40,
    },

    plus: {
        fontFamily: 'Montserrat',
        fontSize: 40,
        color: 'white',
    }
})

export default Circles;