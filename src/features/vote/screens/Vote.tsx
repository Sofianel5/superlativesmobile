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

    function renderBody() {
        if (loading) {
            return (<View style={{justifyContent: 'center', height: 600, width: 300, marginTop: 30,}}>
                        <CardLoading />
                        <CardLoading />
                    </View> )
        } else if ( userA && userB ) {
            return (<>
                        <Card name={userA["user/first-name"].concat(" ", userA["user/last-name"])} cardNum="1" image={{uri: userA["user/profile-pic"]}} onPress={() => handleVote(userA, userB)} />
                        <Text style={styles.or}>OR</Text>
                        <Card name={userB["user/first-name"].concat(" ", userB["user/last-name"])} cardNum="2" image={{uri: userB["user/profile-pic"]}} onPress={() => handleVote(userB, userA)} />
                    </>);
        } else {
            return (<View style={{justifyContent: 'center', height: 600, width: 300, marginTop: 30,}}>
                        <Text>Error</Text>
                    </View>);
        }
    }

    function renderTitle() {
        if (loading) {
            return (<View style={{height: 120, width: '100%'}}>
                        <TitleLoading />
                    </View> )
        } else {
            return (<View style={styles.topBar}>
                        <Text style={styles.group}>{selectedCircle ? selectedCircle["circle/name"] : "Loading..."}</Text>
                    </View>)
        }
    }
    
    function renderQuestion() {
        if (question) {
            return (<View style={styles.questionBar}>
                <Text style={styles.question}>{question["question/text"]}</Text>
            </View>)
        } else {
            return (<View style={styles.questionBar}>
                        <Text style={styles.question}>Loading...</Text>
                    </View>)
        }
    }

    return (
        <View style={styles.container}>
            {renderTitle()}
            {renderQuestion()}
            {renderBody()}
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