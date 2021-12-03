import * as React from "react";
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image } from "react-native";
// import Animated from "react-native-reanimated";

const Card = (props) => {  
    const img = props.image;
    const name = props.name;
    const cardNum = props.cardNum;
    const onPress = props.onPress;

    return (
        <TouchableOpacity style={cardNum == "1" ? styles.card1 : styles.card2} onPress={onPress}>
            <ImageBackground source={img} style={styles.image} imageStyle={{opacity: 0.6}}>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
            </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    card1: {
        zIndex: -1,
        backgroundColor: '#7F5AF0',
        height: '32%',
        width: '92%',
        shadowOffset : {height: 4, width: 4},
        shadowOpacity: 0.8,
        borderRadius: 8,
        marginTop:30,
        flexDirection: 'row',
        padding: 10,
    },

    card2: {
        backgroundColor: '#2CB67D',
        height: '32%',
        width: '92%',
        shadowOffset : {height: 4},
        shadowOpacity: 0.8,
        borderRadius: 8,
        marginTop: 10,
        flexDirection: 'row',
        padding: 10,
    },

    image: {
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
    },
    
    nameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // width: 205,
    },

    name: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        marginTop: 140,
    }

});

export default Card;