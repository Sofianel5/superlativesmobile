import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ContactRow = ({contact, onPress}) => {
    return (<View style={styles.contactContainer}>
        <View style={styles.contactElementsRow}>
            <View style={styles.contactLeft}>
                <View style={styles.contactIcon}></View>
                <Text style={styles.contactName}>{contact.givenName}</Text>
            </View>
            <View style={styles.contactButtonContainer}>
                <TouchableOpacity style={styles.contactInviteButtonUnselected}>
                    <Text style={styles.contactInviteButtonUnselectedText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>);
};

const styles = StyleSheet.create({

    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 0,
    },

    contactElementsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    contactLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    contactIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#C4C4C4',
        marginRight: 10,
    },

    contactName: {
        fontSize: 20,
        color: 'white',
        lineHeight: 40,
        fontFamily: 'Montserrat-SemiBold'
    },

    contactButtonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },

    contactInviteButtonUnselected: {
        width: 75,
        height: 33,
        borderRadius: 8,
        backgroundColor: '#7F5AF0',
        alignItems: 'center',
    },

    contactInviteButtonUnselectedText: {
        color: 'white',
        lineHeight: 30,
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBold',
    },
});

export default ContactRow;