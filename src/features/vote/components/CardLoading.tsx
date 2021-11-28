import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {View} from 'react-native'

export default function CardLoading() {
    return (
        <SkeletonContent 
            containerStyle={{ flex: 1 }}
            animationDirection="horizontalRight"
            layout={[
                { height: 220, width: 330, alignSelf: 'center' },
            ]}
            isLoading={true}
            boneColor="#121212"
            highlightColor="#333333"
        />
    )
}