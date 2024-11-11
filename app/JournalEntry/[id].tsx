/** @format */
import { router } from 'expo-router';

import React, { useContext, useEffect } from 'react';
import BaseScreen from '@/components/BaseScreen';
import BackHeader from '@/components/BackHeader';
import { useLocalSearchParams } from 'expo-router';
import { useJournal } from '@/hooks/useJournal';
import { FlowContext } from '@/context/FlowContext/flowContext';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import { RichText, useEditorBridge } from '@10play/tentap-editor';

const JournalEntryInfo = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { setLoading } = useContext(FlowContext);
  const { useGetEntry, deleteMutation } = useJournal();
  const { data: entry, isLoading: isEntryLoading } = useGetEntry(id);
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: entry?.body || '',
  });
  useEffect(() => {
    setLoading(isEntryLoading);
  }, [isEntryLoading]);
  useEffect(() => {
    editor.setContent(entry?.body || '');
  }, [entry]);
  const handleDelete = async () => {
    try {
      const isConfirmed = await new Promise<boolean>((resolve) => {
        Alert.alert(
          'Delete Entry',
          'Are you sure you want to delete this journal entry?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve(false), // Reject the deletion
            },
            {
              text: 'Delete',
              onPress: () => resolve(true), // Confirm deletion
            },
          ]
        );
      });
      if (isConfirmed && id) {
        setLoading(true);
        await deleteMutation.mutateAsync(entry?.id as string);
        setLoading(false);
        router.back(); // Navigate back after successful deletion
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      setLoading(false);
    }
  };
  return (
    <BaseScreen>
      <BackHeader
        onBack={() => router.back()}
        title={
          <View>
            <Text className='font-semibold text-sm color-black'>
              {entry?.title}
            </Text>
            <Text className='mt-1 font-extralight color-slate-500 text-xs'>
              {!isEntryLoading
                ? moment(entry?.date, 'MM/DD/YYYY hh:mm:ss A').format(
                    'MM/DD/YYYY hh:mm:ss A'
                  )
                : null}
            </Text>
          </View>
        }
      />

      <View className='flex-1 px-4 '>
        {!isEntryLoading ? <RichText editor={editor} /> : null}
      </View>

      <View className='w-full justify-center items-center pb-5'>
        <TouchableOpacity
          className='rounded-full py-4 bg-red-500 justify-center items-center w-11/12'
          onPress={handleDelete}>
          <Text className='font-semibold text-white text-lg'>Delete</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
};

export default JournalEntryInfo;
