import React from 'react';
import { View, StyleSheet} from 'react-native';

const RedBadge = () => {
    return (
        <View style={styles.badge}>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: 'red',
    }
});

export default RedBadge;