import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {View} from 'react-native'

export default function VoteLoading() {
    return (
        <SkeletonContent 
            containerStyle={{ flex: 1, width: 300 }}
            animationDirection="horizontalLeft"
            layout={[
                // long line
                { width: 220, height: 20, marginBottom: 6 },
                // short line
                { width: 180, height: 20, marginBottom: 6 },
                // ...
            ]}
            isLoading={true}
            boneColor="#121212"
            highlightColor="#333333"
        />
    )
}