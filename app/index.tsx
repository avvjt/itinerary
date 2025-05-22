import IndexVideo from "@/components/IndexVideo";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const fullText = '━ Ininerary';
  
  // Animation text/cursar colors
  const textColor = 'bg-red-100';
  const cursorColor = 'bg-red-200';

  useEffect(() => {
    let timeoutId: number;

    if (animationPhase === 0) {
      if (typedText.length < fullText.length) {
        timeoutId = setTimeout(() => {
          setTypedText(prev => prev + fullText[prev.length]);
        }, 150);
      } else {
        timeoutId = setTimeout(() => setAnimationPhase(1), 2000);
      }
    } else if (animationPhase === 1) {
      timeoutId = setTimeout(() => setAnimationPhase(2), 2000);
    } else if (animationPhase === 2) {
      if (typedText.length > 0) {
        timeoutId = setTimeout(() => {
          setTypedText(prev => prev.slice(0, -1));
        }, 100);
      } else {
        setAnimationPhase(0);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [typedText, animationPhase]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (animationPhase === 1) {
        setCursorVisible(false);
      } else {
        setCursorVisible(prev => !prev);
      }
    }, 500);

    return () => clearInterval(blinkInterval);
  }, [animationPhase]);

  return (
    <View className="flex-1 bg-black">
      <StatusBar translucent backgroundColor="transparent" />
      <IndexVideo/>

      <LinearGradient
        colors={['rgba(0,0,0,1)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute top-0 left-0 right-0 h-40 z-10"
      />

      <View className="flex-1 h-40" />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="min-h-screen px-4 pt-8"
      >
        <View className="mt-auto mb-16">
          <Text className="text-white text-3xl font-bold text-center">
            Personalize your travel
          </Text>
          <Text className="text-white text-3xl font-bold text-center">
            Don’t Settle for Less
          </Text>
          
          {/* Animated Text with Custom Colors */}
          <View className="flex-row justify-center items-center mb-8">
            <Text className={`${textColor} text-3xl font-bold text-center`}>
           {typedText}
            </Text>
            {(animationPhase !== 1) && (
              <View 
                className={`ml-1 w-[2px] h-8 ${cursorColor}`}
                style={{ 
                  opacity: cursorVisible ? 1 : 0,
                  marginBottom: 4
                }}
              />
            )}
          </View>

          <TouchableOpacity
            className="bg-white py-4 rounded-full mb-4 mr-2 ml-2"
            onPress={() => router.push('/name')}
          >
            <Text className="text-black text-center font-bold text-lg">
              Get Started
            </Text>
          </TouchableOpacity>

          <Text className="text-center text-gray-200 mb-4 mt-4">────── else ──────</Text>

          <TouchableOpacity
            className="bg-black py-4 rounded-full"
            onPress={() => console.log('Google Sign In')}
          >
            <Text className="text-white text-center font-bold text-lg">
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}