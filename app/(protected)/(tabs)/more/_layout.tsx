import { Stack } from 'expo-router';

const MoreLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default MoreLayout;
