import React from 'react';
import 
{
  Layout,
  Icon,
  List,
  ListItem,
  StyleService,
  Divider
}
  from '@ui-kitten/components';
import { ScrollView } from 'react-native-web';
import firebase from '../../config/firebase';


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
  
  React.useEffect(() => {
    database.collection("Questionario").onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      });
      console.log(list);
      setListQuests(list);

      console.log(listQuests);
    })

    return () => {
      setListQuests([]);
    };

  }, []);

  const renderItemIcon = (props) => (
    <Icon {...props} name='person' />
  );

  const renderItem = ({ item, index }) => (
    <ListItem 
      title={`${index + 1}. ${item.nomeCompleto}`}
      description={`${item.dataNascimento} | ${item.email} | ${item.telefone} |`}
      accessoryLeft={renderItemIcon}
      style={{width:"100%"}}
    />
  );

  return (
      <Layout style={{ flex: 1 }}>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <List
            style={styles.container}
            data={listQuests}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
        </Layout>
      </Layout>

  );
};

const styles = StyleService.create({
  container: {
    width: "100%",
    flexDirection: "row",
    margin: 20,
    backgroundColor:"#FFF"

  },
});

