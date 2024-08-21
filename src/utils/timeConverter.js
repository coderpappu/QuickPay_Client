function formatTimeTo12Hour(time) {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for midnight and adjust other hours

  return `${adjustedHour}:${minutes} ${period}`;
}

export default formatTimeTo12Hour;
