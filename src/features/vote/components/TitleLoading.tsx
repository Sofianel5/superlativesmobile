import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {View} from 'react-native'

export default function TitleLoading() {
    return (
        <SkeletonContent 
            containerStyle={{ flex: 1 }}
            animationDirection="horizontalRight"
            layout={[
                { width: '100%', height: 120 }
            ]}
            isLoading={true}
            boneColor="#121212"
            highlightColor="#333333"
        />
    )
}