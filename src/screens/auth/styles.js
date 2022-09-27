import { StyleService } from '@ui-kitten/components';

export const styles = StyleService.create({
  layoutOut: {
    flex:1,
    width:"100%",
    height:"100%",
    backgroundColor: "#AEBD91", 
  },
  layoutIn:{    
    alignItems:"center",
    justifyContent: 'center',
    margin: 20,
    backgroundColor: "#AEBD91",
    height:"45%",
  },
  layoutImage:{    
    alignItems:"center",
    justifyContent: 'center',
    marginBottom: 50,
    backgroundColor: "#AEBD91",
    height:"30%",
  },

  layoutButtonEsqueciSenha: {
    alignItems: 'flex-start',
    height:"30%",
    width:"135%",
    marginTop: 20,
    backgroundColor: "#AEBD91",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop:"15%",
    padding:10,
    backgroundColor: "#AEBD91",

  },
  textOption: {
    fontSize: 15,
    color: 'black',
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginBottom:30,
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
