import * as React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import EngDialogContext from '../store';

// styled
// -----------------------------------------------------------------------------------
const SlideContainer = styled.View`
  flex-direction: row;
  width: 200%;
  justify-content: space-between;
`;
const Container = styled.View`
  padding: 0 2px;
  background-color: ${(props) => (props.idx % 2 === 0 ? '#fff' : '#f0f0f0f0')};
  width: ${(props) => props.w}px;
`;
const EngText = styled.Text`
  font-size: 20px;
  height: 28px;
  padding: 2px 0;
`;
const KorText = styled.Text`
  font-size: 12px;
  height: 20px;
  color: ${(props) => (props.kor ? '#888' : props.idx % 2 === 0 ? '#fff' : '#f0f0f0f0')};
  padding: 1px 0;
`;
const Cover = styled.View`
  background-color: #fbde50;
  border-left-color: red;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-width: 2px;
  padding: 0 0 0 100px;
  flex: 1;
`;

// Function
// -----------------------------------------------------------------------------------
function Sentence({ kor, sentence, cover, idx, onPressPlay, playIcon }) {
  // console.log('sentence :', sentence, idx);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    // console.log('Sentence : useEffect : ', cover);
    setWidth(cover);
  }, [cover]);

  React.useEffect(() => {
    // console.log('Sentence : useEffect() :');
    sentence.play = false;
  }, [sentence]);

  const touchInfo = React.useRef({ start: false }).current;

  const readyTouch = (e) => {
    console.log('Sentence : readyTouch : ', e.nativeEvent.pageX);
    return true;
  };

  const startTouch = (e) => {
    if (touchInfo.start === false) {
      console.log('Sentence : startTouch : ', e.nativeEvent.pageX);
      touchInfo.startX = e.nativeEvent.pageX;
      touchInfo.start = true;
    }
  };

  const moveTouch = (e) => {
    if (touchInfo.start && !touchInfo.move) {
      touchInfo.move = true;

      let gapX = e.nativeEvent.pageX - touchInfo.startX;
      if (Math.abs(gapX) > 2) {
        console.log('Sentence : moveTouch : ', e.nativeEvent.pageX, touchInfo.startX, width);

        touchInfo.startX = e.nativeEvent.pageX;
        if (width + gapX < 0) setWidth(0);
        else if (width + gapX > 800) setWidth(800);
        else setWidth(width + gapX);
      }

      touchInfo.move = false;
    }
  };

  const endTouch = (e) => {
    if (touchInfo.start) {
      console.log('Sentence : endTouch : ', e.nativeEvent.pageX);

      let gapX = e.nativeEvent.pageX - touchInfo.startX;
      setWidth(width + gapX);
    }

    touchInfo.start = false;
    touchInfo.move = false;
    touchInfo.startX = 0;
  };

  // JSX
  // --------------------------------------------
  return (
    <SlideContainer>
      <Container idx={idx} w={width} onStartShouldSetResponder={() => onPressPlay(sentence)}>
        <EngText numberOfLines={1} ellipsizeMode={'clip'}>
          {sentence.play ? playIcon : ''}
          {sentence.eng}
        </EngText>
        <KorText numberOfLines={1} ellipsizeMode={'clip'} kor={kor} idx={idx}>
          {kor ? sentence.kor : ''}
        </KorText>
      </Container>
      <Cover
        w={width}
        onStartShouldSetResponder={readyTouch}
        onResponderGrant={startTouch}
        onResponderMove={moveTouch}
        onResponderRelease={endTouch}
      />
    </SlideContainer>
  );
}

export default Sentence;
