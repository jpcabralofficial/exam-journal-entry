/** @format */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import BackHeader from '@/components/BackHeader';
import { router } from 'expo-router';
import { RichText, useEditorBridge } from '@10play/tentap-editor';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';
import moment from 'moment';
import { useJournal } from '@/hooks/useJournal';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
import { FlowContext } from '@/context/FlowContext/flowContext';
import { v4 as uuidv4 } from 'uuid';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateJournal = () => {
  const { setLoading } = useContext(FlowContext);
  const { createMutation } = useJournal();
  const [openDatePicker, setOpenDatePicker] = useState(false); // To show/hide date picker
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      date: new Date(),
    },
  });
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: ``,
  });
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const body = await editor?.getText();
      const newEntry = {
        id: uuidv4(),
        date: moment(data.date).format('MM/DD/YYYY hh:mm:ss A'),
        title: data.title,
        body: body,
      };
      await createMutation.mutateAsync(newEntry);
      setLoading(false);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setOpenDatePicker(false);
    if (selectedDate) {
      setValue('date', selectedDate);
    }
  };
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
