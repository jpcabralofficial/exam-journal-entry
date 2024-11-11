/** @format */

import { FlowContext } from '@/context/FlowContext/flowContext';
import { useJournal } from '@/hooks/useJournal';
import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
import { v4 as uuidv4 } from 'uuid';
import { useEditorBridge } from '@10play/tentap-editor';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { router } from 'expo-router';

const useViewModel = () => {
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
      const body = await editor.getHTML();
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
  return {
    handleDateChange,
    openDatePicker,
    control,
    handleSubmit,
    onSubmit,
    editor,
    setOpenDatePicker,
  };
};

export default useViewModel;
