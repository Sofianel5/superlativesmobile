import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export default function VoteLoading() {
    return (
        <SkeletonContent 
            containerStyle={{ flex: 1, height: '100%'}}
            animationDirection="horizontalRight"
            layout={[
                { width: '100%', height: 120, marginBottom: 60 },
                { height: '32%', width: '92%', alignSelf: 'center', marginBottom: 40 },
                { height: '32%', width: '92%', alignSelf: 'center', marginBottom: 6 },
            ]}
            isLoading={true}
            boneColor="#121212"
            highlightColor="#333333"
        />
    )
}