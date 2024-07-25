import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen
        name="login"
        options={{ animation: 'fade_from_bottom', animationDuration: 350 }}
      />
    </Stack>
  );
};

export default AuthLayout;
