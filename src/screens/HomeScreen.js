import React from 'react';
import 
{
  Button, 
  Divider, 
  Layout, 
  StyleService
} 
  from '@ui-kitten/components';

import {useNavigation} from "@react-navigation/native";
import useStore from "../store/useStore";

export const HomeScreen = () => {
  const setIsLoggedIn = useStore(state => state.login);
  const navigation = useNavigation();

  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  const navigateNewQuestionnaire = () => {
    navigation.navigate('Novo questionário');
  };

  return (
    <Layout style={{flex: 1, alignItems:'center'}}>
      <Divider/>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button style={styles.button} size='medium' onPress={navigateNewQuestionnaire}>Novo questionário</Button>
      </Layout>
      <Button style={styles.button} onPress={onLogOut} appearance='ghost'>Sair</Button>
    </Layout>
  );
};

const styles = StyleService.create({
  button: {
    marginTop: 10,
    padding: 10,
    width: 300,
    fontSize:15,
  },
  
});
