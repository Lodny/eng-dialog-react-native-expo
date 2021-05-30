import * as React from 'react';
// import { View } from 'react-native';
import styled from 'styled-components/native';
import { DialogContext } from '../store';

import NaviDialog from './NaviDialog';
import NaviSleep from './NaviSleep';

// styled
// ---------------------------------------------------------------------------------
const Container = styled.View`
  background-color: #f0f0f0;
`;

// function
// ---------------------------------------------------------------------------------

// main
// ---------------------------------------------------------------------------------
function Navi() {
  const { store } = React.useContext(DialogContext);
  const { page } = store;

  // console.log(`Navi : page = ${page}, currDate = ${currDate}, kor = ${kor}`);

  return (
    <Container>
      {page === 'dialog' && <NaviDialog />}
      {page === 'sleep' && <NaviSleep />}
    </Container>
  );
}

export default Navi;
