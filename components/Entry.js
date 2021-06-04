import * as React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import EngDialogContext from '../store';

// styled
// -----------------------------------------------------------------------------------
const Container = styled.View`
  padding: 0 2px;
  background-color: ${(props) => (props.idx % 2 === 0 ? '#fff' : '#f0f0f0f0')};
  height: 42px;
`;
const EngText = styled.Text`
  font-size: 16px;
  height: 22px;
  padding: 1px 0;
`;
const KorText = styled.Text`
  font-size: 8px;
  height: 12px;
  color: ${(props) => (props.kor ? '#888' : props.idx % 2 === 0 ? '#fff' : '#f0f0f0f0')};
  padding: 1px 0;
`;

// Main
// -----------------------------------------------------------------------------------
function Entry({ entry, idx, kor }) {
  // JSX
  // --------------------------------------------
  return (
    <Container idx={idx}>
      <EngText numberOfLines={1} ellipsizeMode={'clip'}>
        {entry.name}
      </EngText>
      <KorText numberOfLines={1} ellipsizeMode={'clip'} kor={kor} idx={idx}>
        {kor ? entry.mean : ''}
      </KorText>
    </Container>
  );
}

export default Entry;
