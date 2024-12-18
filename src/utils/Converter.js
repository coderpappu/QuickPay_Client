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
