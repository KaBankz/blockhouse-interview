import { Text, Button } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '../../providers/auth';

export function Profile() {
  const {
    session: { user },
    signOut,
  } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>Email: {user?.email}</Text>
      <Text>ID: {user?.id}</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
