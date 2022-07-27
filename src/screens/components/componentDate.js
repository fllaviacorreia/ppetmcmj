import React from 'react';
import { Datepicker, Text, Icon } from '@ui-kitten/components';
import { styles } from './styles';

const minDatePossible = new Date("01/01/1950");
// const maxDatePossible = new Date("01/01/2003");
// console.log(minDatePossible); //1950-01-01T03:00:00.000Z

const CalendarIcon = (props) => (
    <Icon {...props} name='calendar' />
);

const QuestionDate = ({ title, value, setText }) => {
    return (
        <>
            <Text> {title} </Text>
            <Datepicker
                date={value}
                onSelect={nextDate => setText(nextDate)}
                accessoryRight={CalendarIcon}
                min={minDatePossible}
                // max={maxDatePossible}
                size='medium'
                style={styles.input}
            />
        </>
    );
}

export default QuestionDate;
