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

  return (
    <NavigationContainer>
        <StatusBar
          barStyle="dark-content" 
          translucent={true}
          backgroundColor="transparent"
        />
        {user  ? (
        user.type === 'admin' ? <AdministradorNavigator /> :
        user.type === 'agente' ? <AgenteNavigator /> :
        <CidadaoNavigator />
        ) : (
        <AuthNavigator />
        )}
    </NavigationContainer>
  );
}
