import React from 'react';
import { View, Text } from 'react-native';
import NaviDialog from '../navi/NaviDialog';
import TodayDialog from '../components/TodayDialog';

function Dialog() {
  return (
    <View>
      <NaviDialog />
      <TodayDialog />
    </View>
  );
}

export default Dialog;
