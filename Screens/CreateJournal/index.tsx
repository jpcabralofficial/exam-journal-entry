/** @format */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackHeader from '@/components/BackHeader';
import { router } from 'expo-router';
import { RichText } from '@10play/tentap-editor';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';
import moment from 'moment';
import { Controller } from 'react-hook-form';

import DateTimePicker from '@react-native-community/datetimepicker';
import useViewModel from './useViewModel';

const CreateJournal = () => {
  const {
    handleDateChange,
    handleSubmit,
    onSubmit,
    control,
    openDatePicker,
    setOpenDatePicker,
    editor,
  } = useViewModel();
  return (
    <React.Fragment>
      <BackHeader
        onBack={() => router.back()}
        title='Create New Journal '
        leftElement={
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text>Next</Text>
          </TouchableOpacity>
        }
      />
      <View className='px-4 flex-1 mt-2'>
        <View className='w-full flex-row justify-between items-center'>
          <Text className='my-2 -ml-1 font-semibold'>Journal Title</Text>
          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                <Text className='my-2 -ml-1 font-semibold text-blue-500'>
                  {moment(field.value).format('MM/DD/YYYY hh:mm:ss A')}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <Controller
          name='title'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <React.Fragment>
              <TextInput
                focusable
                placeholder='Title'
                style={styles.titleInput}
                {...field}
                onChangeText={(txt) => field?.onChange(txt)}
              />
              {error && (
                <Text className='mt-2 color-red-600 font-normal text-xs'>
                  {error.message}
                </Text>
              )}
            </React.Fragment>
          )}
        />

        <RichText editor={editor} />
        {openDatePicker && (
          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <DateTimePicker
                value={field?.value as Date}
                mode='datetime'
                display='default'
                onChange={handleDateChange}
              />
            )}
          />
        )}
      </View>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 100,
  },
  titleInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.slate200,
    paddingVertical: 10,
  },
});

export default React.memo(CreateJournal);
