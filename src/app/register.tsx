import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Register() {
  return (
    <View>
      <Text>Registrar-se</Text>

      <TouchableOpacity onPress={() => router.push('login')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}