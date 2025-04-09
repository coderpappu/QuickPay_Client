export const TimeConverterFromUTC = (data) => {
  const dateTimeAsia = data;

  const date = new Date(dateTimeAsia);

  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "UTC", // Ensure the time is treated as UTC
  };

  const formattedTime = date.toLocaleTimeString("en-US", options);

  return formattedTime;
};
export const DateConverterFromUTC = (data) => {
  // Parse the date string to a Date object
  const date = new Date(data);

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
