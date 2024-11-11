/** @format */

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { hitslop } from '@/constants/common';

type props = {
  onBack: () => void;
  title?: string;
  rightElement?: React.ReactElement;
  leftElement?: React.ReactElement;
  onSearch?: () => void;
};
const BackHeader: React.FC<props> = ({
  onBack = () => {},
  title,
  rightElement,
  leftElement,
  onSearch = () => {},
}) => {
  return (
    <React.Fragment>
      <View className='w-full flex-row justify-between items-center px-4 py-3'>
        {rightElement ? (
          rightElement
        ) : (
          <View className='flex-row gap-4 justify-start items-center'>
            <TouchableOpacity
              onPress={onBack}
              hitSlop={hitslop}>
              <AntDesign
                name='arrowleft'
                size={24}
                color='black'
              />
            </TouchableOpacity>
            <Text className='font-semibold text-sm color-black'>{title}</Text>
          </View>
        )}
        {leftElement ? (
          leftElement
        ) : (
          <TouchableOpacity
            onPress={onSearch}
            hitSlop={hitslop}>
            <AntDesign
              name='search1'
              size={24}
              color='black'
            />
          </TouchableOpacity>
        )}
      </View>
      <View className='h-[1px] w-full bg-gray-300 ' />
    </React.Fragment>
  );
};

export default React.memo(BackHeader);
