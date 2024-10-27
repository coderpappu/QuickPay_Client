
const DatePicker = () => {
  let dateCheck = new Date();
  const todayDate = `${dateCheck.getFullYear()}-${String(
    dateCheck.getMonth() + 1
  ).padStart(2, "0")}-${String(dateCheck.getDate()).padStart(2, "0")}`;

  return todayDate;
};

export default DatePicker;
