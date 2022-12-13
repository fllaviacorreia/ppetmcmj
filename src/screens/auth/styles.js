import { StyleService } from '@ui-kitten/components';
import { StatusBar } from 'react-native';

export const styles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#AEBD91",
},
  layoutOut: {
    width: "100%",
    height: "100%",
    backgroundColor: "#AEBD91",
  },
  layoutIn:{    
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#AEBD91",
    marginHorizontal: 20,
  },
  layoutImage:{    
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 30,
    backgroundColor: "#AEBD91",
  },
  layoutButtonEsqueciSenha: {
    alignItems: 'flex-start',
    height:"30%",
    width:"135%",
    marginTop: 20,
    backgroundColor: "#AEBD91",
  },
  layoutButtonRegister: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: "#AEBD91",
  },
  tinyLogo: {
    width:200,
    height: 200,
  },
  button: {
    borderRadius:10,
    textAlign:"left",
    width: 250,
    marginTop:20,
  },
  input: {
    fontWeight: 300,
    
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text:{
    fontSize: 18,
    color:"black",
  },
});
