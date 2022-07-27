import React from 'react';
import {
  Text,
  Input,
} from '@ui-kitten/components';

import { styles } from './styles';

const QuestionText = ({ title, placeholder, value, setText, type }) => {
  return (
    <>
      <Text> {title} </Text>
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={setText}
        size='medium'
        style={styles.input}
        keyboardType={type}
      />
    </>
  );
}

export default QuestionText ;