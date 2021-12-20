import React, { Component, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import SuperlativeIcon from '../../../components/SuperlativeIcon';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getQuestionPacksAction } from '../circlesSlice';
import { addSuperlativesAction } from '../circlesSlice';
import QuestionPackPicker from '../../../components/QuestionPackPicker';
import CheckBox from '@react-native-community/checkbox';
import PopinButton from 'react-native-popin-button';
import Snackbar from 'react-native-snackbar';

const AddQuestionPackSuperlativesScreen = ({route, navigation}) => {
    const questionPacks = useAppSelector((state) => state.circles.questionPacks);
    const dispatch = useAppDispatch();
    
    const [value, setValue] = useState(null);
    const [checked, setChecked] = useState([]);
    function handleSubmit() {
        if (checked.length > 0) {
            Snackbar.show({
                text: 'Superlative added!',
                duration: Snackbar.LENGTH_SHORT,
            });
            dispatch(addSuperlativesAction({circleId: route.params.circleId, superlatives: checked}));
            console.log("Checked:", checked)
            setChecked([]);
            navigation.pop();
            navigation.pop();
            navigation.navigate('Vote');
        }
    }
    console.log(checked);
    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={40} style={styles.back} color="white" onPress={() => navigation.pop()}/> 
            <View style={styles.topBar}>
                <Text style={styles.groupTitle}>
                    Select Superlatives
                </Text>
            </View>
            <View style={{paddingLeft: 20, paddingRight: 20,}}>
                <QuestionPackPicker questionPacks={questionPacks} onChange={(i)=> {setValue(i); setChecked([])}}></QuestionPackPicker>
            </View>
            <ScrollView style={styles.questionScroll}>
            {(questionPacks && (value != null)) && 
                questionPacks[value]["questions"].map((question) => 
                <View style={styles.superlativeContainer}>
                    <CheckBox 
                        boxType="square" 
                        onCheckColor="#7F5AF0" 
                        onFillColor="#7F5AF0" 
                        onTintColor="rgba(0,0,0,0)" 
                        animationDuration={0}
                        style={{backgroundColor: "#16161A", borderColor: "#16161A"}}
                        value={checked.includes(question)}
                        onValueChange={(added) => {
                            try {
                                added ? setChecked(checked.concat([question])) : setChecked(checked.filter(c => c !== question))
                            } catch {
                                console.log("error:", added, checked);
                            }
                        }}></CheckBox>
                    <Text style={styles.superlativeText}>{question}</Text>
                </View>
            )}
            </ScrollView>
            {(checked.length > 0) && 
            <View style={styles.buttonContainer}>
                <PopinButton onPress={() => handleSubmit()}
                style={styles.addBtn} shrinkTo={0.7}
                >
                    <Text style={styles.addText}>
                        Add
                    </Text>
                </PopinButton>
            </View>}
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

    groupTitle: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 8,
    },

    superlativeContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 5,
        width: 300,
    },

    superlativeText: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 15,
        marginLeft: 10,
        lineHeight: 30,
    },

    questionScroll: {
        // paddingVertical: 20,
        zIndex: -1,
        paddingBottom: 30,
    },

    buttonContainer : {
        marginHorizontal: 50,
    },

    addBtn: {
        marginTop: 25,
        backgroundColor: '#7F5AF0',
        paddingLeft: 50,
        paddingRight: 50,
        paddingVertical: 15,
        borderRadius: 6,
        alignItems: 'center',
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 40,
    },
    
    addText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 23,
    },

})

export default AddQuestionPackSuperlativesScreen;