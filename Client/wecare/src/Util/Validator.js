export const validateName = (name) => {
  return name && name.length >= 3 && name.length < 50;
};
export const validatePassword = (pass) => {
  return pass && pass.length >= 5 && pass.length < 11;
};

export const validateSpeciality = (speciality) => {
  return speciality && speciality.length >= 10 && speciality.length <= 50;
};
export const validateMobile = (mobile) => {
  return !isNaN(mobile) && mobile.toString().length === 10;
};
export const validateDate = (date) => {
  const today = new Date();
  const dob = new Date(date);
  let age = today.getFullYear() - dob.getFullYear();
  var m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age >= 20 && age <= 100) {
    return true;
  }
  return false;
};
