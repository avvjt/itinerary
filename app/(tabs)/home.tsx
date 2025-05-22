import React, { useRef } from 'react';
import { Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );



  return (
    <SafeAreaView className="flex-1 bg-transparent" edges={['bottom']}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      {/* Scrollview */}
      <Animated.ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 20 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
       
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Home;