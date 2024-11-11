function formatTimeTo12Hour(time) {
  if (!time) return "00"; // Return "N/A" if time is null or an empty string

  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for midnight and adjust other hours

  return `${adjustedHour}:${minutes} ${period}`;
}

export default formatTimeTo12Hour;
