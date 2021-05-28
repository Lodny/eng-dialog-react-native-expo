import * as React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { readyPlayTouch, startPlayTouch, endPlayTouch } from '../Utils';

import EngDialogContext from '../store';
// import { DialogContext } from '../pages/Dialog';
// import { playSentence } from '../Utils';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;
const TextContainer = styled.View`
  flex: 1;
  background-color: #93accc;
  height: 100%;
  padding: 0 5px;
`;
const TitleEngText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;
const TitleKorText = styled.Text`
  font-size: 12px;
  color: #fff;
  padding: 2px 0;
`;
const TextAllContainer = styled.View`
  background-color: #4630eb;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
`;
const PlayText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

function Title({ kor, title, onPressPlay }) {
  const touchInfo = React.useRef({ start: false }).current;

  const readyPlayTouch = (e) => {
    console.log('Title : readyPlayTouch : ', e.nativeEvent.pageX);
    return true;
  };

  const startPlayTouch = (e) => {
    if (touchInfo.start === false) {
      console.log('Title : startPlayTouch : ', e.nativeEvent.pageX);
      touchInfo.startX = e.nativeEvent.pageX;
      touchInfo.start = true;
    }
  };

  const endPlayTouch = (e) => {
    if (touchInfo.start) {
      let gapX = e.nativeEvent.pageX - touchInfo.startX;
      console.log(`Title : endPlayTouch : e.nativeEvent.pageX = ${e.nativeEvent.pageX}, gapX = ${gapX}`);
      onPressPlay(title.allmp3, gapX);
    }

    touchInfo.start = false;
    touchInfo.move = false;
    touchInfo.startX = 0;
  };

  return (
    <Container>
      <TextContainer onStartShouldSetResponder={() => onPressPlay(title.mp3)}>
        <TitleEngText>{title.eng}</TitleEngText>
        <TitleKorText>{kor ? title.kor : ''}</TitleKorText>
      </TextContainer>
      <TextAllContainer
        onStartShouldSetResponder={readyPlayTouch}
        onResponderGrant={startPlayTouch}
        onResponderRelease={endPlayTouch}
      >
        <PlayText>Play All</PlayText>
      </TextAllContainer>
    </Container>
  );
}

export default Title;
