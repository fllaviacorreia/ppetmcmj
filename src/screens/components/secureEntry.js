import React from 'react';
import { Icon, Input, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './styles';


export default function secureEntry(props) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        <Text>{}</Text>
      </View>
    );
  };

  return (
    <View style={styles.containerComponent}>
      <Text style={styles.text}>
        {props.label}
      </Text>
        <Input
          value={props.value}
          caption={props.textRenderCaption}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => props.setValue(nextValue)}
          size='medium'
          style={styles.input} />
      </View>

      );

}
