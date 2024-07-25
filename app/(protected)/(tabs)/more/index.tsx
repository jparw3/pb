import { signOut } from 'firebase/auth';
import { SafeAreaView } from 'react-native';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { auth } from '~/utils/firebase';

const More = () => {
  function logout() {
    signOut(auth);
  }
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <Container>
        <Button title="logout" onPress={logout} />
      </Container>
    </SafeAreaView>
  );
};

export default More;
