import { format, getDay, parse, startOfWeek } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { dateFnsLocalizer } from "react-big-calendar";

// Create a localizer for the calendar
export const createLocalizer = () => {
  const locales = {
    "en-US": enUS,
  };

  return dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
};

// Format date to string
export const formatDate = (date, formatString = "yyyy-MM-dd") => {
  return format(new Date(date), formatString);
};

// Check if a date is a weekend
export const isWeekend = (date, weekendDays = ["saturday", "sunday"]) => {
  const dayName = format(new Date(date), "EEEE").toLowerCase();
  return weekendDays.includes(dayName);
};

// Get month name
export const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return format(date, "MMMM");
};
