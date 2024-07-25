import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@shopify/restyle';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from 'theme';

import { AuthProvider, useAuth } from '~/context/AuthContext';

const Root = () => {
  const { initialized, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Pretendard-Black': require('../assets/fonts/Pretendard-Black.ttf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.ttf'),
    'Pretendard-Light': require('../assets/fonts/Pretendard-Light.ttf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.ttf'),
  });

  useEffect(() => {
    if (initialized) {
      const isInProtectedRoute = segments[0] === '(protected)';

      if (user && !isInProtectedRoute) {
        router.replace('/bubbles');
      } else if (!user && isInProtectedRoute) {
        router.replace('/welcome');
      }
    }
  }, [user, initialized, segments, router]);

  if (!fontsLoaded || !initialized) {
    return <ActivityIndicator style={{ flex: 1 }} color={theme.colors.primary} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider theme={theme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const App = () => (
  <AuthProvider>
    <Root />
  </AuthProvider>
);

export default App;
