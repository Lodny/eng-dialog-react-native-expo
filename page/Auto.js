import React from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import * as FileSystem from 'expo-file-system';

import { DialogContext } from '../store';
import { getDateString, addDays, getDateStringArray } from '../utils';
import AutoDialog from '../components/AutoDialog';

// styled
// ---------------------------------------------------------------------------------
const Container = styled.View`
  ${'' /* background-color: #f0f0f0; */}
  ${'' /* padding: 5px 0 0 0; */}
`;
const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
const DateText = styled.Text`
  font-size: 16px;
  padding: 0 5px;
`;
const SliderContainer = styled.View`
  align-items: center;
  padding: 0 10px 0 0;
`;
const SlideText = styled.Text`
  margin: 0 0 -10px 0;
  ${'' /* font-weight: bold; */}
`;

// main
// ---------------------------------------------------------------------------------
function Auto() {
  const { store } = React.useContext(DialogContext);

  const [from, setFrom] = React.useState(new Date());
  const [to, setTo] = React.useState(new Date());
  const [curr, setCurr] = React.useState(null);

  const [show, setShow] = React.useState(false);
  const [repeat, setRepeat] = React.useState(5);

  const [dateArray, setDateArray] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [dialog, setDialog] = React.useState(null);

  React.useEffect(() => {
    console.log(`Auto : useEffect([dateArray]) : `, dateArray);
    if (dateArray) {
      setDate(dateArray[0]);
    }
  }, [dateArray]);

  React.useEffect(() => {
    console.log(`Auto : useEffect([date]) : `, date);
    if (date) {
      const dlg = store.dialogs.find((dlg) => dlg?.date === date);
      console.log(dlg);
    }
  }, [date]);

  // event handler
  // ---------------------------------------------------------------------------------
  const onPressPrevNext = (date, add) => {
    const newDate = addDays(date, add);
    if (date === from) setFrom(newDate);
    if (date === to) setTo(newDate);
  };

  const onPressDate = (date) => {
    setCurr(date);
    setShow(true);
  };

  const onChangeDate = (event, selected) => {
    console.log(`NaviDialog : onChangeDate : show = ${show}, selected = ${selected}, curr = ${curr}`);

    setShow(false);
    if (!selected || selected == curr) return;

    if (curr === from) setFrom(selected);
    if (curr === to) setTo(selected);
  };

  const onChangeRepeat = (value) => {
    console.log(`Auto : onChangeRepeat : value = ${value}`);
    setRepeat(value);
  };

  // const onPressPlay = async () => {
  const onPressPlay = () => {
    console.log(`${getDateString(from, '')} ~ ${getDateString(to, '')}, repeat = ${repeat}`);

    const dateArray = getDateStringArray(from, to, '', [0]);
    setDateArray(dateArray);
    // const uriArray = dateArray.map((date) => `${FileSystem.documentDirectory}${date}/${date}_all.mp3`);
    // console.log(dateArray);
    // console.log(uriArray);

    // const uriArrayExisting = await uriArray.filter(async (uri) => {
    //   const { exists } = await FileSystem.getInfoAsync(uri);
    //   console.log(`exists=${exists} : ${uri}`);
    //   return exists;
    // });

    // console.log(uriArray);
    // console.log(uriArrayExisting);
  };

  // JSX
  // ---------------------------------------------------------------------------------
  return (
    <Container>
      <RowContainer>
        {show && <DateTimePicker value={curr} mode='date' is24Hour={true} display='default' onChange={onChangeDate} />}
        <RowContainer>
          <Button onPress={() => onPressPrevNext(from, -1)} title='<<<' />
          <DateText onPress={() => onPressDate(from)}>{getDateString(from)}</DateText>
          <Button onPress={() => onPressPrevNext(from, +1)} title='>>>' />
        </RowContainer>
        <Text>{'~'}</Text>
        <RowContainer>
          <Button onPress={() => onPressPrevNext(to, -1)} title='<<<' />
          <DateText onPress={() => onPressDate(to)}>{getDateString(to)}</DateText>
          <Button onPress={() => onPressPrevNext(to, +1)} title='>>>' />
        </RowContainer>
      </RowContainer>
      <RowContainer style={{ justifyContent: 'center' }}>
        <SliderContainer>
          <SlideText>Repeat : {repeat}</SlideText>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={1}
            maximumValue={10}
            value={repeat}
            step={1}
            onValueChange={onChangeRepeat}
          />
        </SliderContainer>
      </RowContainer>
      <RowContainer style={{ justifyContent: 'center' }}>
        <Button onPress={onPressPlay} title='Play automaitically' />
      </RowContainer>
      <AutoDialog />
    </Container>
  );
}

export default Auto;
