import { AntDesign } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { query } from 'firebase/database';
import { addDoc, collection, doc, onSnapshot, orderBy } from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Easing, FlatList, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Animated, { FadeIn, Layout, LinearTransition } from 'react-native-reanimated';

import { PressableScale } from '~/components/PressableScale';
import { useAuth } from '~/context/AuthContext';
import { Box, makeStyles, Text, theme } from '~/theme';
import { db } from '~/utils/firebase';

const GroupPage = () => {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const [bubble, setBubble] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const styles = useStyles();

  const sendMessage = async () => {
    if (message.trim().length > 0) {
      const timestamp = new Date().getTime();

      const msg = message.trim();
      addDoc(collection(db, `groups/${id}/messages`), {
        text: msg,
        from: user!.uid,
        createdAt: timestamp,
      });
      setMessage('');
    }
  };

  useLayoutEffect(() => {
    const msgCollection = collection(db, `groups/${id}/messages`);
    const q = query(msgCollection, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(doc(db, `groups/${id}`), (doc) => {
      setBubble({ id: doc.id, ...doc.data() });
    });

    return unsubscribe;
  }, [id]);

  const renderMessage = ({ item }: { item: any }) => {
    const isMe = item.from === user?.uid;

    if (isMe) {
      return (
        <Animated.View entering={FadeIn.duration(200)} layout={LinearTransition}>
          <Box flexDirection="row" justifyContent="flex-end" mb="s_8" marginHorizontal="sm_12">
            <Box bg="lightGray" p="sm_12" borderTopRightRadius="m_6" borderRadius="xl_24">
              <Text variant="regular/footnote" color="almostBlack">
                {item.text}
              </Text>
            </Box>
          </Box>
        </Animated.View>
      );
    }

    return (
      <Animated.View entering={FadeIn.duration(200)} layout={LinearTransition}>
        <Box flexDirection="row" justifyContent="flex-start" mb="s_8" marginHorizontal="sm_12">
          <Box bg="lightPrimary" p="sm_12" borderTopLeftRadius="m_6" borderRadius="xl_24">
            <Text variant="regular/footnote" color="almostBlack">
              {item.text}
            </Text>
          </Box>
        </Box>
      </Animated.View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: bubble?.name,
          headerLeft: () => (
            <PressableScale onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </PressableScale>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}>
        <FlatList
          style={{ backgroundColor: theme.colors.white, paddingTop: theme.spacing.s_8 }}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
        />
        <Box
          flexDirection="row"
          paddingHorizontal="s_8"
          gap="m_16"
          bg="white"
          paddingTop="sm_12"
          alignItems="center"
          paddingBottom="l_32">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Enter message"
            style={styles.textInput}
            onSubmitEditing={sendMessage}
          />
          <PressableScale onPress={sendMessage} style={styles.sendButton}>
            <AntDesign name="arrowup" size={22} color="white" />
          </PressableScale>
        </Box>
      </KeyboardAvoidingView>
    </>
  );
};

export default GroupPage;

const useStyles = makeStyles((theme) => ({
  textInput: {
    backgroundColor: '#F8F6FB',
    height: 48,
    flex: 1,
    paddingHorizontal: theme.spacing.sm_12,
    borderRadius: theme.borderRadii.full_9999,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    width: 44,
    height: 44,
    borderRadius: theme.borderRadii.full_9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
