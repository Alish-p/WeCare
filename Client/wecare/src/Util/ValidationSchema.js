import * as Yup from 'yup';
import moment from 'moment';

export const coachSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name should have 3 to 50 characters')
    .max(50, 'Name should have 3 to 50 characters')
    .required('Name is Required'),
  password: Yup.string()
    .min(5, 'Password should have 5 to 10 characters')
    .max(10, 'Password should have 5 to 10 characters')
    .required('Password is Required'),
  speciality: Yup.string()
    .min(10, 'Speciality should have 10 to 50 characters')
    .max(50, 'Speciality should have 10 to 50 characters')
    .required('Speciality is Required'),
  mobileNumber: Yup.string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    'Mobile Number should have 10 digits'
  ),
  dateOfBirth: Yup.string()
    .required('DOB is Required')
    .test(
      'DOB',
      'Age should be between 20 and 100 years',
      (date) =>
        moment().diff(moment(date), 'years') >= 20 &&
        moment().diff(moment(date), 'years') <= 100
    ),
  gender: Yup.string().required('Gender is Required'),
});

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name should have 3 to 50 characters')
    .max(50, 'Name should have 3 to 50 characters')
    .required('Name is Required'),
  password: Yup.string()
    .min(5, 'Password should have 5 to 10 characters')
    .max(10, 'Password should have 5 to 10 characters')
    .required('Password is Required'),

  mobileNumber: Yup.string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    'Mobile Number should have 10 digits'
  ),
  pincode: Yup.string().matches(
    /^\d{1,6}$/,
    'Mobile Number should have 6 digits'
  ),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  dateOfBirth: Yup.string()
    .required('DOB is Required')
    .test('DOB', 'Age should be between 20 and 100 years', (date) => {
      return (
        moment().diff(moment(date), 'years') >= 20 &&
        moment().diff(moment(date), 'years') <= 100
      );
    }),
  gender: Yup.string().required('Gender is Required'),

  city: Yup.string()
    .min(6, 'City should have 6 to 20 characters')
    .max(20, 'City should have 6 to 20 characters'),
  state: Yup.string()
    .min(6, 'State should have 6 to 20 characters')
    .max(20, 'State should have 6 to 20 characters'),
  country: Yup.string()
    .min(4, 'Country should have 4 to 20 characters')
    .max(20, 'Country should have 4 to 20 characters'),
});

export const LoginSchema = Yup.object().shape({
  id: Yup.string().required('Id is Required'),
  password: Yup.string()
    .min(5, 'Password should have 5 to 10 characters')
    .max(10, 'Password should have 5 to 10 characters')
    .required('Password is Required'),
});

export const BookingSchema = Yup.object().shape({
  slot: Yup.string().required('Id is Required'),
  dateOfAppointment: Yup.string()
    .required('Appointment date is Required')
    .test(
      'dateOfAppointment',
      'Appointment date should be any upcoming 7 days',
      (date) => {
        return (
          moment(date).diff(moment(), 'days') <= 7 &&
          moment(date).diff(moment(), 'days') >= 0
        );
      }
    ),
});
