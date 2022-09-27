import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabsNavigator} from "./BottonNavigation";
import { NewQuestionnaireScreen} from "../screens/questionnaire/NewQuestionnaireScreen";
import {LoginScreen, RegisterScreen, ForgotPassScreen} from "../screens/auth";
import useStore from '../store/useStore';
const {Navigator, Screen} = createStackNavigator();

export const AppNavigator = () => {
  const isSignedIn = useStore(state => state.isSignedIn);
  const typeUser = useStore(state => state.type);
  const userID = useStore(state => state.userID);

  
  return (
    <NavigationContainer>
      <Navigator>
        {isSignedIn ? (
          <>
            <Screen options={{headerShown: false}} name={'TabsNavigation'} component={BottomTabsNavigator}/>
            <Screen name='Novo questionário SRQ-20' component={NewQuestionnaireScreen}/>
          </>
        ) : (
          <>
            <Screen options={{headerShown: false}} name={'Login'} component={LoginScreen}/>
            <Screen options={{headerShown: false}} name={'Cadastre-se'} component={RegisterScreen}/>
            <Screen options={{headerShown: false}} name={'Recupere sua conta'} component={ForgotPassScreen}/>
          </>
        )}
      </Navigator>
    </NavigationContainer>
  )
};