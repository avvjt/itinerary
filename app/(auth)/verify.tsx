import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


const Verify = () => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const [timer, setTimer] = useState<number>(30);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const inputsRef = useRef<Array<React.RefObject<TextInput>>>(
  Array(4)
    .fill(null)
    .map(() => React.createRef<TextInput>()) as React.RefObject<TextInput>[]
);
 
    const params = useLocalSearchParams();
    const userName = params.userName as string;

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000) as unknown as number;
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Trigger vibration when a digit is entered
    if (text) {
      Vibration.vibrate(50); // 50ms vibration
    }

    if (text && index < 3) {
      inputsRef.current[index + 1]?.current?.focus();
    }

    if (!text && index > 0) {
      inputsRef.current[index - 1]?.current?.focus();
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    setIsResendDisabled(true);
  };

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
          {/* OTP Input Area */}
          <View className="px-4" style={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            backgroundColor: '#242424',
          }}>
            {/* Header with Back Button */}
            <View className="flex-row items-center w-full pb-4" style={{
              paddingTop: insets.top + 16,
              paddingBottom: 16,
            }}>
              <TouchableOpacity
                onPress={() => router.push('/signin')}
                className="p-2"
              >
                <Feather name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-white text-4xl text-center font-bold">
              Enter your{"\n"}verification code?
            </Text>

            <View className="flex-row justify-center pb-8 mt-12">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={inputsRef.current[index]}
                  className="text-white text-2xl mx-2"
                  placeholder="x"
                  placeholderTextColor="#6b7280"
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  autoFocus={index === 0}
                  maxLength={1}
                  style={{
                    width: 50,
                    height: 60,
                    borderWidth: 1,
                    borderColor: '#6b7280',
                    borderRadius: 8,
                    textAlign: 'center',
                    backgroundColor: '#1c1c1e',
                  }}
                />
              ))}
            </View>

            {/* Resend OTP Section */}
            <View className="flex-row justify-center mb-8">
              <Text className="text-gray-400 text-center text-sm">
                Didn't receive code?{' '}
              </Text>
              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={isResendDisabled}
              >
                <Text className={`text-sm ${isResendDisabled ? 'text-gray-600' : 'text-white underline'}`}>
                  {isResendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms Text */}
          <View className="mt-4 flex-row justify-center flex-wrap">
            <Text className="text-gray-400 text-center text-sm">
              By tapping verify, you agree to the{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/terms')}>
              <Text className="text-white text-sm underline">
                terms and condition
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Verify Button Container */}
        <View className="absolute bottom-0 right-0 p-4">
          <TouchableOpacity
            className="bg-white rounded-full items-center justify-center"
            onPress={() => router.push({
              pathname: "/(tabs)/home", // Correct path for tabbed home
              params: { userName }
            })}
            disabled={otp.join('').length < 4}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 60,
              opacity: otp.join('').length < 4 ? 0.6 : 1,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}
          >
            <Text className="text-black text-xl font-semibold">Verify</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Verify;