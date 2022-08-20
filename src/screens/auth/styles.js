import { StyleService } from '@ui-kitten/components';

export const styles = StyleService.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: "#AEBD91",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
  },
  textOption: {
    fontSize: 15,
    color: 'black',
    padding: 7,
  },
  tinyLogo: {
    marginTop:10,
    width: 150,
    height: 150,
  },
  button: {
    margin: 10,
    padding: 5,
    borderRadius:10,
    width: 200,
  },
  input: {
    width: "100%",
    fontWeight: 300,
    marginBottom:5,
    
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text:{
    fontSize: 18,
    color:"black",
    marginTop:5,
  },
});
