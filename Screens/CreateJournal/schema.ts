/** @format */
import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required('Title is required'),

  date: yup.date().required('Date is required').nullable(),
});

export default schema;
