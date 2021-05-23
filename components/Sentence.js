import * as React from 'react';
import { TouchableWithoutFeedback, View, Text, Platform } from 'react-native';
import styled from 'styled-components/native';

// import { DialogContext } from '../pages/Dialog';
import EngDialogContext from '../store';
// import { playSentence } from '../Utils';

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

// main
// -----------------------------------------------------------------------------------
// function sentence({sentence, cover, idx, onChangeAllCover}) {
function Sentence({ kor, sentence, cover, idx, onPressPlay }) {
  // console.log('sentence :', sentence, idx);
  const [width, setWidth] = React.useState(0);
  const info = React.useRef({ start: false }).current;
  // const { kor, onPressPlay } = React.useContext(DialogContext);
  // const { kor, onPressPlay } = React.useContext(EngDialogContext);

  React.useEffect(() => {
    console.log('sentence : useEffect : ', cover);
    setWidth(cover);
  }, [cover]);

  const readyTouch = (e) => {
    console.log('sentence : readyTouch : ', e.nativeEvent.pageX);
    return true;
  };

  const startTouch = (e) => {
    // if (Platform.OS == 'web') {

    if (info.start === false) {
      console.log('sentence : startTouch : ', e.nativeEvent.pageX);
      info.startX = e.nativeEvent.pageX;
      info.start = true;
    }
  };

  const moveTouch = (e) => {
    if (info.start && !info.move) {
      info.move = true;

      let gapX = e.nativeEvent.pageX - info.startX;
      if (Math.abs(gapX) > 2) {
        console.log('sentence : moveTouch : ', e.nativeEvent.pageX, info.startX, width);

        info.startX = e.nativeEvent.pageX;
        if (width + gapX < 0) setWidth(0);
        else if (width + gapX > 800) setWidth(800);
        else setWidth(width + gapX);
      }

      info.move = false;
    }
  };

  const endTouch = (e) => {
    if (info.start) {
      console.log('sentence : endTouch : ', e.nativeEvent.pageX);

      let gapX = e.nativeEvent.pageX - info.startX;
      setWidth(width + gapX);
    }

    info.start = false;
    info.move = false;
    info.startX = 0;
  };

  // --------------------------------------------

  // const readyTouch2 = (e) => {
  //   console.log('sentence : readyTouch2 : ', e.nativeEvent.pageX)
  //   return true;
  // }

  // const startTouch2 = (e) => {
  //   // if (Platform.OS == 'web') {

  //   if (info.start === false) {
  //     console.log('sentence : startTouch2 : ', e.nativeEvent.pageX)
  //     info.startX = e.nativeEvent.pageX;
  //     info.start = true;
  //   }
  // }

  // const moveTouch2 = (e) => {
  //   if (info.start && !info.move) {
  //     info.move = true;

  //     let gapX = e.nativeEvent.pageX - info.startX;
  //     if (Math.abs(gapX) > 2) {
  //       console.log('sentence : moveTouch : ', e.nativeEvent.pageX, info.startX, width);

  //       info.startX = e.nativeEvent.pageX;
  //       // if (width + gapX < 0)
  //       //   setWidth(0);
  //       // else if (width + gapX > 800)
  //       //   setWidth(800);
  //       // else
  //       //   setWidth(width + gapX);
  //     }

  //     info.move = false;
  //   }
  // }

  // const endTouch2 = (e) => {
  //   if (info.start) {
  //     console.log('sentence : endTouch2 : ', e.nativeEvent.pageX)

  //     let gapX = e.nativeEvent.pageX - info.startX;
  //     // setWidth(width + gapX);
  //   }

  //   info.start = false;
  //   info.move = false;
  //   info.startX = 0;
  // }

  // function debounce(func, ms) {
  //   let timeout;
  //   return function() {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func.apply(this, arguments), ms);
  //   };
  // }

  // function throttle(func, ms) {

  //   let isThrottled = false,
  //     savedArgs,
  //     savedThis;

  //   function wrapper() {

  //     if (isThrottled) { // (2)
  //       savedArgs = arguments;
  //       savedThis = this;
  //       return;
  //     }

  //     func.apply(this, arguments); // (1)

  //     isThrottled = true;

  //     setTimeout(function() {
  //       isThrottled = false; // (3)
  //       if (savedArgs) {
  //         wrapper.apply(savedThis, savedArgs);
  //         savedArgs = savedThis = null;
  //       }
  //     }, ms);
  //   }

  //   return wrapper;
  // }

  return (
    <SlideContainer>
      <Container
        idx={idx}
        w={width}
        onStartShouldSetResponder={() => onPressPlay(sentence.mp3)}
        // onStartShouldSetResponder={readyTouch2}
        // onResponderGrant={startTouch2}
        // onResponderMove={moveTouch2}
        // onResponderRelease={endTouch2}
      >
        <EngText numberOfLines={1} ellipsizeMode={'clip'}>
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
