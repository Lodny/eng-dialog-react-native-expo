import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { getDateString, playSentence, stopSentence } from '../Utils';
import * as FileSystem from 'expo-file-system';
import EngDialogContextProvider from '../store';

import Header from '../components/Header';
import Title from '../components/Title';
import Sentence from '../components/Sentence';

// export const DialogContext = React.createContext();

// const Container = styled.ScrollView`
const Container = styled.View`
  flex: 1;
`;

async function getDialog(date) {
  console.log('[F] getDialg()');

  const url = `https://gateway.dict.naver.com/endict/kr/enko/today/${date}/conversation.dict`;
  try {
    const res = await fetch(url);
    const data = (await res.json()).data;

    if (data === null) {
      console.log('getDialog() : there is no data');
      return null;
    }

    // public_date: '20210521',
    const title = {
      eng: data.title,
      kor: data.title_translation,
      mp3: data.pron_file_url,
      allmp3: data.pron_file_all_url,
    };
    const dialog = data.sentences.map((sentence) => {
      let eng_sentence = sentence.orgnc_sentence.replace(/(<([^>]+)>)/gi, '');
      return { eng: eng_sentence, kor: sentence.trsl_sentence, mp3: sentence.sentence_pron_file };
      // return { eng: sentence.orgnc_sentence, kor: sentence.trsl_sentence, mp3: sentence.sentence_pron_file };
    });

    let uri = FileSystem.documentDirectory + date;
    let fileinfo = await FileSystem.getInfoAsync(uri);
    console.log('getDialg() : uri :', uri);
    console.log('getDialg() : fileinfo :', fileinfo);

    if (!fileinfo.exists) {
      await FileSystem.makeDirectoryAsync(uri);
    }

    uri += `/${date}.dlg`;
    fileinfo = await FileSystem.getInfoAsync(uri);
    console.log('getDialg() : uri :', uri);
    console.log('getDialg() : fileinfo :', fileinfo);
    if (!fileinfo.exists) {
      await FileSystem.writeAsStringAsync(uri, JSON.stringify({ date, title, dialog }));
    }

    return { date, title, dialog };
  } catch (e) {
    console.log('[E] getDialog() :', e);
  }
}

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
  console.log('[F] Dialog : getFolderInfoes() :');

  let folderInfoes = [];
  try {
    const fileUris = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    console.log('getFolderInfoes() : fileUris :', fileUris);

    let fileinfoPromises = fileUris.map((file) => FileSystem.getInfoAsync(FileSystem.documentDirectory + file));
    let fileinfos = await Promise.all(fileinfoPromises);

    folderInfoes = fileinfos.filter((fileinfo) => fileinfo.isDirectory);
  } catch (e) {
    console.log('[E] getFolderInfoes() :', e);
  }

  return folderInfoes;
}

