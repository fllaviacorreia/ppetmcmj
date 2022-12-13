import React from 'react';
import {
  Text,
  Input,
} from '@ui-kitten/components';

import { View } from 'react-native';
import { styles } from './styles';

const QuestionText = ({ title, placeholder, value, setText, type }) => {
  return (
    <View style={styles.containerComponent}>
      <Text style={styles.text}> {title} </Text>
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={setText}
        size='medium'
        style={styles.input}
        keyboardType={type}
      />
    </View>
  );
}

export default QuestionText ;