import React, { Component, useCallback, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import SuperlativeIcon from '../../../components/SuperlativeIcon';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getContactsAction, inviteUserAction } from '../circlesSlice';
import SuperlativeCard from '../components/SuperlativeCard';
import ContactRow from '../../../components/ContactRow';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import { invitePageOpened, inviteSent } from '../../../services/Analytics';
import { selectContactPhone } from 'react-native-select-contact';
import Snackbar from 'react-native-snackbar';


const InviteScreen = ({route, navigation}) => {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        invitePageOpened()
        //dispatch(getContactsAction());
    }, []);

    const renderItem = useCallback(({item}, sent) => <ContactRow contact={item} onPress={submitInvite} />, [])

    const getItemLayout = useCallback((data, index) => {return {length: 60, offset: 60 * index, index}}, [])

    const keyExtractor = useCallback((item) => item.recordID, [])

    //const allContacts = useAppSelector((state) => state.circles.contacts);

    const invites = useAppSelector((state) => state.circles.invitedContacts);

    //const [contacts, setContacts] = useState(allContacts);

    // function filterContacts(text) {
    //     const newContacts = allContacts.filter((contact) => {
    //         return contact.givenName.toLowerCase().includes(text.toLowerCase()) || contact.familyName.toLowerCase().includes(text.toLowerCase());
    //     })
    //     setContacts(newContacts);
    // }

    function submitInvite(phone) {
        console.log("inviting phone:", phone)
        dispatch(inviteUserAction({circleId: route.params.circleId, phone: parsePhoneNumberFromString(phone, 'US')?.format("E.164")}));
        console.log("parsed phone:", parsePhoneNumberFromString(phone, 'US')?.format("E.164"))
        inviteSent(phone, true)
        console.log("sent invite");
    }

    function handleContactSelection() {
        return selectContactPhone()
        .then(selection => {
            if (!selection) {
                return;
            }
            let { contact, selectedPhone } = selection;
            console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
            submitInvite(selectedPhone.number);
            Snackbar.show({
                text: 'Invited!',
                duration: Snackbar.LENGTH_SHORT,
            })
        });  
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
                <View style={styles.topBar}>
                    <Text style={styles.groupTitle}>
                        Invite members
                    </Text>
                </View>
                <View style={{paddingLeft: 20, paddingRight: 20,}}>
                    <TouchableOpacity style={styles.addSuperlativeContainer} onPress={() => navigation.navigate('InvitePhone', {circleId: route.params.circleId})}>
                        <Text style={styles.superlativeText}>Invite phone</Text>
                        <Icon name="chevron-right" size={30} style={styles.superlativeRight} color="white" /> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addSuperlativeContainer} onPress={handleContactSelection}>
                        <Text style={styles.superlativeText}>Invite contact phone</Text>
                        <Icon name="chevron-right" size={30} style={styles.superlativeRight} color="white" /> 
                    </TouchableOpacity>
                    {/* <TextInput onChangeText={filterContacts} style={styles.addSuperlativeContainer} selectionColor={'white'} placeholder="Search contacts" placeholderTextColor="#94A1B2" /> */}
                    {/* {!!contacts ? <FlatList style={{marginTop: 20}} data={contacts} keyExtractor={keyExtractor} renderItem={(item) => renderItem(item, invites.includes(item.item.recordID))} getItemLayout={getItemLayout}/> : <View></View>} */}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

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

    addSuperlativeContainer: {
        flexDirection: 'row',
        backgroundColor: '#16161A',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        height: 50,
        paddingRight: 15,
        borderRadius: 8,
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        justifyContent: 'space-between',
        marginBottom: 7.5,
        marginTop: 15,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
    },

    superlativeText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
    },

    superlativeRight: {
        alignSelf: 'flex-end',
    },

    membersTitle: {
        color: "white",
        marginTop: 23,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 21,
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
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 20,
    },

    memberCard: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    profilePic: {
        height: 50,
        width: 50,
        borderRadius: 13,
        marginRight: 10,
    },

    member: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
    },

    seeAll: {
        marginTop: 10,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 19,
    },

    superlativeCard: {
        flexDirection: 'row',
        backgroundColor: '#16161A',
        padding: 20,
        marginTop: 15,
        borderRadius: 12,
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        height: 160,
    },

    superlativeBadge: {
        width: 82.5,
        height: 72,
    },

    superlativeTitle: {
        fontFamily: "Montserrat-SemiBold",
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
    },

    superlativeWinner: {
        alignItems: 'center',
    },

    superlativeWinnerPic: {
        height: 60,
        width: 45,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'relative',
        bottom: 66,
    },

    superlativeWinnerName: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 16,
        color: 'white',
        position: 'relative',
        bottom: 57,
    },

    closeComers: {
        paddingLeft: 50,
    },

    closeComer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },

    closeComerPic: {
        height: 29,
        width: 29,
        borderRadius: 8,
        marginRight: 10,
    },

    closeComerText: {
        fontFamily: "Montserrat-SemiBold",
        color: "white",
        fontSize: 18,
    },

    closeComerName: {
        fontFamily: "Montserrat-SemiBold",
        color: 'white',
        fontSize: 16,
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
        fontFamily: 'Montserrat-SemiBold',
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
    },

    leaderboardsTitle: {
        marginTop: 15,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 23,
        alignSelf: 'center',
    },

    inviteBtn: {
        backgroundColor: '#7F5AF0',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        height: 50,
        width: 120,
        borderRadius: 16,
    },

    inviteText: {
        color: 'white',
        fontSize: 22,
        fontFamily: "Montserrat-SemiBold",
    },
})

export default InviteScreen;