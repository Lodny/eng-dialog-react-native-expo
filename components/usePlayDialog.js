import * as React from 'react';

function usePlayDialog(props) {
  const { fromDate, toDate, playTimes, cbPlayDialogInfo } = props;

  const [from, setFrom] = React.useState(fromDate);
  const [to, setTo] = React.useState(toDate);
  const [playDate, setPlayDate] = React.useState(fromDate);

  const [dialog, setDialog] = React.useState(null);
  const [times, setTimes] = React.useState(playTimes);
  const [repeat, setRepeat] = React.useState(playTimes);

  React.useEffect(() => {
    console.log(`usePlayDialog : useEffect([playDate]) : `);
  }, [playDate]);

  React.useEffect(() => {
    console.log(`usePlayDialog : useEffect([dialog]) : `);
  }, [dialog]);

  // function playDialog() {
  //   console.log('Dialog : playDialog() : ');
  // }

  function cbPlayDialog({ snd, didJustFinish, isLooping }) {
    // if (snd) {
    //   console.log('Dialog : cbSoundNight() : receive snd');
    //   setSound(snd);
    //   // snd.setIsLoopingAsync(true).then((res) => {});
    // }
    // if (didJustFinish) {
    //   console.log(`Dialog : cbSoundNight() : didJustFinish = ${didJustFinish}, isLooping = ${isLooping}`);
    //   if (!isLooping) {
    //     setSound(null);
    //     setPlayIcon('');
    //     // setCurrPlay(null);
    //   }
    // }
  }

  function cbPlayDialogControll(cmd) {
    console.log('cbPlayDialogControll() : ', cmd);
  }

  // const onPressNightPlay = (nightProps) => {
  //   const { fromDate, toDate, nightPlayTimes } = nightProps;
  //   console.log(
  //     `Dialog : onPressNightPlay : fromDate = ${getDateString(fromDate)} ~ toDate = ${getDateString(
  //       toDate
  //     )}, nightPlayTimes = ${nightPlayTimes}`
  //   );

  //   const dateArray = getDateStringArray(fromDate, toDate);
  //   setNightDates(dateArray);
  //   // .then(() => playDialog());
  //   // console.log(dateArray);

  //   // playSentence(newPlay.mp3, cbSoundNight);
  // };

  return { cbPlayDialogControll };
}

export default usePlayDialog;
