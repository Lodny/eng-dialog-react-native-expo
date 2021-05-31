import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { getDateString, getDateStringArray, playSentence, stopSentence } from '../utils';
import * as FileSystem from 'expo-file-system';

import Header from '../components/Header';
import Title from '../components/Title';
import Sentence from '../components/Sentence';

// export const DialogContext = React.createContext();

// const Container = styled.ScrollView`
const Container = styled.View`
  flex: 1;
`;

function Dialog({ screenWidth, defaultCover }) {
  console.log('[MF] Dialog : screenWidth :', screenWidth);
  const [kor, setKor] = React.useState(true);
  const [cover, setCover] = React.useState(200);
  const [coverGap, setCoverGap] = React.useState(50);

  const [dialogs, setDialogs] = React.useState([]);
  const [currentDialog, setCurrentDialog] = React.useState(null);
  const [date, setDate] = React.useState(null);

  React.useEffect(() => {
    if (date) {
      console.log('Dialog : useEffect : dialogs.length :', dialogs.length);

      // if (currPlay) currPlay.play = false;

      setSound(null);
      setPlayIcon('');
      setCover(defaultCover);

      let shortDate = getDateString(date, '');
      console.log('Dialog : useEffect : date :', shortDate);

      let todayDialog = dialogs.find((dlg) => dlg?.date === shortDate);
      if (todayDialog) {
        setCurrentDialog(todayDialog);
      } else {
        getDialog(getDateString(date, '')).then((newDialog) => {
          console.log('Dialog : useEffect : newDialog === null :', newDialog === null);
          setCurrentDialog(newDialog);
          if (newDialog !== null) {
            setDialogs([...dialogs, newDialog]);
          }
        });
      }
    }
  }, [date]);

  // play mp3
  // ----------------------------------------------------------------------------------------
  const [currPlay, setCurrPlay] = React.useState(null);
  const [sound, setSound] = React.useState(null);
  const [playIcon, setPlayIcon] = React.useState('');

  function cbSound({ snd, didJustFinish, isLooping }) {
    if (snd) {
      console.log('Dialog : cbSound() : receive snd');
      setSound(snd);
    }

    if (didJustFinish) {
      console.log(`Dialog : cbSound() : didJustFinish = ${didJustFinish}, isLooping = ${isLooping}`);
      if (!isLooping) {
        setSound(null);
        setPlayIcon('');
        // setCurrPlay(null);
      }
    }
  }

  function onPressPlay(newPlay) {
    console.log(`Dialog : onPressPlay() : currPlay = ${currPlay}, newPlay = ${newPlay}`);

    if (!newPlay) return;

    if (currPlay) currPlay.play = false;

    if (!sound) {
      playSentence(newPlay.mp3, cbSound);
      setPlayIcon('🔉');
      newPlay.play = true;
      setCurrPlay(newPlay);
      return;
    }

    if (currPlay === newPlay) {
      if (playIcon === '🔉') {
        setPlayIcon('♾️');
        newPlay.play = true;
        setCurrPlay(newPlay);
        sound.setIsLoopingAsync(true).then((res) => {});
        return;
      }

      //if (currPlay.play === '♾️')
      // currPlay.play = false;
      setPlayIcon('');
      stopSentence(sound);
      setSound(null);
      return;
    }

    stopSentence(sound);
    setSound(null);
    // currPlay.play = false;
    setPlayIcon('🔉');
    newPlay.play = true;
    setCurrPlay(newPlay);
    playSentence(newPlay.mp3, cbSound);
  }

  // control
  // ----------------------------------------------------------------------------------------
  const onChangeDate = (newDate) => {
    console.log('Dialog : onChangeDate :', getDateString(date, ''), date, newDate);

    if (!newDate) return;

    if (date !== newDate) {
      setDate(newDate);
      setCover(0);
    }
  };
  const onChangeKor = () => {
    console.log('Dialog : onChangeKor');
    setKor(!kor);
  };
  const onChangeCover = (val) => {
    console.log('Dialog : onChangeCover :', cover, val);
    if (cover + val < 0) setCover(0);
    else if (cover + val > screenWidth) setCover(screenWidth);
    else setCover(cover + val);
  };
  const onChangeCoverGap = (gap) => {
    console.log('Dialog : onChangeCoverGap :', coverGap, gap);
    setCoverGap(gap);
  };
  const onChangeInitCover = (cover) => {
    // console.log('Dialog : onChangeInitCover :', coverInit, cover);
    // setCoverGap(gap);
  };

  return (
    // <DialogContext.Provider value={{ kor, date, onPressPlay }}>
    // <EngDialogContextProvider>
    <Container>
      <Header
        kor={kor}
        date={date}
        onChangeDate={onChangeDate}
        onChangeKor={onChangeKor}
        coverGap={50}
        onChangeCover={onChangeCover}
      />

      {currentDialog && <Title kor={kor} title={currentDialog.title} onPressPlay={onPressPlay} playIcon={playIcon} />}
      {currentDialog &&
        currentDialog.dialog.map((sentence, idx) => (
          <Sentence
            key={idx}
            kor={kor}
            cover={cover}
            sentence={sentence}
            idx={idx}
            onPressPlay={onPressPlay}
            playIcon={playIcon}
          />
        ))}
    </Container>
    // </EngDialogContextProvider>
  );
}
//  </DialogContext.Provider>
export default Dialog;

/* <Header
          onChangeDate={onChangeDate}
          onChangeKor={onChangeKor}
          onChangeCover={onChangeCover}
          coverInit={200}
          onChangeInitCover={onChangeInitCover}
          coverGap={coverGap}
          onChangeCoverGap={onChangeCoverGap}
        /> */
