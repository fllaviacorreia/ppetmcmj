import React from 'react';
import { Datepicker, Text, Icon } from '@ui-kitten/components';
import { styles } from './styles';
import { View } from 'react-native';

const minDatePossible = new Date("01/01/1950");
// const maxDatePossible = new Date("01/01/2003");
// console.log(minDatePossible); //1950-01-01T03:00:00.000Z

const CalendarIcon = (props) => (
    <Icon {...props} name='calendar' />
);

const QuestionDate = ({ title, value, setText }) => {
    return (        
        <View style={styles.containerComponent}>
             <Text style={styles.text}> {title} </Text>
            <Datepicker
                date={value}
                onSelect={nextDate => setText(nextDate)}
                accessoryRight={CalendarIcon}
                min={minDatePossible}
                // max={maxDatePossible}
                size='medium'
                style={styles.input}
            />
        </View>
    );
}

export default QuestionDate;
