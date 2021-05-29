import * as React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

// import useSwipe from './Swipe';
import EngDialogContext from '../store';

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
  width: 120px;
  align-items: center;
`;
// padding: 0 20px;
const PlayText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

function Title({ kor, title, onPressPlay, playIcon }) {
  React.useEffect(() => {
    console.log('Title : useEffect() :');
    title.play = false;
  }, [title]);

  return (
    <Container>
      <TextContainer onStartShouldSetResponder={() => onPressPlay(title)}>
        <TitleEngText>
          {title.play ? playIcon : ''}
          {title.eng}
        </TitleEngText>
        <TitleKorText>{kor ? title.kor : ''}</TitleKorText>
      </TextContainer>
      {/* <TextAllContainer onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <PlayText>Play All</PlayText>
      </TextAllContainer> */}
    </Container>
  );
}

export default Title;
