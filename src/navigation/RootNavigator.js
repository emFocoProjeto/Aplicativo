import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AdministradorNavigator from './AdministradorNavigator';
import AgenteNavigator from './AgenteNavigator';
import AuthNavigator from './AuthNavigator';
import CidadaoNavigator from './CidadaoNavigator';

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  let Navigator;
  if (user) {
    switch (user.type) {
      case 'admin':
        Navigator = AdministradorNavigator;
        break;
      case 'agente':
        Navigator = AgenteNavigator;
        break;
      case 'cidadao':
        Navigator = CidadaoNavigator;
        break;
      default:
        Navigator = AuthNavigator;
        break;
    }
  } else {
    Navigator = AuthNavigator;
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <Navigator />
    </NavigationContainer>
  );
}
