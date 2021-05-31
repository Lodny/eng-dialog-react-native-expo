import * as React from 'react';
// import { View } from 'react-native';
import styled from 'styled-components/native';
import { DialogContext } from '../store';
import * as FileSystem from 'expo-file-system';

import NaviDialog from './NaviDialog';
import NaviAuto from './NaviAuto';
import NaviSleep from './NaviSleep';

// styled
// ---------------------------------------------------------------------------------
const Container = styled.View`
  background-color: #f0f0f0;
`;

// function
// ---------------------------------------------------------------------------------
async function readDialogFile(folderInfo) {
  let content = null;
  let folderName = folderInfo.uri.slice(folderInfo.uri.lastIndexOf('/') + 1);

  let uri = `${folderInfo.uri}/${folderName}.dlg`;
  folderInfo = await FileSystem.getInfoAsync(uri);
  if (folderInfo.exists && !folderInfo.isDirectory) {
    // console.log('readDialogFile() : ', folderInfo);
    content = await FileSystem.readAsStringAsync(uri);
  }

  return content;
}

async function getFolderInfoes() {
  console.log('Navi : getFolderInfoes() :');

  let folderInfoes = [];
  try {
    const fileUris = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    console.log('Navi : getFolderInfoes() : fileUris :', fileUris);

    let fileinfoPromises = fileUris.map((file) => FileSystem.getInfoAsync(FileSystem.documentDirectory + file));
    let fileinfos = await Promise.all(fileinfoPromises);

    folderInfoes = fileinfos.filter((fileinfo) => fileinfo.isDirectory);
  } catch (e) {
    console.log('[E] Navi : getFolderInfoes() :', e);
  }

  return folderInfoes;
}

// main
// ---------------------------------------------------------------------------------
function Navi() {
  const { store, dispatch } = React.useContext(DialogContext);
  const { page } = store;

  // console.log(`Navi : page = ${page}, currDate = ${currDate}, kor = ${kor}`);

  React.useEffect(() => {
    console.log('Navi : useEffect([]) :');

    getFolderInfoes().then((folderInfoes) => {
      console.log('Navi : folderInfoes :', folderInfoes);
      let filePromises = folderInfoes.map((folderInfo) => readDialogFile(folderInfo));
      Promise.all(filePromises).then((files) => {
        console.log('Navi : useEffect([]) : dialog files :', files.length);
        dispatch(
          'SET_DIALOGS',
          files.filter((file) => file).map((file) => JSON.parse(file))
        );
        // setDate(new Date());
        // setDate(new Date(2021,4,17));
      });
    });
  }, []);

  return (
    <Container>
      {page === 'dialog' && <NaviDialog />}
      {page === 'auto' && <NaviAuto />}
      {page === 'sleep' && <NaviSleep />}
    </Container>
  );
}

export default Navi;
