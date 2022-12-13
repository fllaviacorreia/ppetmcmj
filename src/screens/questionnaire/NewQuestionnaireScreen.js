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
  const [message, setMessagem] = React.useState('');

  const database = firebase.firestore();

  //Para navegar para a Página inicial quando houver sucesso no cadastro.
  const navigation = useNavigation();
  const navigateHome = () => {
    navigation.navigate('Página inicial');
  };

  //Arrays para serem utilizados no Select 
  const sexoOpcoes = [
    "Selecione",
    "Feminino",
    "Masculino",];

  const escolaridadeOpcoes = [
    "Selecione",
    "Ensino Fundamental",
    "Ensino Médio",
    "Ensino Superior",
    "Não sabe ler e/ou escrever",
    "Prefiro não responder"];

  const etniaOpcoes = [
    "Selecione",
    "Branca",
    "Parda",
    "Preta",
    "Amarela",
    "Prefiro não responder"];

  const rendaMensalOpcoes = [
    "Selecione",
    "Até 1 salário mínimo",
    "De 2 a 3 salários mínimos",
    "Mais de 3 salários mínimos",
    "Prefiro não responder"];

    const situacaoConjugalOpcoes = [
      "Selecione",
      "Solteiro",
      "Casado",
      "Separado ou divorciado",
      "Viúvo",
      "Prefiro não responder"];


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

  const [nomeCompleto, setNomeCompleto] = React.useState('');
  const [socialName, setSocialName] = React.useState('');
  const [dataNascimento, setDataNascimento] = React.useState(new Date());
  const [telefone, setTelefone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [rendaMensal, setRendaMensal] = React.useState(new IndexPath(0));
  const [sexo, setSexo] = React.useState(new IndexPath(0));
  const [escolaridade, setEscolaridade] = React.useState(new IndexPath(0));
  const [etnia, setEtnia] = React.useState(new IndexPath(0));
  const [situacaoConjugal, setSituacaoConjugal] = React.useState(new IndexPath(0));
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
    if (nomeCompleto !== "") {
      const dateDay = new Date();
      const birth = dateDay.getFullYear - dataNascimento.getFullYear
      if (birth >= 18) {
        if (telefone !== "") {
          if (email !== "") {
            if (rendaMensal.row !== 0
              && sexo.row !== 0
              && escolaridade.row !== 0
              && etnia.row !== 0
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
    <Message operation={() => setVisible(false)} />
    return false;
  }

  const Message = (props) => (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}>
      <Card disabled={true}>
        <Text style={styles.text}>{message}</Text>
        <Button onPress={props.operation}>
          OK
        </Button>
      </Card>
    </Modal>
  );

  function getResultSRQ(){
    const arr = [];
    arr.push(question9.row)
    arr.push(question10.row)
    arr.push(question11.row)
    arr.push(question12.row)
    arr.push(question13.row)
    arr.push(question14.row)
    arr.push(question15.row)
    arr.push(question16.row)
    arr.push(question17.row)
    arr.push(question18.row)
    arr.push(question19.row)
    arr.push(question20.row)
    arr.push(question21.row)
    arr.push(question22.row)
    arr.push(question23.row)
    arr.push(question24.row)
    arr.push(question25.row)
    arr.push(question26.row)
    arr.push(question27.row)
    arr.push(question28.row)

    let sum = 0
    console.log(arr);
    for(let i = 0; i < arr.length; i++){
      if(arr[i] === 1)
        sum++
    }

    console.log(sum)
    if(sum > 6)
      return "\nA partir das respostas ocorreu acusamento de sofrimento mental. \nRecomenda-se buscar tratamento especializado.";
    else
      return "\nA partir das respostas não ocorreu acusamento de sofrimento mental.";
    
  }
  function handleSave() {
    if (true) {
      database.collection("Questionario").add({
        nome_completo: nomeCompleto,
        nome_social: socialName,
        data_nascimento: dataNascimento.toLocaleDateString("pt-BR"),
        telefone: telefone,
        email: email,
        renda_mensal: rendaMensal.row,
        sexo: sexo.row,
        escolaridade: escolaridade.row,
        etnia: etnia.row,
        situacao_conjugal: situacaoConjugal.row,
        question1: question9.row,
        question2: question10.row,
        question3: question11.row,
        question4: question12.row,
        question5: question13.row,
        question6: question14.row,
        question7: question15.row,
        question8: question16.row,
        question9: question17.row,
        question10: question18.row,
        question11: question19.row,
        question12: question20.row,
        question13: question21.row,
        question14: question22.row,
        question15: question23.row,
        question16: question24.row,
        question17: question25.row,
        question18: question26.row,
        question19: question27.row,
        question20: question28.row,
        user_id: userID,
        data_cadastro: (new Date()).toLocaleDateString("pt-BR")
      });
      const resultado = getResultSRQ();
      setMessagem("Questionário cadastrado com sucesso!"+resultado);
      console.log(message)
      setVisible(true);
    //  <Message operation={() => navigateHome} />

    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Divider />
      <Layout style={styles.layout}>
        <Text category='h5'>Dados pessoais</Text>
        <QuestionText
          title={'Nome completo *'}
          placeholder={'ex. Maria da Silva'}
          value={nomeCompleto}
          setText={newValue => setNomeCompleto(newValue)}
          type="default"
        />

        <QuestionText
          title={'Nome social'}
          value={socialName}
          setText={newValue => setSocialName(newValue)}
          type="default"
        />

        <QuestionDate
          title={'Data de nascimento *'}
          value={dataNascimento}
          setText={newValue => setDataNascimento(newValue)}
        />
                
        <QuestionSelectOption
          title={'Sexo *'}
          data={sexoOpcoes}
          value={sexo}
          setValue={setSexo}
        />
        <QuestionSelectOption
          title={'Situação conjugal *'}
          data={situacaoConjugalOpcoes}
          value={situacaoConjugal}
          setValue={setSituacaoConjugal}
        />
        <QuestionSelectOption
          title={'Escolaridade *'}
          data={escolaridadeOpcoes}
          value={escolaridade}
          setValue={setEscolaridade}
        />
        <QuestionSelectOption
          title={'Etnia *'}
          data={etniaOpcoes}
          value={etnia}
          setValue={setEtnia}
        />

        <QuestionSelectOption
          title={'Renda mensal (R$) *'}
          data={rendaMensalOpcoes}
          value={rendaMensal}
          setValue={setRendaMensal}
        />

        <QuestionText
          title={'Telefone *'}
          placeholder="ex. (73) 9 0000-000"
          value={telefone}
          setText={newValue => setTelefone(maskPhone(newValue))}
          type="numeric"
        />
        <QuestionText
          title={'E-mail *'}
          placeholder={'ex. example@example.com'}
          value={email}
          setText={newValue => setEmail(newValue)}
          type="email-address"
        />

        <Divider />
        <Text category='h5'>Informações adicionais</Text>
        <QuestionSelectOption
          title={'Tem dores de cabeça frequentes? *'}
          data={opcao}
          value={question9}
          setValue={setQuestion9}
        />
        <QuestionSelectOption
          title={'Tem falta de apetite? *'}
          data={opcao}
          value={question10}
          setValue={setQuestion10}
        />
        <QuestionSelectOption
          title={'Dorme mal? *'}
          data={opcao}
          value={question11}
          setValue={setQuestion11}
        />
        <QuestionSelectOption
          title={'Assusta-se com facilidade? *'}
          data={opcao}
          value={question12}
          setValue={setQuestion12}
        />
        <QuestionSelectOption
          title={'Tem tremores na mão? *'}
          data={opcao}
          value={question13}
          setValue={setQuestion13}
        />
        <QuestionSelectOption
          title={'Sente-se nervoso(a), tenso(a) ou preocupado(a)? *'}
          data={opcao}
          value={question14}
          setValue={setQuestion14}
        />
        <QuestionSelectOption
          title={'Tem má digestão? *'}
          data={opcao}
          value={question15}
          setValue={setQuestion15}
        />
        <QuestionSelectOption
          title={'Tem dificuldade em pensar com clareza? *'}
          data={opcao}
          value={question16}
          setValue={setQuestion16}
        />
        <QuestionSelectOption
          title={'Tem se sentido triste ultimamente? *'}
          data={opcao}
          value={question17}
          setValue={setQuestion17}
        />
        <QuestionSelectOption
          title={'Tem chorado mais do que de costume? *'}
          data={opcao}
          value={question18}
          setValue={setQuestion18}
        />
        <QuestionSelectOption
          title={'Encontra dificuldades para realizar com satisfação suas atividades diárias? *'}
          data={opcao}
          value={question19}
          setValue={setQuestion19}
        />
        <QuestionSelectOption
          title={'Tem dificuldades para tomar decisões? *'}
          data={opcao}
          value={question20}
          setValue={setQuestion20}
        />
        <QuestionSelectOption
          title={'Tem dificuldades no serviço (seu trabalho é penoso, lhe causa sofrimento)? *'}
          data={opcao}
          value={question21}
          setValue={setQuestion21}
        />
        <QuestionSelectOption
          title={'É incapaz de desempenhar um papel útil em sua vida? *'}
          data={opcao}
          value={question22}
          setValue={setQuestion22}
        />
        <QuestionSelectOption
          title={'Tem perdido o interesse pelas coisas? *'}
          data={opcao}
          value={question23}
          setValue={setQuestion23}
        />
        <QuestionSelectOption
          title={'Você se sente uma pessoa inútil, sem préstimo? *'}
          data={opcao}
          value={question24}
          setValue={setQuestion24}
        />
        <QuestionSelectOption
          title={'Tem tido a idéia de acabar com a vida? *'}
          data={opcao}
          value={question25}
          setValue={setQuestion25}
        />
        <QuestionSelectOption
          title={'Sente-se cansado (a) o tempo todo? *'}
          data={opcao}
          value={question26}
          setValue={setQuestion26}
        />
        <QuestionSelectOption
          title={'Tem sensações desagradáveis no estômago? *'}
          data={opcao}
          value={question27}
          setValue={setQuestion27}
        />
        <QuestionSelectOption
          title={'Você se cansa com facilidade? *'}
          data={opcao}
          value={question28}
          setValue={setQuestion28}
        />
        <Button style={styles.button} status='success' onPress={() => { handleSave() }} >Salvar</Button>

      </Layout>

      <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}>
      <Card disabled={true}>
        <Text style={styles.text}>{message}</Text>
        <Button onPress={navigateHome}>
          OK
        </Button>
      </Card>
    </Modal>
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
