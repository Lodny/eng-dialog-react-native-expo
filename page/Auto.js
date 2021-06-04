import React from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import * as FileSystem from 'expo-file-system';

import { DialogContext } from '../store';
import { getDateString, addDays, getDateStringArray, playSentence, stopSentence, createSound } from '../utils';
import AutoDialog from '../components/AutoDialog';
import NaviAuto from '../navi/NaviAuto';

// styled
// ---------------------------------------------------------------------------------
const Container = styled.View`
  ${'' /* background-color: #f0f0f0; */}
  ${'' /* padding: 5px 0 0 0; */}
`;
const ControlContainer = styled.View`
  background-color: #eee;
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

  const [sound, setSound] = React.useState(null);
  const [loop, setLoop] = React.useState(0);

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
      // console.log(`Auto : useEffect([date]) : dlg?.date = ${dlg?.date}, repeat = ${repeat}`);
      if (dlg) {
        setDialog(dlg);
        // setSound(createSound(dlg.title.mp3, onPlaybackStatusUpdate, true));
        setSound(createSound(dlg.dialog[2].mp3, onPlaybackStatusUpdate, true));
        setLoop(repeat);
        console.log(`Auto : useEffect([date]) : dlg?.date = ${dlg?.date}, repeat = ${repeat}`);
      }

      // playSentence(dlg.title.mp3, cbSound);
      // playSentence(dlg.dialog[0].mp3, cbSound);
    }
  }, [date]);

  React.useEffect(() => {
    if (sound) {
      console.log(`Auto : useEffect([sound]) : sound=${sound != null}`);
    }
  }, [sound]);

  // event handler
  // ---------------------------------------------------------------------------------
  // _onPlaybackStatusUpdate = status => {
  //   if (status.isLoaded) {
  //     this.setState({
  //       playbackInstancePosition: status.positionMillis,
  //       playbackInstanceDuration: status.durationMillis,
  //       shouldPlay: status.shouldPlay,
  //       isPlaying: status.isPlaying,
  //       isBuffering: status.isBuffering,
  //       rate: status.rate,
  //       muted: status.isMuted,
  //       volume: status.volume,
  //       loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
  //       shouldCorrectPitch: status.shouldCorrectPitch
  //     });
  //     if (status.didJustFinish && !status.isLooping) {
  //       this._advanceIndex(true);
  //       this._updatePlaybackInstanceForIndex(true);
  //     }
  //   } else {
  //     if (status.error) {
  //       console.log(`FATAL PLAYER ERROR: ${status.error}`);
  //     }
  //   }
  // };

  function onPlaybackStatusUpdate({ isLoaded, isPlaying, didJustFinish, isLooping, error }) {
    console.log(
      `Auto : onPlaybackStatusUpdate : isLoaded=${isLoaded}, isPlaying=${isPlaying}, didJustFinish=${didJustFinish}, isLooping=${isLooping}`
    );

    if (isLoaded && !isPlaying) {
      console.log(`Auto : isLoaded=${isLoaded}, isPlaying=${isPlaying}, sound=${sound != null} : playAsync()`);
      // sound.playAsync();
    }

    // if (snd) {
    //   console.log('Dialog : cbSound() : receive snd');
    //   setSound(snd);
    //   snd.setIsLoopingAsync(true).then(() => {});
    // }

    // if (didJustFinish) {
    //   console.log(
    //     `Dialog : cbSound() : sound===null(${
    //       sound === null
    //     }), didJustFinish = ${didJustFinish}, isLooping = ${isLooping}, loop = ${loop}`
    //   );
    //   if (loop <= 1) {
    //     sound.setIsLoopingAsync(true).then(() => {});
    //     // await sound.stopAsync();
    //     // await sound.unloadAsync();
    //     // setSound(null);
    //   } else {
    //     // await sound.playAsync();
    //     console.log('call setLoop');
    //     setLoop(loop - 1);
    //   }
    // }
  }

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
    console.log(`${getDateString(from, '')} ~ ${getDateString(to, '')}, repeat = ${repeat}, null = ${sound === null}`);

    if (sound) {
      sound.stopAsync().then(() => {});
      setSound(null);
      // await sound.unloadAsync();
      return;
    }

    if (from > to) return;

    const dateArray = getDateStringArray(from, to, '', [0]);
    setDateArray(dateArray);
    // const uriArray = dateArray.map((date) => `${FileSystem.documentDirectory}${date}/${date}_all.mp3`);
  };

  // JSX
  // ---------------------------------------------------------------------------------
  return (
    <Container>
      <NaviAuto />
      <ControlContainer>
        <RowContainer>
          {show && (
            <DateTimePicker value={curr} mode='date' is24Hour={true} display='default' onChange={onChangeDate} />
          )}
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
      </ControlContainer>
      <AutoDialog dialog={dialog} />
    </Container>
  );
}

export default Auto;
