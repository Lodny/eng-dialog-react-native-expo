import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { getDateString, getDateStringArray, playSentence, stopSentence } from '../utils';
import * as FileSystem from 'expo-file-system';

const Container = styled.View`
  backgroundcolor: '#c8c8c8';
  height: 200px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const ContentText = styled.Text`
  font-size: 20px;
  padding: 3px 5px;
`;

const SliderContainer = styled.View`
  align-items: center;
  padding: 0 10px 0 0;
`;
const SlideText = styled.Text`
  margin: 0 0 -15px 0;
  font-weight: bold;
`;

const onPressFromDate = () => {};

const onPressToDate = () => {};

//   const [fromDate, setFromDate] = React.useState(new Date());
//   const [toDate, setToDate] = React.useState(new Date());
//   const [nightPlayTimes, setNightPlayTimes] = React.useState(5);

//   const onPressFromDate = () => {
//     setCalendarDate(fromDate);
//     setShowCalendar(2);
//   };

//   const onPressToDate = () => {
//     setCalendarDate(toDate);
//     setShowCalendar(3);
//   };

// const onChangeNightPlayTimes = (value) => {
//   console.log(`Header : onChangeNightPlayTimes : value = ${value}`);
//   setNightPlayTimes(value);
// };

// const onPressNightPlay = () => {
//   console.log(
//     `fromDate = ${getDateString(fromDate)} ~ toDate = ${getDateString(toDate)}, nightPlayTimes = ${nightPlayTimes}`
//   );

//   onPressNightPlay();
// };

// const onChange = (event, selectedDate) => {
//   console.log('Header : ', showCalendar, selectedDate, date, selectedDate == date);

//   if (selectedDate == date) return;

//   // console.log('Header : ', getDateString(currentDate));

//   if (showCalendar === 1) onChangeDate(selectedDate || date);
//   else if (showCalendar === 2) setFromDate(selectedDate || fromDate);
//   else if (showCalendar === 3) setToDate(selectedDate || toDate);

//   setShowCalendar(0);
// };

function PlayDialog(props) {
  return (
    <Container>
      {showCalendar > 0 && (
        <DateTimePicker
          // testID='dateTimePicker'
          value={calendarDate}
          mode='date'
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
      <ContentText onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {getDateStringWithDay(date)}
      </ContentText>
      <RowContainer>
        <ContentText onPress={onPressFromDate}>{getDateString(fromDate)}</ContentText>
        <Text>{'~'}</Text>
        <ContentText onPress={onPressToDate}>{getDateString(toDate)}</ContentText>
      </RowContainer>
      <RowContainer>
        {/* <Button onPress={() => onPressNightPlay({ fromDate, toDate, nightPlayTimes })} title='Play' /> */}
        <Button onPress={() => {}} title='Play' />
        {/* <SliderContainer>
          <SlideText>Repeat : {nightPlayTimes}</SlideText>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={1}
            maximumValue={10}
            value={nightPlayTimes}
            step={1}
            onValueChange={onChangeNightPlayTimes}
          />
        </SliderContainer> */}
      </RowContainer>
    </Container>
  );
}

export default PlayDialog;

// onPressNightPlay={onPressNightPlay}
// night play
// ---------------------------------------------------------------------------
// const {cbPlayDialogControll} = usePlayDialog({ fromDate, toDate, playTimes, cbPlayDialogInfo });
// const onPressNightPlay = (nightProps) => {
//   const { fromDate, toDate, nightPlayTimes } = nightProps;
//   console.log(
//     `Dialog : onPressNightPlay : fromDate = ${getDateString(fromDate)} ~ toDate = ${getDateString(
//       toDate
//     )}, nightPlayTimes = ${nightPlayTimes}`
//   );

//   const dateArray = getDateStringArray(fromDate, toDate);
//   setNightDates(dateArray);
//   // .then(() => playDialog());
//   // console.log(dateArray);

//   // playSentence(newPlay.mp3, cbSoundNight);
// };
