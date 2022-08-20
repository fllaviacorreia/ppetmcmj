import React from 'react';
import {
  Button,
  Divider,
  Text,
  Layout,
  StyleService,
  IndexPath,
  Modal,
  Card
} from '@ui-kitten/components';

import { ScrollView } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import firebase from '../../config/firebase.js';
import useStore from '../../store/useStore';

import QuestionText from '../components/componentText.js';
import QuestionDate from '../components/componentDate.js';
import QuestionSelectOption from '../components/componentSelect.js';

export const NewQuestionnaireScreen = () => {
  //ID para salvar no banco qual ACS ou Pesquisador cadastrou novo SRQ-20
  const userID = useStore(state => state.userID)

  //Para mensagens de erro ou sucesso
  const [visible, setVisible] = React.useState(false);
  const [messagem, setMessagem] = React.useState('');

  const database = firebase.firestore();

  //Para navegar para a Página inicial quando houver sucesso no cadastro.
  const navigation = useNavigation();
  const navigateHome = () => {
    navigation.navigate('Página inicial');
  };

  //Arrays para serem utilizados no Select 
  const sexo = [
    "Selecione",
    "Feminino",
    "Masculino",];

  const escolaridade = [
    "Selecione",
    "Ensino Fundamental",
    "Ensino Médio",
    "Ensino Superior",
    "Não sabe ler e/ou escrever"];

  const etnia = [
    "Selecione",
    "Branca",
    "Parda",
    "Preta",
    "Amarela"];

  const renda = [
    "Selecione",
    "Até 1 salário mínimo",
    "De 2 a 3 salários mínimos",
    "Mais de 3 salários mínimos"];

  const opcao = [
    "Selecione",
    "Sim",
    "Não"];

  //masks com Regex
  const maskPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  };

  // const maskRenda = (value) => {
  //   return value
  //   .replace(/\D/g, "") //remove alfanuméricos
  //   .replace(/(\d{3})(\d)/, "$1.$2") //primeira seq 000. (casa dos milhares)
  //   .replace(/(\d{3})(\d)/, "$1,$2") //segunda seq 000, (casa das centenas)
  //   .replace(/(-\d{2})\d+?$/, "$1"); // terceira seq 00 (casa dos cents)
  // }

  const [question1, setQuestion1] = React.useState('');
  const [question2, setQuestion2] = React.useState(new Date());
  const [question3, setQuestion3] = React.useState('');
  const [question4, setQuestion4] = React.useState('');
  const [question5, setQuestion5] = React.useState(new IndexPath(0));
  const [question6, setQuestion6] = React.useState(new IndexPath(0));
  const [question7, setQuestion7] = React.useState(new IndexPath(0));
  const [question8, setQuestion8] = React.useState(new IndexPath(0));
  const [question9, setQuestion9] = React.useState(new IndexPath(0));
  const [question10, setQuestion10] = React.useState(new IndexPath(0));
  const [question11, setQuestion11] = React.useState(new IndexPath(0));
  const [question12, setQuestion12] = React.useState(new IndexPath(0));
  const [question13, setQuestion13] = React.useState(new IndexPath(0));
  const [question14, setQuestion14] = React.useState(new IndexPath(0));
  const [question15, setQuestion15] = React.useState(new IndexPath(0));
  const [question16, setQuestion16] = React.useState(new IndexPath(0));
  const [question17, setQuestion17] = React.useState(new IndexPath(0));
  const [question18, setQuestion18] = React.useState(new IndexPath(0));
  const [question19, setQuestion19] = React.useState(new IndexPath(0));
  const [question20, setQuestion20] = React.useState(new IndexPath(0));
  const [question21, setQuestion21] = React.useState(new IndexPath(0));
  const [question22, setQuestion22] = React.useState(new IndexPath(0));
  const [question23, setQuestion23] = React.useState(new IndexPath(0));
  const [question24, setQuestion24] = React.useState(new IndexPath(0));
  const [question25, setQuestion25] = React.useState(new IndexPath(0));
  const [question26, setQuestion26] = React.useState(new IndexPath(0));
  const [question27, setQuestion27] = React.useState(new IndexPath(0));
  const [question28, setQuestion28] = React.useState(new IndexPath(0));


  function verifyData() {
    if (question1 !== "") {
      const dateDay = new Date();
      const birth = dateDay.getFullYear - question2.getFullYear
      if (birth >= 18) {
        if (question3 !== "") {
          if (question4 !== "") {
            if (question5.row !== 0
              && question6.row !== 0
              && question7.row !== 0
              && question8.row !== 0
              && question9.row !== 0
              && question10.row !== 0
              && question11.row !== 0
              && question12.row !== 0
              && question13.row !== 0
              && question14.row !== 0
              && question15.row !== 0
              && question16.row !== 0
              && question17.row !== 0
              && question18.row !== 0
              && question19.row !== 0
              && question20.row !== 0
              && question21.row !== 0
              && question22.row !== 0
              && question23.row !== 0
              && question24.row !== 0
              && question25.row !== 0
              && question26.row !== 0
              && question27.row !== 0
              && question28.row !== 0) {
              return true;
            } else {
              setMessagem("1 ou mais dos campos de seleção não está selecionado corretamente.");
              setVisible(true);
            }
          } else {
            setMessagem("O campo E-mail não está preenchido.");
            setVisible(true);
          }
        } else {
          setMessagem("O campo Telefone não está preenchido.");
          setVisible(true);
        }
      } else {
        setMessagem("O entrevistado precisa ter no mínimo 18 anos.");
        setVisible(true);
      }
    } else {
      setMessagem("O campo Nome completo não está preenchido.");
      setVisible(true);
    }
    <Message operation={() => setVisible(false)}/>
    return false;
  }

  const Message = (props) => (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}>
      <Card disabled={true}>
        <Text style={styles.text}>{messagem}</Text>
        <Button onPress={props.operation}>
          OK
        </Button>
      </Card>
    </Modal>
  );

  function handleSave() {
    if (true) {
      database.collection("Questionario").add({
        nome_completo: question1,
        data_nascimento: question2.toLocaleDateString("pt-BR"),
        telefone: question3,
        email: question4,
        renda_mensal: question5,
        sexo: question6.row,
        escolaridade: question7.row,
        etnia: question8.row,
        question1: question9,
        question2: question10,
        question3: question11,
        question4: question12,
        question5: question13,
        question6: question14,
        question7: question15,
        question8: question16,
        question9: question17,
        question10: question18,
        question11: question19,
        question12: question20,
        question13: question21,
        question14: question22,
        question15: question23,
        question16: question24,
        question17: question25,
        question18: question26,
        question19: question27,
        question20: question28,
        user_id: userID,
        data_cadastro: (new Date()).toLocaleDateString("pt-BR")
      });
      setMessagem("Questionário cadastrado com sucesso!");
      setVisible(true);
      <Message operation={() => navigateHome}/>

    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Divider />
      <Layout style={styles.layout}>
        <Text category='h5'>Dados pessoais</Text>
        <QuestionText
          title={'Nome completo'}
          placeholder={'ex. Maria da Silva'}
          value={question1}
          setText={newValue => setQuestion1(newValue)}
          type="default"
        />
        <QuestionDate
          title={'Data de nascimento'}
          value={question2}
          setText={newValue => setQuestion2(newValue)}
        />
        <QuestionText
          title={'Telefone'}
          placeholder="ex. (73) 9 0000-000"
          value={question3}
          setText={newValue => setQuestion3(maskPhone(newValue))}
          type="numeric"
        />
        <QuestionText
          title={'E-mail'}
          placeholder={'ex. example@example.com'}
          value={question4}
          setText={newValue => setQuestion4(newValue)}
          type="email-address"
        />
        <QuestionSelectOption
          title={'Renda mensal (R$)'}
          data={renda}
          value={question5}
          setValue={setQuestion5}
        />
        <QuestionSelectOption
          title={'Sexo'}
          data={sexo}
          value={question6}
          setValue={setQuestion6}
        />
        <QuestionSelectOption
          title={'Escolaridade'}
          data={escolaridade}
          value={question7}
          setValue={setQuestion7}
        />
        <QuestionSelectOption
          title={'Etnia'}
          data={etnia}
          value={question8}
          setValue={setQuestion8}
        />

        <Divider />
        <Text category='h5'>Informações adicionais</Text>
        <QuestionSelectOption
          title={'Tem dores de cabeça frequentes?'}
          data={opcao}
          value={question9}
          setValue={setQuestion9}
        />
        <QuestionSelectOption
          title={'Tem falta de apetite?'}
          data={opcao}
          value={question10}
          setValue={setQuestion10}
        />
        <QuestionSelectOption
          title={'Dorme mal?'}
          data={opcao}
          value={question11}
          setValue={setQuestion11}
        />
        <QuestionSelectOption
          title={'Assusta-se com facilidade?'}
          data={opcao}
          value={question12}
          setValue={setQuestion12}
        />
        <QuestionSelectOption
          title={'Tem tremores na mão?'}
          data={opcao}
          value={question13}
          setValue={setQuestion13}
        />
        <QuestionSelectOption
          title={'Sente-se nervoso(a), tenso(a) ou preocupado(a)?'}
          data={opcao}
          value={question14}
          setValue={setQuestion14}
        />
        <QuestionSelectOption
          title={'Tem má digestão?'}
          data={opcao}
          value={question15}
          setValue={setQuestion15}
        />
        <QuestionSelectOption
          title={'Tem dificuldade em pensar com clareza?'}
          data={opcao}
          value={question16}
          setValue={setQuestion16}
        />
        <QuestionSelectOption
          title={'Tem se sentido triste ultimamente?'}
          data={opcao}
          value={question17}
          setValue={setQuestion17}
        />
        <QuestionSelectOption
          title={'Tem chorado mais do que de costume?'}
          data={opcao}
          value={question18}
          setValue={setQuestion18}
        />
        <QuestionSelectOption
          title={'Encontra dificuldades para realizar com satisfação suas atividades diárias?'}
          data={opcao}
          value={question19}
          setValue={setQuestion19}
        />
        <QuestionSelectOption
          title={'Tem dificuldades para tomar decisões?'}
          data={opcao}
          value={question20}
          setValue={setQuestion20}
        />
        <QuestionSelectOption
          title={'Tem dificuldades no serviço (seu trabalho é penoso, lhe causa sofrimento)?'}
          data={opcao}
          value={question21}
          setValue={setQuestion21}
        />
        <QuestionSelectOption
          title={'É incapaz de desempenhar um papel útil em sua vida?'}
          data={opcao}
          value={question22}
          setValue={setQuestion22}
        />
        <QuestionSelectOption
          title={'Tem perdido o interesse pelas coisas?'}
          data={opcao}
          value={question23}
          setValue={setQuestion23}
        />
        <QuestionSelectOption
          title={'Você se sente uma pessoa inútil, sem préstimo?'}
          data={opcao}
          value={question24}
          setValue={setQuestion24}
        />
        <QuestionSelectOption
          title={'Tem tido a idéia de acabar com a vida?'}
          data={opcao}
          value={question25}
          setValue={setQuestion25}
        />
        <QuestionSelectOption
          title={'Sente-se cansado (a) o tempo todo?'}
          data={opcao}
          value={question26}
          setValue={setQuestion26}
        />
        <QuestionSelectOption
          title={'Tem sensações desagradáveis no estômago?'}
          data={opcao}
          value={question27}
          setValue={setQuestion27}
        />
        <QuestionSelectOption
          title={'Você se cansa com facilidade?'}
          data={opcao}
          value={question28}
          setValue={setQuestion28}
        />

        <Button style={styles.button} status='success' onPress={() => { handleSave() }} >Salvar</Button>

      </Layout>
    </ScrollView>
  );
};

const styles = StyleService.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 5,
    padding: 6,
  },
  input: {
    margin: 5,
    padding: 5,
    width: 370,
  },
  button: {
    padding: 20,
    width: 380,
  },
  select: {
    flex: 1,
    margin: 2,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  text: {
    margin: 10,
    fontSize: 15,
    padding: 10,
  },
});
