import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { DialogContext } from '../store';
import { getDateString, addDays } from '../utils';

// styled
// ---------------------------------------------------------------------------------
const Container = styled.View`
  background-color: #f0f0f0;
`;
const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
`;
const DateText = styled.Text`
  font-size: 18px;
  ${'' /* font-weight: bold; */}
  padding: 0 40px;
`;
// const DateButton = styled.Button`
//   padding: 0 20px;
// `;
// const NaviButton = styled.Button`
//   background-color: #aaa;
//   color: red;
// `;

// main
// ---------------------------------------------------------------------------------
function NaviDialog() {
  const { store, dispatch } = React.useContext(DialogContext);
  const { currDate } = store;

  const [show, setShow] = React.useState(false);

  // event handler
  // ---------------------------------------------------------------------------------
  const onPressPrev = () => {
    const newDate = addDays(currDate, -1);
    dispatch({ type: 'SET_CURR_DATE', payload: newDate });
  };
  const onPressNext = () => {
    const newDate = addDays(currDate, 1);
    dispatch({ type: 'SET_CURR_DATE', payload: newDate });
  };

  const onPressDate = () => {
    setShow(true);
  };

  const onChangeDate = (event, selected) => {
    console.log(`NaviDialog : onChangeDate : show = ${show}, selected = ${selected}, currDate = ${currDate}`);

    if (selected == currDate) return;

    dispatch({ type: 'SET_CURR_DATE', payload: selected });
    setShow(false);
  };

  const onPressSleepMode = () => {
    dispatch({ type: 'SET_PAGE', payload: 'sleep' });
  };

  // JSX
  // ---------------------------------------------------------------------------------
  return (
    <RowContainer>
      {show && (
        <DateTimePicker value={currDate} mode='date' is24Hour={true} display='default' onChange={onChangeDate} />
      )}
      <RowContainer>
        <Button onPress={onPressPrev} title='<<<' />
        <DateText onPress={onPressDate}>{getDateString(currDate)}</DateText>
        <Button onPress={onPressNext} title='>>>' />
      </RowContainer>
      <RowContainer>
        <Button onPress={onPressSleepMode} title='Sleep >' />
      </RowContainer>
    </RowContainer>
  );
}

export default NaviDialog;
