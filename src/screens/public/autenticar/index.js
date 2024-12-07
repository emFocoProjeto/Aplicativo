import React, { useContext, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../../components/Button';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Autenticar({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (validar()) {
      try {
        const useForm = { 
          email: email, 
          password: password 
        };
        setIsLoading(true);
        await login(useForm);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validar = () => {
    let error = false;
    setErrorEmail('');
    setErrorPassword('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorEmail('Preencha seu e-mail corretamente');
      error = true;
    }
    if (!password) {
      setErrorPassword('Preencha a senha');
      error = true;
    }
    return !error;
  };

  return (
    <ImageBackground
      source={require('../../../assets/background-inicio.jpg')}
      style={styles.container}
      resizeMode='cover' // Corrigido de 'cover1' para 'cover'
    >
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={value => {
            setEmail(value);
            setErrorEmail('');
          }}
          keyboardType="email-address"
          style={styles.input}
        />
        {errorEmail ? <Text style={styles.error}>{errorEmail}</Text> : null}

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          style={styles.input}
        />
        {errorPassword ? <Text style={styles.error}>{errorPassword}</Text> : null}

        <Button
          texto={isLoading ? "Carregando..." : "Entrar"}
          onPress={handleLogin}
          style={styles.buttonBlue} 
          textStyle={styles.buttonText} 
          disabled={isLoading}
        />
        <Button 
          texto="Não tenho cadastro!" 
          onPress={() => navigation.navigate('Cadastro')}
          style={styles.buttonGreen} 
          textStyle={styles.buttonText} 
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    width: '80%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    overflow: 'hidden', 
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#28a745',
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonBlue: {
    width: '100%',
    padding: 15,
    backgroundColor: '#1351b4',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonGreen: {
    width: '100%',
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  }
});
