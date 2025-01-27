import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => console.log(data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.signupContainer}>
        <Text style={styles.title}>Signup</Text>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholderTextColor='#000000'
                placeholder='Email'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholderTextColor='#000000'
                placeholder='Password'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry
                autoCapitalize='none'
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          <Controller
            control={control}
            name='confirmPassword'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholderTextColor='#000000'
                placeholder='Confirm Password'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry
                autoCapitalize='none'
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword.message}</Text>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.signupButton,
            pressed && styles.signupButtonPressed,
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.signupButtonText}>Signup</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 0,
    fontSize: 16,
  },
  inputContainer: {
    gap: 10,
  },
  signupButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signupButtonPressed: {
    backgroundColor: '#0056b3',
    transform: [{ scale: 0.98 }],
    elevation: 1,
    shadowOpacity: 0.15,
  },
  signupButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
    marginLeft: 14,
  },
});
