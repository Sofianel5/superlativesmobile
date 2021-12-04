import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

const PollBar = (props) => {
    const heightAnim = useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.timing(
            heightAnim,
            {
                toValue: 270 * props.percent,
                duration: 1000,
            }
        ).start();
    }, [heightAnim])

    return (
        <Animated.View style={{...props.style, height: heightAnim}}>
            {props.children}
        </Animated.View>
    )
}

const VoteResults = ({userA, userB, results, circle, onTap, navigation}) => {
    console.log("VoteResults:", results)
    const [votesA, votesB] = results.results
    return (
       <TouchableWithoutFeedback onPress={onTap}>
           <View style={styles.container}>
                <Text style={styles.topText} numberOfLines={2}>Here's what the rest of {circle["circle/name"]} thought</Text>
                <View style={styles.pollContainer}>
                    <View style={styles.poll}>
                        <Text style={styles.percentage}>{~~((votesA / (votesA + votesB)).toFixed(2) * 100)}%</Text>
                        <PollBar style={styles.barOne} percent={votesA / (votesA + votesB)}></PollBar>
                        <Text style={styles.name}>{userA["user/first-name"]} {userA["user/last-name"]}</Text>
                        <Image source={{uri: userA["user/profile-pic"]}} style={styles.image} />
                    </View>
                    <View style={styles.poll}>
                        <Text style={styles.percentage}>{~~((votesB / (votesA + votesB)).toFixed(2) * 100)}%</Text>
                        <PollBar style={styles.barTwo} percent={votesB / (votesB + votesA)}></PollBar>
                        <Text style={styles.name}>{userB["user/first-name"]} {userB["user/last-name"]}</Text>
                        <Image source={{uri: userB["user/profile-pic"]}} style={styles.image} />
                    </View>
                </View>
                {/* <Text style={styles.tapText}>Tap Anywhere to Continue</Text> */}
                <Text style={styles.tapText}>{results.questionId}</Text>
            </View>
       </TouchableWithoutFeedback> 
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: -1,
        flex: 1,
        backgroundColor: 'transparent',
    },

    topText: {
        alignSelf: 'center',
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 14,
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },

    pollContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 40,
    },

    poll: {
        height: 270,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    percentage: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },

    barOne: {
        height: 300,
        width: 70,
        backgroundColor: '#2CB67D'
    },

    name: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: 'white',
        marginTop: 5,
        marginBottom: 5,
    },

    image: {
        height: 80,
        width: 80,
        borderRadius: 16,
    },

    barTwo: {
        height: 270,
        width: 70,
        backgroundColor: '#7F5AF0',
    },

    tapText: {
        alignSelf: 'center',
        marginTop: 35,
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 19,
    },
})

export default VoteResults;