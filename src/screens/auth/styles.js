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
    justifyContent: "flex-start",
    padding: 10,
    marginTop: 10,
  },
  textOption: {
    fontSize: 15,
    color: 'black',
    padding: 7,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  button: {
    margin: 20,
    padding: 10,
    borderRadius:10,
    width: 200,
  },
  input: {
    width: "100%",
    fontWeight: 300,
    marginTop: 5,
    
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text:{
    margin: 10,
    fontSize: 18,
    padding: 10,
    color:"black"
  },
});
