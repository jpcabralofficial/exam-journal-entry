/** @format */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { JournalEntry } from '@/api/journalEntries';
import { Colors } from '@/constants/Colors';
import moment from 'moment';
import { router } from 'expo-router';

type props = {
  data: JournalEntry;
};
const JournalEntryCard: React.FC<props> = ({ data }) => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate(`/JournalEntry/${data?.id}`)}
      className='flex-row border-b-[1px] border-stone-400 w-full mt-2 py-4 justify-between items-center '>
      <View className='flex-row justify-start items-start gap-3'>
        <View style={styles.circle} />
        <View>
          <Text className='font-semibold color-slate-600'>{data?.title}</Text>
          <Text className='mt-1 font-extralight color-slate-500 text-xs'>
            {moment(data?.date, 'MM/DD/YYYY hh:mm:ss A').format(
              'MM/DD/YYYY hh:mm:ss A'
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
export default React.memo(JournalEntryCard);
