import React from 'react';
import { Modal, StyleService, Card, Button, Text} from '@ui-kitten/components';

import { styles } from './styles';
export default function secureEntry(props) {    
  const [visible, setVisible] = React.useState(props.visible);
    
    return(
        <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text style={styles.text}>{props.message}</Text>
          <Button onPress={() => setVisible(false)}>
            OK
          </Button>
        </Card>
      </Modal>
    );

} 
