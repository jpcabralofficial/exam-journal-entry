/** @format */

import { ReactNode, useState } from 'react';
import { FlowContext } from './flowContext';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';

export const FlowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <FlowContext.Provider value={{ isLoading, setLoading }}>
      {children}

      <Modal
        transparent={true}
        statusBarTranslucent
        animationType='fade'
        visible={isLoading}
        onRequestClose={() => {}}>
        <View className='flex-1 flex-row justify-center items-center bg-black/50 w-full'>
          <View className='p-6 rounded-lg items-center justify-center w-full '>
            <ActivityIndicator
              size='large'
              color={Colors.primary}
            />
            <Text className='mt-3 text-lg font-bold'>Loading...</Text>
          </View>
        </View>
      </Modal>
    </FlowContext.Provider>
  );
};
