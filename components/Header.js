import * as React from 'react';
import { View, Text, Button, CheckBox } from 'react-native';
import styled from 'styled-components/native';
// import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

import { addDays, getDateString, getDateStringWithDay } from '../Utils';
// import { DialogContext } from '../pages/Dialog';
import { EngDialogContext } from '../store';

// styled
// -----------------------------------------------------------------------------------
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 0;
`;
const SubContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
`;
// const SliderContainer = styled.View`
//   align-items: center;
//   padding: 0 10px 0 0;
// `;
const SlideText = styled.Text`
  margin: 0 0 -15px 0;
  font-weight: bold;
`;
const OptionContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px;
`;
const ContentText = styled.Text`
  font-size: 20px;
  padding: 0 10px;
`;

// main
// -----------------------------------------------------------------------------------
// function Header({
//   onChangeDate,
//   onChangeKor,
//   onChangeCover,
//   coverInit,
//   onChangeInitCover,
//   coverGap,
//   onChangeCoverGap,
// }) {
function Header({ kor, date, onChangeDate, onChangeKor, onChangeCover }) {
  // const { kor, date } = React.useContext(EngDialogContext);
  const [showCalendar, setShowCalendar] = React.useState(false);
  console.log('Header : date = ', date);

  // functoin
  // -------------------------------------------------------------
  React.useEffect(() => {
    // getDateString(date);
  }, []);

  const onChange = (event, selectedDate) => {
    console.log('Header : ', selectedDate, date, selectedDate == date);
    if (selectedDate == date) return;

    const currentDate = selectedDate || date;
    console.log('Header : ', getDateString(currentDate));

    setShowCalendar(false);
    onChangeDate(currentDate);
  };

  // render
  // -------------------------------------------------------------
  return (
    <View>
      <Container>
        <SubContainer>
          <Button title='<<' onPress={() => onChangeDate(addDays(date, -1))} />
          {showCalendar && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode='date'
              is24Hour={true}
              display='default'
              onChange={onChange}
            />
          )}
          <ContentText
            onPress={() => {
              setShowCalendar(true);
            }}
          >
            {getDateStringWithDay(date)}
          </ContentText>
          <Button title='>>' onPress={() => onChangeDate(addDays(date))} />
        </SubContainer>
        <SubContainer>
          <Button title='<<' onPress={() => onChangeCover(-coverGap)} />
          <ContentText>{'All'}</ContentText>
          <Button title='>>' onPress={() => onChangeCover(coverGap)} />
        </SubContainer>
        <SubContainer>
          <CheckBox value={kor} onValueChange={onChangeKor} />
          <Text onPress={onChangeKor}> Show KOR</Text>
        </SubContainer>
      </Container>
    </View>
  );
}

// minimumTrackTintColor="#FFFFFF"
// maximumTrackTintColor="#000000"
// <OptionContainer>
// </OptionContainer>
/* <SliderContainer>
          <SlideText>Init Cover : {coverInit}</SlideText>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={800}
            value={coverInit}
            step={50}
            onValueChange={onChangeInitCover}
          />
        </SliderContainer>
        <SliderContainer>
          <SlideText>Cover Gap : {coverGap}</SlideText>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={10}
            maximumValue={100}
            value={50}
            step={10}
            onValueChange={onChangeCoverGap}
          />
        </SliderContainer> */

export default Header;
