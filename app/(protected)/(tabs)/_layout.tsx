import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { PressableScale } from '~/components/PressableScale';

import { useAuth } from '~/context/AuthContext';
import { theme } from '~/theme';

const ProtectedLayout = () => {
  const { user } = useAuth();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.black,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarLabelStyle: {
          fontFamily: 'Pretendard-SemiBold',
        },
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          shadowColor: theme.colors.black,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 1,
        },
      }}>
      <Tabs.Screen
        name="bubbles"
        redirect={!user}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <PressableScale>
              <Ionicons name="chatbubble-sharp" size={24} color={color} />
            </PressableScale>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        redirect={!user}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => (
            <PressableScale>
              <Feather name="more-horizontal" size={28} color={color} />
            </PressableScale>
          ),
        }}
      />
    </Tabs>
  );
};

export default ProtectedLayout;
