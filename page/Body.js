import * as React from 'react';
import styled from 'styled-components/native';
import * as FileSystem from 'expo-file-system';

import { DialogContext } from '../store';
import Dialog from './Dialog';
import Auto from './Auto';
import Sleep from './Sleep';

// styled
// ---------------------------------------------------------------------------------
// const Container = styled.ScrollView`
const Container = styled.View`
  background-color: #fff;
  flex: 1;
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
  console.log('Body : getFolderInfoes() :');

  let folderInfoes = [];
  try {
    const fileUris = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    console.log('Body : getFolderInfoes() : fileUris :', fileUris);

    let fileinfoPromises = fileUris.map((file) => FileSystem.getInfoAsync(FileSystem.documentDirectory + file));
    let fileinfos = await Promise.all(fileinfoPromises);

    folderInfoes = fileinfos.filter((fileinfo) => fileinfo.isDirectory);
  } catch (e) {
    console.log('[E] Body : getFolderInfoes() :', e);
  }

  return folderInfoes;
}

async function deleteAllData() {
  const uris = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
  console.log(`> Body : delete all data : uris : `, uris);

  await Promise.all(uris.map((uri) => FileSystem.deleteAsync(FileSystem.documentDirectory + uri)));
}

// main
// ---------------------------------------------------------------------------------
function Body() {
  const { store, dispatch } = React.useContext(DialogContext);
  const { page } = store;

  // console.log(`Body : page = ${page}, currDate = ${currDate}, kor = ${kor}`);
  console.log(`Body : page = ${page}`);

  React.useEffect(() => {
    console.log('Body : useEffect([]) :');

    // deleteAllData();

    getFolderInfoes().then((folderInfoes) => {
      // console.log('Body : folderInfoes :', folderInfoes);
      let filePromises = folderInfoes.map((folderInfo) => readDialogFile(folderInfo));
      Promise.all(filePromises).then((files) => {
        console.log('Body : useEffect([]) : dialog files :', files.length);
        if (files.length > 0)
          dispatch({ type: 'SET_DIALOGS', payload: files.filter((file) => file).map((file) => JSON.parse(file)) });
        // setDate(new Date());
        // setDate(new Date(2021,4,17));
      });
    });
  }, []);

  return (
    <Container>
      {page === 'dialog' && <Dialog />}
      {page === 'auto' && <Auto />}
      {page === 'sleep' && <Sleep />}
    </Container>
  );
}

export default Body;
