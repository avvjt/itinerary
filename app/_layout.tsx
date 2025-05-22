import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return <Stack>

    <Stack.Screen
      name='index'
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name='(auth)'
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name='(auth)/name'
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name='(auth)/signin'
      options={{ headerShown: false }} />

    <Stack.Screen
      name='(auth)/verify'
      options={{ headerShown: false }} />

    <Stack.Screen
      name='(auth)/forget'
      options={{ headerShown: false }} />

    <Stack.Screen
      name='(tabs)'
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name='home'
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name='booking'
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name='profile'
      options={{ headerShown: false }}
    />


  </Stack>


}
