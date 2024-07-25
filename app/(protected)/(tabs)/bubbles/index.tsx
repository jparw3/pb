import { Entypo } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { query } from 'firebase/database';
import { addDoc, collection, getDoc, onSnapshot, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import { Container } from '~/components/Container';
import { FloatingButton } from '~/components/FloatingButton';
import { useAuth } from '~/context/AuthContext';
import { Box, makeStyles, Text, theme } from '~/theme';
import { db } from '~/utils/firebase';

const Bubbles = () => {
  const [loading, setLoading] = useState(false);
  const [bubbles, setGroups] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const groupsCollection = collection(db, 'groups');
    const q = query(groupsCollection);
    // const q = query(groupsCollection, where('members', 'array-contains', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGroups(data);
    });

    return unsubscribe;
  }, []);

  const { user } = useAuth();

  const handleCreateGroup = async () => {
    try {
      const doc = await addDoc(collection(db, 'groups'), {
        name: `Group ${new Date().getTime()}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        members: [user!.uid],
      });

      router.push(`/bubbles/${doc.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Spinner
        visible={loading}
        color={theme.colors.primary}
        size="small"
        overlayColor="rgba(255,255,255,0.5)"
      />
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        <Container>
          <Box p="s_8" borderRadius="l_12">
            {bubbles.map((bubble) => (
              <Link href={`bubbles/${bubble.id}`} key={bubble.id}>
                <Box paddingVertical="ml_24" borderBottomWidth={1}>
                  <Text>{bubble.name}</Text>
                </Box>
              </Link>
            ))}
          </Box>
          <FloatingButton onPress={handleCreateGroup}>
            <Entypo name="plus" size={30} color={theme.colors.white} />
          </FloatingButton>
        </Container>
      </SafeAreaView>
    </>
  );
};

export default Bubbles;
