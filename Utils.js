import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// function
// -----------------------------------------------------------------------------------
function addDays(date, days = 1) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function getDateString(date, seperator = '-') {
  if (!date) return '';

  let m = date.getMonth() + 1;
  let d = date.getDate();

  return `${date.getFullYear()}${seperator}${(m < 10 ? '0' : '') + m}${seperator}${(d < 10 ? '0' : '') + d}`;
}

function getDateStringWithDay(date, seperator = '-') {
  if (!date) return '';

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return getDateString(date) + `(${days[date.getDay()]})`;
}

// download mp3
// -----------------------------------------------------------------------------------
// function getRequestMp3Url(dialog) {
//   const mp3Names = [];
//   let requestMp3Url = 'https://learn.dict.naver.com/dictPronunciation.dict?filePaths=';

//   requestMp3Url += dialog.title.allmp3 + ',';
//   mp3Names.push(dialog.title.allmp3.slice(dialog.title.allmp3.lastIndexOf('/') + 1));
//   requestMp3Url += dialog.title.mp3 + ',';
//   mp3Names.push(dialog.title.mp3.slice(dialog.title.mp3.lastIndexOf('/') + 1));

//   dialog.dialog.forEach((sentence) => {
//     requestMp3Url += sentence.mp3 + ',';
//     mp3Names.push(sentence.mp3.slice(sentence.mp3.lastIndexOf('/') + 1));
//   });

//   return {requestMp3Url, mp3Names};
// }

// async function getMp3Urls(url) {
//   try {
//     const res = await fetch(url);
//     const data = await res.json();

//     return data.url;
//   } catch (e) {
//     console.log(e);
//   }
// }

async function downloadMp3(sentenceUrl, saveUri) {
  let requestMp3Url = 'https://learn.dict.naver.com/dictPronunciation.dict?filePaths=' + sentenceUrl;

  try {
    const res = await fetch(requestMp3Url);
    const data = await res.json();

    console.log('downloadMp3() : mp3 url :', data.url[0]);
    const { uri } = await FileSystem.downloadAsync(data.url[0], saveUri);
    console.log('Finished downloading to ', uri);
  } catch (e) {
    console.log('downloadMp3() : ERROR :', e);
  }

  // let {requestMp3Url, mp3Names} = getRequestMp3Url(todayDialog);
  // // console.log('Dialog : useEffect : requestMp3Url', requestMp3Url);
  // console.log('Dialog : useEffect : mp3Names', mp3Names);

  // getMp3Urls(requestMp3Url).then((urls) =>
  //   urls.forEach((url, idx) => {
  //   // console.log('each url :', url);

  //   // let uri = FileSystem.documentDirectory + shortDate + `/${mp3Names[idx]}`;
  //   // console.log('each uri :', uri);

  //   })
  // );
}

// play mp3
// -----------------------------------------------------------------------------------
async function playSound(uri, setSound) {
  console.log('playSound() :', uri);

  try {
    const { sound } = await Audio.Sound.createAsync({ uri }, {}, setSound); //, { shouldPlay: true });
    setSound({ snd: sound });
    await sound.playAsync();
  } catch (e) {
    console.log(e);
  }
}

function getMp3Uri(url) {
  let filename = url.slice(url.lastIndexOf('/'));
  let folder = filename.slice(1, 9);
  let uri = FileSystem.documentDirectory + folder + filename;

  // console.log('getMp3Uri() : url :', url, folder, filename);
  console.log('getMp3Uri() : uri :', uri);

  return uri;
}

async function stopSentence(sound) {
  console.log('stopSentence() : -------------------------- ');
  // await sound.setIsLoopingAsync(false);
  await sound.stopAsync();
  await sound.unloadAsync();
}

async function playSentence(sentenceUrl, setSound) {
  let uri = getMp3Uri(sentenceUrl);

  try {
    let { exists } = await FileSystem.getInfoAsync(uri);
    if (exists) {
      playSound(uri, setSound);
      return;
    }

    console.log('playSentence() : sentenceUrl :', sentenceUrl);
    downloadMp3(sentenceUrl, uri)
      .then((res) => {
        if (uri) playSound(uri, setSound);
      })
      .catch((e) => console.log(e));
    // console.log('playSound() :', fileinfo);
  } catch (e) {
    console.log('~~~~~~~~~~~~~~~~~~~');
    console.log(e);
  }
}

// Touch Event
// ------------------------------------------------------------------------------
// const touchInfo = { start: false };

// const readyPlayTouch = (e) => {
//   console.log('Utils.js : readyPlayTouch : ', e.nativeEvent.pageX);
//   return true;
// };

// const startPlayTouch = (e) => {
//   if (touchInfo.start === false) {
//     console.log('Utils.js : startPlayTouch : ', e.nativeEvent.pageX);
//     touchInfo.startX = e.nativeEvent.pageX;
//     touchInfo.start = true;
//   }
// };

// const endPlayTouch = (e) => {
//   if (touchInfo.start) {
//     let gapX = e.nativeEvent.pageX - touchInfo.startX;
//     console.log('Utils.js : endPlayTouch : ', e.nativeEvent.pageX, gapX);

//     let loopCnt = 0;
//     if (gapX > 30) {
//       loopCnt = 3;
//     }

//     console.log('Utils.js : endPlayTouch : looping : loopCnt :', loopCnt);
//     onPressPlay(sentence.mp3, loopCnt);
//   }

//   touchInfo.start = false;
//   touchInfo.move = false;
//   touchInfo.startX = 0;
// };

export {
  addDays,
  getDateString,
  getDateStringWithDay,
  playSentence,
  stopSentence,
  // touch event -------------
  // readyPlayTouch,
  // startPlayTouch,
  // endPlayTouch,
};
