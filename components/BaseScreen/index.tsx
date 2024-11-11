/** @format */

import { View, StatusBar } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
type Props = {
  backgroundColor?: string;
  children: React.ReactNode;
  fullScreen?: boolean;
};
const BaseScreen: React.FC<Props> = ({
  backgroundColor = Colors.white,
  fullScreen = false,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor,
        flex: 1,
      }}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />

      {!fullScreen && (
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
          }}>
          {children}
        </View>
      )}
      {fullScreen && <>{children}</>}
    </View>
  );
};

export default React.memo(BaseScreen);
