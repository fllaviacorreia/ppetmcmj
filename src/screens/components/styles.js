import { StyleService } from '@ui-kitten/components';

export const styles = StyleService.create({
  containerComponent:{
    justifyContent:'flex-start', 
    marginTop: 10,
  },
  input: {
    margin: 5,
    padding: 5,
    width: 350,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    marginLeft: 10,
    fontSize: 15,
  },

  captionContainer:{
    fontSize: 20,
    color: 'grey',
  },

  mask: {
    borderWidth: 2,
    borderRadius: 6,
    width: '80%',
    padding: 12,
    color: 'black',
    fontSize: 20
      }
});
