import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useAppDispatch } from '../../../app/hooks';
import { removeSuperlativeAction } from '../circlesSlice';
import SuperlativeIcon from './SuperlativeIcon';
import { superlativeDeleted } from '../../../services/Analytics';

const ManageSuperlatives = ({route, navigation}) => {
    const circle = route.params.circle;

    const dispatch = useAppDispatch();
    const [removed, setRemoved] = React.useState([]);

    function handlePress(questionId) {
        setRemoved([...removed, questionId]);
        dispatch(removeSuperlativeAction({circleId: circle["circle/id"], questionId}));
        superlativeDeleted(circle["circle/id"], questionId);
    }

    function renderRemoveButton(questionId: string) {
        if (!removed.includes(questionId)) {
            return (
                <TouchableOpacity style={styles.removeButton} onPress={() => handlePress(questionId)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.removeButtonDisabled}>
                    <Text style={styles.removeButtonText}>Removed</Text>
                </TouchableOpacity>
            );
        }
    }


    function renderSuperlativesRow(question: any) {
        return (
            <View style={styles.nonWinnerRow}>
                <Text style={styles.superlativesText}>{question["question/text"]}</Text>
                {renderRemoveButton(question["question/id"])}
            </View>
        );
    }

    function renderSuperlatives() {
        return (
            [...Object.values(circle["circle/questions"])].map(renderSuperlativesRow)
        );
    }

    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
            <View style={styles.topBar}>
                <Text style={styles.superlativeTitle} ellipsizeMode='tail' numberOfLines={1}>
                 Manage Superlatives
                </Text>
            </View>
            <ScrollView>
                <View style={styles.nonWinnerContainer}>
                    {renderSuperlatives()}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242629',
    },

    errorText: {
        color: 'white',
        fontSize: 20,
        fontFamily: "Montserrat-SemiBold",
        textAlign: 'center',
        alignSelf: 'center',
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

    superlativeTitle: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 19,
        alignSelf: 'center',
        marginTop: 13,
        maxWidth: '80%',
        maxHeight: 22
        
    },

    voteCountContainer: {
        alignItems: 'flex-end',
        padding: 12,
    },

    voteCount: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 16.5,
    },

    firstPlaceContainer: {
        alignItems: 'center',
    },

    winnerTitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 18,
        marginBottom: 5,
    },

    superlativeIcon: {
        shadowOffset: {height: 4},
        shadowOpacity: 0.8,
    },

    winnerImage: {
        width: 90,
        position: 'absolute',
        height: 125,
        top: 36.5,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },

    winnerName: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 16,
        marginTop: 5,
    },

    removeButton: {
        width: 75,
        height: 33,
        borderRadius: 8,
        backgroundColor: '#7F5AF0',
        alignItems: 'center',
    },

    removeButtonDisabled: {
        width: 75,
        height: 33,
        borderRadius: 8,
        backgroundColor: 'grey',
        alignItems: 'center',
    },

    removeButtonText: {
        color: 'white',
        lineHeight: 30,
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBold',
    },

    winnerScore: {
        alignSelf: 'flex-end',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        color: 'white',
        position: 'absolute',
        right: 15,
        top: 88,
    },

    nonWinnerContainer: {
        padding: 15,
    },

    nonWinnerTitle: {
        color: '#2CB67D',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        marginTop: 12,
    },

    nonWinnerRow: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    nonWinnerImage: {
        height: 50,
        width: 50,
        borderRadius: 12,
    },

    superlativesText: {
        marginLeft: 8,
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: 'white',
        width: 250,
    },

    nonWinnerScore: {
        position: 'absolute',
        right: 0,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: 'white',
    },

    selfName: {
        marginLeft: 8,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: '#7F5AF0',
    },

    selfScore: {
        position: 'absolute',
        right: 0,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: '#7F5AF0',
    },
})

export default ManageSuperlatives;