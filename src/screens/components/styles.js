import { StyleService } from '@ui-kitten/components';

export const styles = StyleService.create({
  input: {
    margin: 5,
    padding: 5,
    width: 370,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    margin: 10,
    fontSize: 15,
    padding: 10,
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
