// src/utils/validationSchema.js
const ShiftValidate = (values) => {
  const errors = {};

  // shift form check
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 2) {
    errors.last_name = " Name must be at least 2 characters";
  }

  if (!values.start_time) {
    errors.start_time = "Required";
  }
  if (!values.end_time) {
    errors.end_time = "Required";
  }

  if (!values.late_time_count) {
    errors.late_time_count = "Required";
  }

  return errors;
};

export default ShiftValidate;
