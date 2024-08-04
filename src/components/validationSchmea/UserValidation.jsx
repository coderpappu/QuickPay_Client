// src/utils/validationSchema.js
const UserValidation = (values) => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = "Required";
  } else if (values.first_name.length < 3) {
    errors.first_name = "First name must be at least 3 characters";
  }

  if (!values.last_name) {
    errors.last_name = "Required";
  } else if (values.last_name.length < 2) {
    errors.last_name = "Last name must be at least 2 characters";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length < 10) {
    errors.phone = "Phone number must be at least 10 characters";
  }

  if (!values.file) {
    errors.file = "Required";
  }

  return errors;
};

export default UserValidation;
