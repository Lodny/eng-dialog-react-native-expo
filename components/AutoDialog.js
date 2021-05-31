import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';

import { DialogContext } from '../store';

const Container = styled.View`
  padding: 10px 0;
`;
const SentenceContainer = styled.View`
  padding: 1px 4px;
  background-color: ${(props) => (props.idx % 2 === 1 ? '#fff' : '#f0f0f0f0')};
`;
const EngText = styled.Text`
  font-size: 16px;
  height: 26px;
  padding: 2px 0;
`;
const KorText = styled.Text`
  font-size: 9px;
  height: 17px;
  color: ${(props) => (props.kor ? '#888' : props.idx % 2 === 1 ? '#fff' : '#f0f0f0f0')};
  padding: 1px 0;
`;

function AutoDialog({ dialog }) {
  const { store } = React.useContext(DialogContext);
  const { kor } = store;

  if (!dialog) return <View></View>;

  return (
    <Container>
      {dialog.dialog.map((sentence, idx) => (
        <SentenceContainer idx={idx} key={idx}>
          <EngText numberOfLines={1} ellipsizeMode={'clip'}>
            {sentence.play ? playIcon : ''}
            {sentence.eng}
          </EngText>
          <KorText numberOfLines={1} ellipsizeMode={'clip'} kor={kor} idx={idx}>
            {kor ? sentence.kor : ''}
          </KorText>
        </SentenceContainer>
      ))}
    </Container>
  );
}

export default AutoDialog;
