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
  const dateTimeAsia = data;

  const date = new Date(dateTimeAsia);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC", // Ensure the date is treated as UTC
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Convert the formatted date to MM-DD-YYYY format
  const [month, day, year] = formattedDate.split("/");
  return `${month}-${day}-${year}`;
};
