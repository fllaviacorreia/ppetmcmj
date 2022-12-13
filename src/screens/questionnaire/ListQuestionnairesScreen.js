import React from 'react';
import {
  Layout,
  Icon,
  List,
  ListItem,
  StyleService,
  Divider,
  Text
}
  from '@ui-kitten/components';
import { ScrollView } from 'react-native-web';
import firebase from '../../config/firebase';
import useStore from "../../store/useStore";


/**
 * 
 * 
 * Array [
 * Object {
    "dataNascimento": "01/01/2001",
    "email": "teste@teste.teste",
    "escolaridade": "teste",
    "etnia": "teste",
    "id": "lulEcOjTaZYU53IxR4GQ",
    "idAgenteComunitario": "dwJDlyLwuicZxDNBYblo",
    "nomeCompleto": "teste 123",
    "question1": "teste",
    "question10": "teste",
    "question11": "teste",
    "question12": "teste",
    "question13": "teste",
    "question14": "teste",
    "question15": "teste",
    "question16": "teste",
    "question17": "teste",
    "question18": "teste",
    "question19": "teste",
    "question2": "teste",
    "question20": "teste",
    "question3": "teste",
    "question4": "teste",
    "question5": "teste",
    "question6": "teste",
    "question7": "teste",
    "question8": "teste",
    "question9": "teste",
    "rendaMensal": 1201.21,
    "sexo": "teste",
    "telefone": "(73) 9 8888-8888",
  },
]
*/

export const ListQuestionnairesScreen = () => {
  const [listQuests, setListQuests] = React.useState([]);
  const database = firebase.firestore();
  const typeUser = useStore(state => state.type);
  const userID = useStore(state => state.userID);


  React.useEffect(() => {
    // if (typeUser) {
    //   database.collection("Questionario").onSnapshot((query) => {
    //     query.forEach((doc) => {
    //       setListQuests({ ...doc.data(), id: doc.id })
    //     });
    //   });
    //   if (typeUser === "acs") {
    //     setListQuests(listQuests.filter((item) => item.idAgenteComunitario === userID));
    //   }
    // }

    return () => {
      setListQuests([]);
    };

  }, [typeUser]);

  const renderItemIcon = (props) => (
    <Icon {...props} name='person' />
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${index + 1}. ${item.nomeCompleto}`}
      description={`${item.dataNascimento} | ${item.email} | ${item.telefone} |`}
      accessoryLeft={renderItemIcon}
    />
  );

  const ListItems = () => {
    return (
      <List
        style={styles.container}
        data={listQuests}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    );

  }

  const ListaVazia = () => {
    return (
      <Layout style={styles.containerText}>
        <Text category='h5' style={styles.tex}>
        Nenhum questionário encontrado
      </Text>
      </Layout>
      
    );
  }

  console.log('listQuests',listQuests)

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {(listQuests.length === 0) ?  <ListaVazia/> : <ListItems />}
      </Layout>
    </Layout>
  );
};

const styles = StyleService.create({
  container: {
    width: "100%",
    backgroundColor: "#FFF",
    margin: 20,
    maxHeight: "100%",
    maxWidth: "100%",
    textShadowColor:"#000"
  },
  containerText: {
    width: "100%",
    backgroundColor: "#FFF",
    margin: 20,
    maxHeight: "100%",
    maxWidth: "100%",
    textShadowColor:"#000",
    justifyContent:'center',
    alignItems:'center',
  },
});

