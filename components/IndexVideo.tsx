import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const IndexVideo = () => {
  const { height } = useWindowDimensions();

  return (
    <View className="absolute top-0 left-0 right-0 z-0" style={{ height: height }}>
      <Video
        source={require('@/assets/videos/video1.mp4')}
        style={{ width: '100%', height: '100%' }}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        isMuted={true}
        useNativeControls={false}
        rate={1.0}
        volume={1.0}
        positionMillis={0}
        posterStyle={{ resizeMode: 'cover' }}
      />
    </View>
  );
};

export default IndexVideo;