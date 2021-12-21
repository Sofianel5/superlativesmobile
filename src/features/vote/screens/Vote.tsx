import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Platform, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import Card from '../../../components/Card';
import Swiper from 'react-native-deck-swiper';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getQuestion, submitVoteAction, getVotesAction, selectCircleAction } from '../voteSlice';
import TitleLoading from '../components/TitleLoading';
import CardLoading from '../components/CardLoading';
import VoteResults from '../components/VoteResults';
import CirclePicker from '../components/CirclePicker';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { getResults } from '../voteAPI';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
}

const Vote = ({navigation}) => {
    const {auth: {user}, circles: {circles, loading}, vote: {selectedCircle, question, userA, userB, votes}} = useAppSelector((state) => state);
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState(null)
    //const [nextResults, setNextResults] = useState(null)
    React.useEffect(() => {
        if (circles && (votes != null) && !selectedCircle) {
            dispatch(getQuestion());
        }
        if (votes == null) {
            dispatch(getVotesAction());
        }
        // if (question && userA && userB && !results) {
        //     console.log("getting results when none exist")
        //     getResults(user['id'], user['auth-token'], question["question/id"], userA["user/id"], userB["user/id"]).then(res => {
        //         const results = res.data.data;
        //         console.log("got first results:", results);
        //         setResults({questionId: question["question/id"], results});
        //     });
        // } if (results && nextResults == null) {
        //     console.log("getting new results")
        //     getResults(user['id'], user['auth-token'], question["question/id"], userA["user/id"], userB["user/id"]).then(res => {
        //         const results = res.data.data;
        //         console.log(question)
        //         console.log("got new results:", results);
        //         setNextResults({questionId: question["question/id"], results});
        //     });
        // }
    }); 

    React.useEffect(() => {
        if (question) {
            getResults(user['id'], user['auth-token'], question["question/id"], userA["user/id"], userB["user/id"]).then(res => {
                const results = res.data.data;
                console.log(question)
                console.log("got new results:", results);
                setResults({questionId: question["question/id"], results});
            });
        }
    }, [question])
    
    const dispatch = useAppDispatch();
    const useSwiper = useRef(null).current
    const handleOnSwipedLeft = () => useSwiper.swipeLeft()
    const handleOnSwipedTop = () => useSwiper.swipeTop()
    const handleOnSwipedRight = () => useSwiper.swipeRight()

    function handleVote(winner: any, loser: any) {
        console.log('handleVote', winner, loser);
        ReactNativeHapticFeedback.trigger("impactHeavy", options);
        console.log("localResults:", results)
        dispatch(submitVoteAction({questionId: question["question/id"], winnerId: winner["user/id"], loserId: loser["user/id"]}));
        if (winner["user/id"] == userA["user/id"]) {
            results.results[0]++;
        } else {
            results.results[1]++;
        }
        setResults(results);
        setShowResults(true);
        // if (results && results.results[0] + results.results[1] != 0) {
        //     console.log("showing results")
        //     setShowResults(true);
        // } else {
        //     console.log("not showing results")
        //     dispatch(getQuestion())
        // }
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
                        {/* <VoteResults /> */}
                    </>);
        } else {
            return (<View style={{justifyContent: 'center',  height: 600, width: 300, marginTop: 30,}}>
                        <Text style={{alignSelf: 'center', textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'Montserrat-SemiBold'}}>Add more questions or members!</Text>
                    </View>);
        }
    }

    function selectNewCircle(circle: string) {
        dispatch(selectCircleAction(circle));
    }

    function renderTitle() {
        if (loading) {
            return (<View style={{height: 120, width: '100%'}}>
                        <TitleLoading />
                    </View> )
        } else {
            return (<View style={styles.topBar}>
                        {/* <Text style={styles.group}>{selectedCircle ? selectedCircle["circle/name"] : Object.values(circles)[0]["circle/name"]}</Text> */}
                        <CirclePicker circles={circles} selectedCircle={selectedCircle} onChange={(i) => selectNewCircle(Object.values(circles)[i]["circle/id"])} />
                    </View>)
        }
    }
    
    function renderQuestion() {
        if (question) {
            return (<View style={styles.questionBar}>
                {(question["question/text"].length > 22) ? <Text style={styles.questionSmall}>{question["question/text"]}</Text> : <Text style={styles.questionLarge}>{question["question/text"]}</Text>}
            </View>)
        } else if (loading) {
            return (<View style={styles.questionBar}>
                        <Text style={styles.question}>Loading...</Text>
                    </View>)
        } else {
            return (<View style={styles.questionBar}>
                        <Text style={styles.question}>No more questions</Text>
                    </View>)
        }
    }

    function onResultsPress() {
        dispatch(getQuestion());
        setShowResults(false);
        // if (nextResults) {
        //     console.log("resetting results to next")
        //     setResults(nextResults);
        //     setNextResults(null)
        // }
    }

    if (showResults && results && results.results[0] + results.results[1] != 0) {
        return (
            <View style={styles.container}>
                {renderTitle()}
                {renderQuestion()}
                <VoteResults onTap={onResultsPress} circle={selectedCircle} userA={userA} userB={userB} results={results} navigation={navigation}></VoteResults>
            </View>
        );
    } // else handle skip bc resultspress not gonna b called

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
        height: '15%',
        backgroundColor: '#16161A',
        alignItems: 'center',
        paddingTop: '6%',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
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
        zIndex: -1,
    },

    questionSmall: {
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        textAlign: 'center',
    },

    questionLarge: {
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24,
        textAlign: 'center',
    },
    
    or: {
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 10,
        fontSize: 25,
        color: 'white',
    },
})

export default Vote;