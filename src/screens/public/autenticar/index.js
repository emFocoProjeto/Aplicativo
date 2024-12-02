import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';
import InputText from '../../../components/InputText';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Autenticar({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useContext(AuthContext);

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
        Alert.alert('Verifique se o email e a senha estão corretos!');
        setIsLoading(false);
        console.log(error);
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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <InputText
          placeholder="E-mail"
          onChangeText={value => {
            setEmail(value);
            setErrorEmail('');
          }}
          keyboardType="email-address"
          errorMessage={errorEmail}
        />
        <InputText
          placeholder="Senha"
          onChangeText={value => setPassword(value)}
          errorMessage={errorPassword}
          secureTextEntry={true}
        />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
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
});
