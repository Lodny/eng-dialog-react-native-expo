import * as React from 'react';
import styled from 'styled-components/native';
import { DialogContext } from '../store';

import Dialog from './Dialog';
import Sleep from './Sleep';

// styled
// ---------------------------------------------------------------------------------
const Container = styled.View`
  background-color: #fff;
`;

// function
// ---------------------------------------------------------------------------------

// main
// ---------------------------------------------------------------------------------
function Body() {
  const { store } = React.useContext(DialogContext);
  const { page } = store;

  console.log(`Body : page = ${page}`);

  return (
    <Container>
      {page === 'dialog' && <Dialog />}
      {page === 'sleep' && <Sleep />}
    </Container>
  );
}

export default Body;
