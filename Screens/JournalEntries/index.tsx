/** @format */

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { useQuery } from 'react-query';
import { getAllEntries } from '@/api/journalEntries';
import Header from './Header';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { isArray, size } from 'lodash';
import JournalEntryCard from '@/components/JournalEntryCard';
import { IMAGES } from '@/constants/images';
const JournalEntry = () => {
  const { data: entries, isLoading } = useQuery(
    'journalEntries',
    getAllEntries
  );
  const FallBackRequest = useCallback(
    ({
      img,
      label,
      labelPress,
    }: {
      img: ImageSourcePropType;
      label: string;
      labelPress?: () => void;
    }) => {
      return (
        <View className='flex-1 justify-center items-center px-2'>
          <Image
            source={img}
            className='w-full h-3/6'
            resizeMode='contain'
          />
          <Text
            className='text-center text-blue-500 font-semibold text-xl'
            onPress={labelPress}>
            {label}
          </Text>
        </View>
      );
    },
    []
  );

  return (
    <View className='flex-1 w-full '>
      <Header />

      <TouchableOpacity
        onPress={() => router.navigate('/JournalEntry/CreateEntry')}
        activeOpacity={0.8}
        className='flex-row justify-start items-center gap-3 w-full px-4 mt-4 mb-5'>
        <View style={styles.circle} />
        <Text className='font-thin color-slate-700 text-sm'>
          What's on your mind
        </Text>
      </TouchableOpacity>
      <View className='h-[3px] w-full bg-gray-300 ' />
      {!isLoading && size(entries) < 1 ? (
        <FallBackRequest
          img={IMAGES.empty}
          label='Create New Journal'
          labelPress={() => router.navigate('/JournalEntry/CreateEntry')}
        />
      ) : isLoading ? (
        <FallBackRequest
          img={IMAGES.loading}
          label='Loading...'
        />
      ) : (
        <FlatList
          data={isArray(entries) ? entries : []}
          className='px-4'
          renderItem={({ item }) => {
            return <JournalEntryCard data={item} />;
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.slate200, // slate-200
  },
});

export default memo(JournalEntry);
