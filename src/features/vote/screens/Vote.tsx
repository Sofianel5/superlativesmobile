import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Platform, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import Card from '../../../components/Card';
import Swiper from 'react-native-deck-swiper';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getQuestion, submitVoteAction } from '../voteSlice';
import TitleLoading from '../components/TitleLoading';
import CardLoading from '../components/CardLoading';

const Vote = ({navigation}) => {
    const {circles: {circles, loading}, vote: {selectedCircle, question, userA, userB}} = useAppSelector((state) => state);
    React.useEffect(() => {
        if (circles && !selectedCircle) {
            dispatch(getQuestion());
        }
    });
    const dispatch = useAppDispatch();
    const useSwiper = useRef(null).current
    const handleOnSwipedLeft = () => useSwiper.swipeLeft()
    const handleOnSwipedTop = () => useSwiper.swipeTop()
    const handleOnSwipedRight = () => useSwiper.swipeRight()

    function handleVote(winner: any, loser: any) {
        console.log('handleVote', winner, loser);
        dispatch(submitVoteAction({questionId: question["question/id"], winnerId: winner["user/id"], loserId: loser["user/id"]}));
    }

    return (
        <View style={styles.container}>
            {loading ? <View style={{height: 120, width: '100%'}}>
                <TitleLoading />
            </View> :
            <View style={styles.topBar}>
                <Text style={styles.group}>{selectedCircle ? selectedCircle["circle/name"] : "Loading..."}</Text> }
            </View>}
            <View style={styles.questionBar}>
                <Text style={styles.question}>{question ? question["question/text"] : "Loading..."}</Text>
            </View>
            {/* <View style={{height: '32%', width: '92%'}}>
                <Swiper ref={useSwiper}
                    // animateCardOpacity
                    // onSwipedLeft={() => useSwiper.swipeLeft()}
                    cards={[{name: "Liam Kronman", 
                            cardNum:"1", 
                            image:require('../../../../assets/images/liam.jpg')}, 
                            {name: "Liam Kronman", 
                            cardNum:"1", 
                            image:require('../../../../assets/images/jason.jpeg')}]} 
                            renderCard={card => <Card name={card.name} cardNum={card.cardNum} image={card.image}/> }
                    // stackSize={2}
                    // infinite
                    // animateOverlayLabelsOpacity
                    swipeBackCard
                    />
            </View> */}
            {loading ? <View style={{justifyContent: 'center', height: 600, width: 300, marginTop: 30,}}>
                <CardLoading />
                <CardLoading />
            </View> : {!!userA && <Card name={userA["user/first-name"].concat(" ", userA["user/last-name"])} cardNum="1" image={{uri: userA["user/profile-pic"]}} onPress={() => handleVote(userA, userB)} />}
            <Text style={styles.or}>OR</Text>
            {!!userB && <Card name={userB["user/first-name"].concat(" ", userB["user/last-name"])} cardNum="2" image={{uri: userB["user/profile-pic"]}} onPress={() => handleVote(userB, userA)} />}}
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