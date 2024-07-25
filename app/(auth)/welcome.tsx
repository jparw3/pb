import { Image, generateBlurhashAsync } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView } from 'react-native';
import { Button } from '~/components/Button';

import { Container } from '~/components/Container';
import { Box, makeStyles, Text } from '~/theme';

const AuthIndex = () => {
  const router = useRouter();

  const styles = useStyles();
  const blurhash = 'L8EB:E~p1Z9s9HIV?G?G1Z-:+JR6';

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <Container>
        <Text variant="bold/title2" textAlign="center">
          Lorem ipsum dolor sit
        </Text>
        <Text variant="bold/title2" textAlign="center">
          amet, nunc tellus elit
        </Text>
        <Image
          style={styles.carousel}
          source={require('~/assets/images/cover-image.png')}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />

        <Button onPress={() => router.push('/login')} title="Join / Login" />
      </Container>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  carousel: {
    marginVertical: theme.spacing.xl_64,
    marginHorizontal: theme.spacing.ml_24,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    shadowColor: theme.colors.black,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 1,
    shadowOpacity: 0.3,
    borderRadius: theme.borderRadii.xl_24,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: theme.spacing.m_16,
  },
}));

export default AuthIndex;
