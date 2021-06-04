import * as React from 'react';
import { View, Text, Button, CheckBox } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 0;
`;
const SubContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;
const PlayButton = styled.Button`
  padding: 0 20px;
`;
const PlayText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const CoverText = styled.Text`
  font-size: 20px;
  padding: 0 2px;
`;

function ControlDialog({ kor, onChangeKor, onChangeAllCover }) {
  // React.useEffect(() => {
  //   console.log('ControlDialog : useEffect() :');
  //   title.play = false;
  //   title.mp3 = title.allmp3;
  // }, [title]);

  return (
    <Container>
      {/* <PlayText onPress={() => {}}>Play Dialog</PlayText> */}
      <PlayButton onPress={() => {}} title='Play Dialog' />
      <SubContainer>
        <Button title='<<' onPress={() => onChangeAllCover(-1)} />
        <CoverText>{' All Cover '}</CoverText>
        <Button title='>>' onPress={() => onChangeAllCover(1)} />
      </SubContainer>
      <SubContainer>
        <CheckBox value={kor} onValueChange={onChangeKor} />
        <Text onPress={onChangeKor}>KOR</Text>
      </SubContainer>
    </Container>
  );
}

export default ControlDialog;
