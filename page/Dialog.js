import React from 'react';
import styled from 'styled-components/native';
import { View, Text, useWindowDimensions } from 'react-native';
import NaviDialog from '../navi/NaviDialog';
import TodayDialog from '../components/TodayDialog';
import ControlDialog from '../components/ControlDialog';

const Container = styled.View`
  flex: 1;
`;

const DEFAULT_COVER = 200;
const UNIT_COVER = 50;

function Dialog() {
  const width = Number.parseInt(useWindowDimensions().width / 100) * 100;
  console.log('App : width :', useWindowDimensions().width, width);

  const [dialog, setDialog] = React.useState(null);
  const [allCover, setAllCover] = React.useState(DEFAULT_COVER);
  const [kor, setKor] = React.useState(true);

  const onChangeDialog = (dlg) => {
    console.log(`Dialog : onChangeDialog() : dlg = ${dlg != null}`);
    // if (!dlg) return;

    setDialog(dlg);
    setAllCover(DEFAULT_COVER);
  };

  const onChangeKor = () => {
    console.log('Dialog : onChangeKor');
    setKor(!kor);
  };
  const onChangeAllCover = (val) => {
    val *= UNIT_COVER;
    console.log(`Dialog : onChangeAllCover : allCover = ${allCover}, val = ${val}`);

    if (allCover + val < 0) val = 10;
    else if (allCover + val > width) val = width;
    else val += allCover;

    setAllCover(val);
    // if (allCover + val < 0) setAllCover(10);
    // else if (allCover + val > width) setAllCover(width);
    // else setAllCover(allCover + val);
  };

  return (
    <Container>
      <NaviDialog onChangeDialog={onChangeDialog} />
      <ControlDialog kor={kor} onChangeKor={onChangeKor} onChangeAllCover={onChangeAllCover} />
      <TodayDialog dialog={dialog} allCover={allCover} kor={kor} />
    </Container>
  );
}

export default Dialog;
