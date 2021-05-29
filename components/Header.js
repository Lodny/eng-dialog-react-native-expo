import * as React from 'react';
import { View, Text, Button, CheckBox } from 'react-native';
import styled from 'styled-components/native';
// import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

import { addDays, getDateString, getDateStringWithDay } from '../Utils';
import { EngDialogContext } from '../store';
import useSwipe from './useSwipe';

// styled
// -----------------------------------------------------------------------------------
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 0;
`;
const SubContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
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
  padding: 0 2px;
`;

// Function
// -----------------------------------------------------------------------------------
function Header({ kor, date, onChangeDate, onChangeKor, coverGap, onChangeCover }) {
  // const { kor, date } = React.useContext(EngDialogContext);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipe);

  console.log('Header : date = ', date);

  function onSwipe(gapX) {
    const DEFAULT_GAP = 20;
    console.log(`Header : onSwipe(${gapX}) : DEFAULT_GAP = ${DEFAULT_GAP}`);

    if (gapX < -DEFAULT_GAP) {
      console.log('Header : Left Swipe');
      onChangeDate(addDays(date, 1));
    } else if (gapX > DEFAULT_GAP) {
      console.log('Header : Right Swipe');
      onChangeDate(addDays(date, -1));
    } else {
      setShowCalendar(true);
    }
  }

  // functoin
  // -------------------------------------------------------------
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
          {/* <Button title='<<' onPress={() => onChangeDate(addDays(date, -1))} /> */}
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
          <ContentText onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {getDateStringWithDay(date)}
          </ContentText>
          {/* <Button title='>>' onPress={() => onChangeDate(addDays(date))} /> */}
        </SubContainer>
        <SubContainer>
          <Button title='<<' onPress={() => onChangeCover(-coverGap)} />
          <ContentText>{'All Cover'}</ContentText>
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

/*
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
        </SliderContainer> 
*/

export default Header;
