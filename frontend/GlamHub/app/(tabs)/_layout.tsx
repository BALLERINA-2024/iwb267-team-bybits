import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="landing_2" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="providersignup" />
      <Stack.Screen name="loginprovider" />
      <Stack.Screen name="homescreen" />
    </Stack>
  );
}
