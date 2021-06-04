import React from 'react';
import { Audio } from 'expo-av';

function useSound(cb) {
  console.log(`useSound : uri = ${uri}`);

  this.thisSound = null;

  const [sound, setSound] = React.useState(null);

  async function createSound(uri) {
    if (uri) {
      try {
        if (await FileSystem.getInfoAsync(uri).exists) {
          thisSound = await Audio.Sound.createAsync({ uri }, {}, cb).Sound;
          setSound(thisSound);
          // await sound.playAsync();
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  React.useEffect(() => {
    createSound(uri);
  }, []);

  return { sound, thisSound };
}