function Dialog({ screenWidth, defaultCover }) {
  console.log('[MF] Dialog : screenWidth :', screenWidth);
  const [kor, setKor] = React.useState(true);
  const [cover, setCover] = React.useState(200);
  const [coverGap, setCoverGap] = React.useState(50);

  const [dialogs, setDialogs] = React.useState([]);
  const [currentDialog, setCurrentDialog] = React.useState(null);
  const [date, setDate] = React.useState(null);

  React.useEffect(() => {
    console.log('Dialog : useEffect : init');

    getFolderInfoes().then((folderInfoes) => {
      // console.log('Dialog : folderInfoes :', folderInfoes);
      let filePromises = folderInfoes.map((folderInfo) => readDialogFile(folderInfo));
      Promise.all(filePromises).then((files) => {
        console.log('Dialog : useEffect : files.length :', files.length);
        setDialogs(files.filter((file) => file).map((file) => JSON.parse(file)));
        setDate(new Date());
        // setDate(new Date(2021,4,17));
      });
    });
  }, []);

  React.useEffect(() => {
    if (date) {
      console.log('Dialog : useEffect : dialogs.length :', dialogs.length);

      setCover(defaultCover);

      let shortDate = getDateString(date, '');
      console.log('Dialog : useEffect : date :', shortDate);

      let todayDialog = dialogs.find((dlg) => dlg?.date === shortDate);
      if (todayDialog) {
        setCurrentDialog(todayDialog);
      } else {
        getDialog(getDateString(date, '')).then((newDialog) => {
          console.log('Dialog : useEffect : newDialog === null :', newDialog === null);
          setCurrentDialog(newDialog);
          if (newDialog !== null) {
            setDialogs([...dialogs, newDialog]);
          }
        });
      }
    }
  }, [date]);

  // play mp3
  // ----------------------------------------------------------------------------------------
  const [mp3, setMp3] = React.useState(null);
  const [sound, setSound] = React.useState(null);

  function cbSound({ snd, didJustFinish, isLooping }) {
    if (snd) {
      console.log('Dialog : cbSound() : receive snd');
      setSound(snd);
    }

    if (didJustFinish) {
      console.log(`Dialog : cbSound() : didJustFinish = ${didJustFinish}, isLooping = ${isLooping}`);
      if (!isLooping) {
        setSound(null);
        setMp3(null);
      }
    }
  }

  // function cbSound(snd) {
  //   console.log('Dialog : cbSound() :');
  //   if (!snd) {
  //     setMp3(null);
  //   }
  //   setSound(snd);
  // }

  // function cbPlaySentence({ isLooping }) {
  //   console.log(`isLooping = ${isLooping}`);
  // }

  function onPressPlay(newMp3, sweep) {
    console.log(`Dialog : onPressPlay() : mp3 = ${mp3}, newMp3 = ${newMp3}, sweep = ${sweep}`);

    // playSentence(newMp3, sweep, cbPlaySentence);

    if (!newMp3) return;

    if (mp3) stopSentence(sound);

    if (mp3 === newMp3) {
      setSound(null);
      setMp3(null);
      return;
    }

    playSentence(newMp3, sweep > 30, cbSound);
    setMp3(newMp3);
  }

  // control
  // ----------------------------------------------------------------------------------------
  const onChangeDate = (newDate) => {
    console.log('Dialog : onChangeDate :', getDateString(date, ''), date, newDate);

    if (!newDate) return;

    if (date !== newDate) {
      setDate(newDate);
      setCover(0);
    }
  };
  const onChangeKor = () => {
    console.log('Dialog : onChangeKor');
    setKor(!kor);
  };
  const onChangeCover = (val) => {
    console.log('Dialog : onChangeCover :', cover, val);
    if (cover + val < 0) setCover(0);
    else if (cover + val > screenWidth) setCover(screenWidth);
    else setCover(cover + val);
  };
  const onChangeCoverGap = (gap) => {
    console.log('Dialog : onChangeCoverGap :', coverGap, gap);
    setCoverGap(gap);
  };
  const onChangeInitCover = (cover) => {
    // console.log('Dialog : onChangeInitCover :', coverInit, cover);
    // setCoverGap(gap);
  };

  return (
    // <DialogContext.Provider value={{ kor, date, onPressPlay }}>
    // <EngDialogContextProvider>
    <Container>
      <Header
        kor={kor}
        date={date}
        onChangeDate={onChangeDate}
        onChangeKor={onChangeKor}
        coverGap={50}
        onChangeCover={onChangeCover}
      />

      {currentDialog && <Title kor={kor} title={currentDialog.title} onPressPlay={onPressPlay} />}
      {currentDialog &&
        currentDialog.dialog.map((sentence, idx) => (
          <Sentence key={idx} kor={kor} cover={cover} sentence={sentence} idx={idx} onPressPlay={onPressPlay} />
        ))}
    </Container>
    // </EngDialogContextProvider>
  );
}
//  </DialogContext.Provider>
export default Dialog;

/* <Header
          onChangeDate={onChangeDate}
          onChangeKor={onChangeKor}
          onChangeCover={onChangeCover}
          coverInit={200}
          onChangeInitCover={onChangeInitCover}
          coverGap={coverGap}
          onChangeCoverGap={onChangeCoverGap}
        /> */
