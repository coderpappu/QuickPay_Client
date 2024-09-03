import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsCalendarFill } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";
const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };

  const label = () => {
    return (
      <span className="text-lg font-semibold text-gray-800">
        {toolbar.label}
      </span>
    );
  };

  const goToView = (view) => {
    toolbar.onView(view);
  };

  const handleViewChange = (event) => {
    toolbar.onView(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <button
          onClick={goToToday}
          className="text-gray-600 hover:text-blue-600 focus:outline-none flex items-center"
        >
          <GoCalendar size={16} className="mr-2" />
          Today
        </button>

        <button
          onClick={goToBack}
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          <AiOutlineLeft size={16} />
        </button>

        <button
          onClick={goToNext}
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          <AiOutlineRight size={16} />
        </button>
      </div>

      <div className="flex justify-center">{label()}</div>
      <div className="flex items-center space-x-2">
        <select
          onChange={handleViewChange}
          value={toolbar.view}
          className="px-3 py-1 text-sm font-medium rounded bg-white border border-gray-300 hover:border-blue-400 focus:outline-none"
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
          <option value="agenda">Agenda</option>
        </select>
      </div>
    </div>
  );
};

export default CustomToolbar;
