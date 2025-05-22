import { icons } from '@/constants/icons';
import { Tabs } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Image, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  type TabIconProps = {
    focused: boolean;
    icon: any;
  };

  const TabIcon = ({ focused, icon }: TabIconProps) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const underlineScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: focused ? -6 : 0,  // Reduced floating height
          speed: 20,
          bounciness: 12,
          useNativeDriver: true,
        }),
        Animated.spring(underlineScale, {
          toValue: focused ? 1 : 0,
          speed: 20,
          useNativeDriver: true,
        }),
      ]).start();
    }, [focused]);

    return (
      <View className="items-center justify-center flex-1">
        {/* Main icon with reduced size */}
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Image
            source={icon}
            className="h-7 w-7" // Reduced from h-8 w-8
            style={{ 
              tintColor: focused ? '#ffffff' : '#6B7280',
            }}
          />
        </Animated.View>

        {/* Adjusted underline position */}
        <Animated.View
          className="absolute -bottom-0.5 h-1 w-5 bg-[#ffffff] rounded-full" // Tighter spacing
          style={{
            opacity: underlineScale,
            transform: [{ scaleX: underlineScale }],
          }}
        />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingTop: 8,
          backgroundColor: Platform.select({
            ios: '#000000CC',
            android: '#000000',
          }),
          borderTopWidth: 0,
          elevation: 10,
          ...Platform.select({
            ios: {
              backdropFilter: 'blur(24px)',
              background: 'transparent',
            },
          }),
        },
        tabBarLabelStyle: {
          display: 'none',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.booking} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
}