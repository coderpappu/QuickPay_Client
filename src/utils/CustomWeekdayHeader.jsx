import React from "react";
import { getDay, format } from "date-fns";

const CustomWeekdayHeader = ({ date }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
      {weekdays.map((day, index) => (
        <div
          key={index}
          className="flex-1 text-center font-semibold text-gray-600"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default CustomWeekdayHeader;
