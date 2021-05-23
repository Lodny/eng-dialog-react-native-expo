import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
// import * as ScreenOrientation from 'expo-screen-orientation';

import Dialog from './pages/Dialog';

const Container = styled.View`
  flex: 1;
  margin-top: ${Constants.statusBarHeight}px;
`;

export default function App() {
  console.log('App ---------------------------------------------------------');
  console.log('App : statusBarHeight :', Constants.statusBarHeight);

  // const { width, height } = Dimensions.get('window');
  // console.log(`'App : width = ${width}, height = ${height}`);

  const width = Number.parseInt(useWindowDimensions().width / 100) * 100;

  console.log('App : width :', useWindowDimensions().width, width);

  //async function changeScreenOrientation() {
  // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  //}
  // changeScreenOrientation();

  return (
    <Container>
      <Dialog screenWidth={width} defaultCover={200} />
    </Container>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
