/** @format */

import React, { memo } from 'react';
import BaseScreen from '@/components/BaseScreen';
import CreateJournal from '@/Screens/CreateJournal';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CreateEntry = () => {
  const safeArea = useSafeAreaInsets();
  console.log(safeArea.bottom);
  return (
    <BaseScreen>
      <View style={{ paddingBottom: safeArea.bottom, flex: 1 }}>
        <CreateJournal />
      </View>
    </BaseScreen>
  );
};

export default memo(CreateEntry);
