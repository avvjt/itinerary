import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Signin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const userName = params.userName as string;

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-[#000000]">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              backgroundColor: '#242424',
              paddingHorizontal: 20,
              paddingVertical: 20,
              // Optional shadow for iOS & elevation for Android
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {/* Header with Back Button */}
            <View className="flex-row items-center w-full pb-4" style={{
              paddingTop: insets.top + 16,
              paddingBottom: 16,
            }}>
              <TouchableOpacity
                onPress={() => router.push('/')}
                className="p-2"
              >
                <Feather name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-white text-4xl text-center font-bold">
              What's your{"\n"}phone number?
            </Text>

            <View className="flex-row items-center justify-center ">
              <TouchableOpacity className="pr-2">
                <Text className="text-white text-4xl bg-transparent mt-11 ml-12">+91</Text>
              </TouchableOpacity>

              <TextInput
                className="flex-1 text-white text-4xl bg-transparent mt-11"
                placeholder="xxxx xxx xxx"
                placeholderTextColor="#6b7280"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoFocus={true}
                maxLength={10}
                onSubmitEditing={Keyboard.dismiss}
                style={{
                  height: 60,
                  paddingHorizontal: 5,
                }}
              />
            </View>
          </View>

          {/* Terms Text */}
          <View className="mt-4 flex-row justify-center flex-wrap">
            <Text className="text-gray-400 text-center text-sm">
              By tapping next, you agree to the{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/verify')}>
              <Text className="text-white text-sm underline">
                terms and condition
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* Next Button Container */}
        <View className="absolute bottom-0 right-0 p-4">
          <TouchableOpacity
            className="bg-white rounded-full items-center justify-center"
            onPress={() => router.push({
              pathname: "/verify", // Correct path for tabbed home
              params: { userName }
            })}
            disabled={phoneNumber.length < 10}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 60,
              opacity: phoneNumber.length < 10 ? 0.6 : 1,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}
          >
            <Text className="text-black text-xl font-semibold">Next</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signin;