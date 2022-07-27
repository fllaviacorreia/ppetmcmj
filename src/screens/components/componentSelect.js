import React from 'react';
import { Select, SelectItem, Text } from '@ui-kitten/components';

import { styles } from './styles';

const QuestionSelectOption = ({ title, data, value, setValue }) => {
    return(
    <>
      <Text> {title} </Text>
      <Select
        value={data[value.row]}
        selectedIndex={value}
        onSelect={index => setValue(index)}
        size='medium'
        style={styles.input}
      >
        {data.map((title, id) => (
          <SelectItem key={id} title={title} />
        ))}
      </Select>
    </>

  );
}

export default QuestionSelectOption;
