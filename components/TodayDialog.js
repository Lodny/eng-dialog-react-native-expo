import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';
import * as FileSystem from 'expo-file-system';

import { getDateString, getDateStringArray, playSentence, stopSentence } from '../utils';
// import Header from '../components/Header';
// import Title from '../components/Title';
import Sentence from '../components/Sentence';
import Entry from '../components/Entry';

const Container = styled.View`
  padding: 2px 0;
`;
// height: 160px;
// flex: 1;
const SubContainer = styled.ScrollView`
  padding: 3px 0 0 0;
  border-width: 1px;
  border-color: red;
`;
// background-color: #aaa;
// border-top: 2px solid red;

function TodayDialog({ dialog, kor, allCover }) {
  // console.log(`TodayDialog : screenWidth = ${screenWidth}, dialog.title.date = ${dialog?.title?.date}`);

  // const [cover, setCover] = React.useState(200);

  React.useEffect(() => {
    console.log(
      `TodayDialog : useEffect : dialog.title.date = ${dialog?.title?.date}, kor = ${kor}, allCover = ${allCover}`
    );
    //setCover(allCover);
  }, []);

  function onPressPlay(newPlay) {
    console.log(`Dialog : onPressPlay() : currPlay = ${currPlay}, newPlay = ${newPlay}`);

    // if (!newPlay) return;

    // if (currPlay) currPlay.play = false;

    // if (!sound) {
    //   playSentence(newPlay.mp3, cbSound);
    //   setPlayIcon('🔉');
    //   newPlay.play = true;
    //   setCurrPlay(newPlay);
    //   return;
    // }

    // if (currPlay === newPlay) {
    //   if (playIcon === '🔉') {
    //     setPlayIcon('♾️');
    //     newPlay.play = true;
    //     setCurrPlay(newPlay);
    //     sound.setIsLoopingAsync(true).then((res) => {});
    //     return;
    //   }

    //   //if (currPlay.play === '♾️')
    //   // currPlay.play = false;
    //   setPlayIcon('');
    //   stopSentence(sound);
    //   setSound(null);
    //   return;
    // }

    // stopSentence(sound);
    // setSound(null);
    // // currPlay.play = false;
    // setPlayIcon('🔉');
    // newPlay.play = true;
    // setCurrPlay(newPlay);
    // playSentence(newPlay.mp3, cbSound);
  }

  return (
    <Container>
      {/* {dialog && <Title kor={kor} title={dialog.title} onPressPlay={onPressPlay} playIcon={playIcon} />} */}
      {/* {dialog && <Title kor={true} title={dialog.title} onPressPlay={onPressPlay} />} */}
      {/* {dialog && <Title kor={true} title={dialog.title} onPressPlay={onPressPlay} />} */}
      {dialog &&
        dialog.dialog.map((sentence, idx) => (
          <Sentence
            key={idx}
            kor={kor}
            cover={allCover}
            sentence={sentence}
            idx={idx}
            onPressPlay={onPressPlay}
            // playIcon={playIcon}
          />
        ))}
      <Container>
        <SubContainer>
          {dialog && dialog.entrys?.map((entry, idx) => <Entry key={idx} entry={entry} idx={idx} kor={kor} />)}
        </SubContainer>
      </Container>
      {!dialog && <Text>No data</Text>}
    </Container>
  );
}

export default TodayDialog;
