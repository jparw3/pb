import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  TextInput as RnTextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { PressableScale } from '~/components/PressableScale';
import { TextInput } from '~/components/TextInput';
import { Box, Text, theme } from '~/theme';
import { auth, db } from '~/utils/firebase';

const AuthIndex = () => {
  const router = useRouter();
  const passwordInputRef = useRef<RnTextInput>(null);

  const [email, setEmail] = useState('jack@podww.com');
  const [password, setPassword] = useState('devPodAccount');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    const isExistingUser = !querySnapshot.empty;

    if (isExistingUser) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, `users/${user.user.uid}`);
      await setDoc(docRef, {
        email,
        createdAt: new Date(),
        createdOn: Platform.OS,
      });
    }
  };

  return (
    <>
      {loading && <ActivityIndicator size="large" color={theme.colors.primary} />}
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        <Container>
          <Box flexDirection="row" justifyContent="space-between">
            <Box width={24} />
            <Image source={require('~/assets/images/photobubble-title.png')} />
            <PressableScale onPress={router.back} animateOpacity>
              <Ionicons name="close" size={24} color="black" />
            </PressableScale>
          </Box>
          <Text variant="bold/title1" textAlign="left" marginTop="ml_24">
            Account Log in / Sign up
          </Text>

          <Box marginVertical="l_32">
            <Box>
              <Text color="gray" variant="regular/footnote">
                Email
              </Text>
              <TextInput
                autoFocus
                value={email}
                keyboardType="email-address"
                placeholder="your@email.com"
                onChangeText={setEmail}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                returnKeyType="next"
              />
            </Box>
            <Box mt="l_32">
              <Text color="gray" variant="regular/footnote">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                ref={passwordInputRef}
                secureTextEntry
                placeholder="••••••••••"
                returnKeyType="done"
                onSubmitEditing={handleContinue}
              />
            </Box>
          </Box>

          <Button onPress={handleContinue} title="Continue with this email" />
          <Text variant="bold/footnote" color="gray" textAlign="center" marginTop="m_16">
            Forgot your password?
          </Text>
        </Container>
      </SafeAreaView>
    </>
  );
};

export default AuthIndex;
