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
