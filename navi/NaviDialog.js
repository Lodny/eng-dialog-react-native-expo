import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';

import { DialogContext } from '../store';
import { getDateString, addDays } from '../utils';

// styled
// ---------------------------------------------------------------------------------
const Container = styled.View`
  background-color: #f0f0f0;
`;
const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
`;
const DateText = styled.Text`
  font-size: 18px;
  ${'' /* font-weight: bold; */}
  padding: 0 40px;
`;
// const DateButton = styled.Button`
//   padding: 0 20px;
// `;
// const NaviButton = styled.Button`
//   background-color: #aaa;
//   color: red;
// `;

// function
// ---------------------------------------------------------------------------------
async function getDialog(date) {
  console.log(`NaviDialog : getDialg : date=${date}`);

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
      // mp3: data.pron_file_url,
      mp3: data.pron_file_all_url,
      // allmp3: data.pron_file_all_url,
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

// main
// ---------------------------------------------------------------------------------
function NaviDialog() {
  const { store, dispatch } = React.useContext(DialogContext);
  // const { curr } = store;
  const [curr, setCurr] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (curr.getDay() === 0) {
      console.log(`NaviDialog : Sunday`);
      return;
    }

    const shortDate = getDateString(curr, '');

    const dlg = store.dialogs.find((dlg) => dlg?.date === shortDate);
    console.log(`NaviDialog : curr=${shortDate}, dlg = `, dlg);

    if (!dlg) {
      getDialog(shortDate).then((newDialog) => {
        console.log('NaviDialog : useEffect([curr]) : newDialog === null :', newDialog === null);
        // setCurrentDialog(newDialog);
        if (newDialog !== null) {
          // setDialogs([...dialogs, newDialog]);
          dispatch('ADD_DIALOG', newDialog);
        }
      });
    }
  }, [curr]);

  // event handler
  // ---------------------------------------------------------------------------------
  const onPressPrev = () => {
    const newDate = addDays(curr, -1);
    setCurr(newDate);
    // dispatch({ type: 'SET_CURR_DATE', payload: newDate });
  };
  const onPressNext = () => {
    const newDate = addDays(curr, 1);
    setCurr(newDate);
    // dispatch({ type: 'SET_CURR_DATE', payload: newDate });
  };

  const onPressDate = () => {
    setShow(true);
  };

  const onChangeDate = (event, selected) => {
    console.log(`NaviDialog : onChangeDate : show = ${show}, selected = ${selected}, curr = ${curr}`);

    if (selected == curr) return;

    // dispatch({ type: 'SET_CURR_DATE', payload: selected });
    setCurr(selected);
    setShow(false);
  };

  const onPressAutoMode = () => {
    dispatch({ type: 'SET_PAGE', payload: 'auto' });
  };

  const onPressSleepMode = () => {
    dispatch({ type: 'SET_PAGE', payload: 'sleep' });
  };

  // JSX
  // ---------------------------------------------------------------------------------
  return (
    <RowContainer>
      {show && <DateTimePicker value={curr} mode='date' is24Hour={true} display='default' onChange={onChangeDate} />}
      <RowContainer>
        <Button onPress={onPressPrev} title='<<<' />
        <DateText onPress={onPressDate}>{getDateString(curr)}</DateText>
        <Button onPress={onPressNext} title='>>>' />
      </RowContainer>
      <RowContainer>
        <Button onPress={onPressAutoMode} title='Auto' style={{ margin: '0 2px' }} />
        <Button onPress={onPressSleepMode} title='Sleep' />
      </RowContainer>
    </RowContainer>
  );
}

export default NaviDialog;
