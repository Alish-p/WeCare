const e = require('express');

const validateUser = ({
  name,
  password,
  dateOfBirth,
  gender,
  mobileNumber,
  email,
  pincode,
  city,
  state,
  country,
}) => {
  validateName(name);
  validatePassword(password);
  validateAge(dateOfBirth);
  validateGender(gender);
  validatePhoneNo(mobileNumber);
  validateEmail(email);
  validatePincode(pincode);
  validateAddress(city, state, country);
};

const validateCoach = ({
  name,
  password,
  dateOfBirth,
  gender,
  mobileNumber,
  speciality,
}) => {
  validateName(name);
  validatePassword(password);
  validateAge(dateOfBirth);
  validateGender(gender);
  validatePhoneNo(mobileNumber);
  validateSpeciality(speciality);
};

const validateBooking = ({ slot, dateOfAppointment }) => {
  validateSlot(slot);
  validateAppointmentDate(dateOfAppointment);
};

const validateName = (name) => {
  if (!(name.length > 3 && name.length < 50)) {
    let err = new Error('Name should have minimum 3 and maximum 50 characters');
    err.status = 400;
    throw err;
  }
};

const validatePassword = (password) => {
  if (!(password.length >= 5 && password.length <= 10)) {
    let err = new Error('Name should have minimum 3 and maximum 50 characters');
    err.status = 400;
    throw err;
  }
};

const validateAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);

  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (!(age > 20 && age < 100)) {
    let err = new Error('Age should be greater than 20 and less than 100');
    err.status = 400;
    throw err;
  }
};

const validateGender = (gender) => {
  if (!['F', 'M'].includes(gender)) {
    let err = new Error('Gender should be either M or F');
    err.status = 400;
    throw err;
  }
};

const validatePhoneNo = (phone) => {
  let length = (Math.log(phone) * Math.LOG10E + 1) | 0;
  if (length != 10) {
    let err = new Error('Mobile Number should have 10 digits');
    err.status = 400;
    throw err;
  }
};

const validateEmail = (email) => {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!String(email).toLowerCase().match(regex)) {
    let err = new Error('Email should be a valid one');
    err.status = 400;
    throw err;
  }
};

const validatePincode = (pincode) => {
  let length = (Math.log(pincode) * Math.LOG10E + 1) | 0;
  if (length != 6) {
    let err = new Error('Pincode should have 6 digits');
    err.status = 400;
    throw err;
  }
};

const validateAddress = (city, state, country) => {
  if (
    !(
      city.length >= 3 &&
      city.length <= 20 &&
      state.length >= 3 &&
      state.length <= 20 &&
      country.length >= 3 &&
      country.length <= 20
    )
  ) {
    let err = new Error('City should have minimum 3 and maximum 20 characters');
    err.status = 400;
    throw err;
  }
};

const validateSpeciality = (speciality) => {
  if (!(speciality.length >= 10 && speciality.length <= 50)) {
    const err = new Error('Specialty should have 10 to 50 characters');
    err.status = 400;
    throw err;
  }
};

const validateSlot = (slot) => {
  // 9 am to 10 am
  const slotArr = slot.split(' ');
  const valid = [
    !isNaN(slotArr[0]),
    !isNaN(slotArr[3]),
    ['am', 'pm'].includes(slotArr[1].toLowerCase()),
    ['am', 'pm'].includes(slotArr[4].toLowerCase()),
  ].every((each) => each);

  if (!valid) {
    const err = new Error('Slot should be a valid one');
    err.status = 400;
    throw err;
  }
};

const validateAppointmentDate = (date) => {
  var day1 = new Date(date);
  var today = new Date();

  var difference = Math.abs(day1 - today) / (1000 * 3600 * 24);

  if (difference > 7) {
    const err = new Error('Date should be any upcoming 7 days');
    err.status = 400;
    throw err;
  }
};

module.exports = { validateUser, validateCoach, validateBooking };
