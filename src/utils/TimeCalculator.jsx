const calculateTotalHours = (startTime, endTime) => {
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);
  let diff = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
  if (diff < 0) diff += 24; // Adjust for cases where end time is past midnight
  const hours = Math.floor(diff);
  const minutes = Math.round((diff - hours) * 60);
  return `${hours} `;
};

export default calculateTotalHours;
