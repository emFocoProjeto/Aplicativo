import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';
import { AuthContext } from '../../../contexts/AuthContext';
import { getFocosEncontrados } from '../../../services/apiFoco';

export default function Home({ navigation }) {
  const { user } = useContext(AuthContext);
  const [focosEncontrados, setFocosEncontrados] = useState([]);

  async function fetchData() {
    try {
      const response = await getFocosEncontrados();
      setFocosEncontrados(response);
    } catch (error) {
      console.error("Erro ao buscar os focos:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
);


  return (
    <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', backgroundColor: '#ecf0f1', paddingBottom: 25, paddingTop: 4 }}>

          <View style={styles.iconTextWrapper}>
            <FontAwesome name="warning" size={30} color="orange" />
            <Text style={[styles.textInfo, { color: 'red' }]}>{focosEncontrados} focos encontrados!</Text>
          </View>

          <View style={styles.buttonsWrapper}>
            <Text style={styles.title}>Viu um foco da Dengue?</Text>
           {user.type === 'cidadao' &&
              <Button
                  texto="Registrar foco da dengue" 
                  onPress={() =>  navigation.navigate('Notificar')} 
                  style={styles.buttonNotificar} 
                  textStyle={styles.textButton} 
              />
           }
            <Button 
                texto="Focos Registrados" 
                onPress={() =>  navigation.navigate('Listagem')} 
                style={styles.buttonListagem} 
                textStyle={styles.textButton} 
            />
          </View>

          <Pressable
            style={styles.card}
            onPress={() =>  navigation.navigate('InfoDengue')} 
          >
          <Image style={styles.img} source={require('../../../assets/image-home1.png')} />
          <Text style={styles.titleCard}>O que é Dengue?</Text>
            <Text style={styles.textCard}>
              Informações sobre a dengue.
            </Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() =>  navigation.navigate('InfoSintomas')} 
          >
            <Image style={styles.img} source={require('../../../assets/image-home2.png')} />
            <Text style={styles.titleCard}>Principais Sintomas</Text>
            <Text style={styles.textCard}>Identificando os sistemas.</Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() =>  navigation.navigate('InfoPrevinir')} 
          >
            <Image style={styles.img} source={require('../../../assets/image-home3.png')} />
            <Text style={styles.titleCard}>Prevenção da Dengue</Text>
            <Text style={styles.textCard}>Cuidados a serem tomados contra a dengue.</Text>
          </Pressable>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconTextWrapper: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
  },
  textInfo: {
    fontSize: 17,
    paddingLeft: 10,
  },
  buttonsWrapper: {
    marginTop: 15,
    alignItems: 'center',
    marginTop: 15,
    width: '70%'
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  buttonNotificar: {
    backgroundColor: '#00c14d',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    width: '80%',
  },
  buttonListagem: {
    backgroundColor: '#99c321',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 25,
    borderRadius: 5,
    width: '80%',
  },

  card: {
    width: '80%',
    marginBottom: 25,
  },
  img: {
    width: '100%',
    height: 130
  },
  titleCard: {
    fontSize: 16,
    fontWeight: '600'
  },
})