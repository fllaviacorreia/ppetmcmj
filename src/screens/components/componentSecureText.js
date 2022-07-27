import { StyleService, } from '@ui-kitten/components';

export const styles = StyleService.create({
    captionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    captionIcon: {
      width: 10,
      height: 10,
      marginRight: 5
    },
    captionText: {
      fontSize: 12,
      fontWeight: "400",
      color: "#8F9BB3",
    }, 
    input: {
      width: "100%",
      marginTop: 15,
      fontWeight: 300,
    },
  });