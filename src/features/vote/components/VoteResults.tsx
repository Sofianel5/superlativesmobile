import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Text, Image } from 'react-native';

const PollBar = (props) => {
    const heightAnim = useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.timing(
            heightAnim,
            {
                toValue: 350 * props.percent,
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

const VoteResults = ({userA, userB, results, navigation}) => {
    console.log("VoteResults:", results)
    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Here's what the rest of SAE thought</Text>
            <View style={styles.pollContainer}>
                <View style={styles.poll}>
                    <Text style={styles.percentage}>{results[0] / (results[0] + results[1])}</Text>
                    <PollBar style={styles.barOne} percent={0.74}></PollBar>
                    <Text style={styles.name}>Liam Kronman</Text>
                    <Image source={require('../../../../assets/images/liam.jpg')} style={styles.image} />
                </View>
                <View style={styles.poll}>
                    <Text style={styles.percentage}>26%</Text>
                    <PollBar style={styles.barTwo} percent={0.26}></PollBar>
                    <Text style={styles.name}>Jason Seo</Text>
                    <Image source={require('../../../../assets/images/jason.jpeg')} style={styles.image} />
                </View>
            </View>
            <Text style={styles.tapText}>Tap Anywhere to Continue</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    topText: {
        alignSelf: 'center',
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 14,
        color: 'white',
        fontSize: 18,
    },

    pollContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    poll: {
        height: 350,
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
        height: 350,
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
        height: 350,
        width: 70,
        backgroundColor: '#7F5AF0',
    },

    tapText: {
        alignSelf: 'center',
        marginTop: 25,
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 19,
    },
})

export default VoteResults;