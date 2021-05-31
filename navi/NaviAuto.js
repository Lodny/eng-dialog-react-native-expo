import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import styled from 'styled-components/native';
import { DialogContext } from '../store';

const Container = styled.View`
  background-color: #f0f0f0;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  flex: 1;
  ${'' /* background-color: #f0f0f0; */}
  align-items: center;
  justify-content: center;
`;
const DateText = styled.Text`
  font-size: 18px;
  ${'' /* padding: 0 50px; */}
`;
const NaviButton = styled.Button`
  background-color: #aaa;
  color: red;
`;

function NaviAuto() {
  const { store, dispatch } = React.useContext(DialogContext);

  const onPressDialogMode = () => {
    dispatch({ type: 'SET_PAGE', payload: 'dialog' });
  };

  return (
    <Container>
      <RowContainer>
        <NaviButton onPress={onPressDialogMode} title='< Back' />
        <TitleContainer>
          <DateText>Auto Mode</DateText>
        </TitleContainer>
      </RowContainer>
    </Container>
  );
}

export default NaviAuto;
