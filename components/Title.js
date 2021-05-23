import * as React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import EngDialogContext from '../store';
// import { DialogContext } from '../pages/Dialog';
// import { playSentence } from '../Utils';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TextContainer = styled.View`
  flex: 1;
  background-color: #93accc;
  padding: 5px;
`;
const TitleEngText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  padding: 0px 0;
`;
const TitleKorText = styled.Text`
  font-size: 12px;
  color: #fff;
  padding: 2px 0;
`;
const PlayText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  padding: 15px 4px;
  background-color: #4630eb;
`;

function Title({ kor, title, onPressPlay }) {
  // const { kor, onPressPlay } = React.useContext(DialogContext);
  // const { kor, onPressPlay } = React.useContext(EngDialogContext);

  return (
    <Container>
      <TextContainer onStartShouldSetResponder={() => onPressPlay(title.mp3)}>
        <TitleEngText>{title.eng}</TitleEngText>
        <TitleKorText>{kor ? title.kor : ''}</TitleKorText>
      </TextContainer>
      <PlayText onPress={() => onPressPlay(title.allmp3)}>Play All</PlayText>
    </Container>
  );
}

export default Title;
