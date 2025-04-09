const DatePicker = () => {
  let dateCheck = new Date();
  const todayDate = `${dateCheck.getFullYear()}-${String(
    dateCheck.getMonth() + 1,
  ).padStart(2, "0")}-${String(dateCheck.getDate()).padStart(2, "0")}`;

  return todayDate;
};

export default DatePicker;

// Function to convert a UTC date string to a given time zone
export const convertToTimeZone = (dateString, timeZone) => {
  // Parse the date string to a Date object
  const date = new Date(dateString);

  // Get individual components of the date (year, month, day, hours, minutes, seconds)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  // Format the date in the desired format: 'YYYY-MM-DD HH:mm:ss.SSS'
  return `${day}-${month}-${year}`;
};

// Function to format the date to 'YYYY-MM-DD HH:mm:ss.SSS'
export const formatDate = (dateString) => {
  // Parse the date string to a Date object
  const date = new Date(dateString);

  // Get individual components of the date (year, month, day, hours, minutes, seconds)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  // Format the date in the desired format: 'YYYY-MM-DD HH:mm:ss.SSS'
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};
