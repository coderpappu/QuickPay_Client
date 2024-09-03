import React from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState } from "react";
import {
  useGetCompanyIdQuery,
  useGetHolidayListQuery,
  useGetWeekendListQuery,
} from "../../features/api";
import EventPopup from "../../utils/EventPopup";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const { data: holidays } = useGetHolidayListQuery(companyId, {
    skip: companyId == null,
  });

  const { data: weekends } = useGetWeekendListQuery(companyId, {
    skip: companyId == null,
  });

  const weekendDays =
    weekends?.data?.map((day) => day.name.toLowerCase()) || [];

  // Dummy event data for demonstration

  // Convert holidays to event format
  const events =
    holidays?.data?.map((holiday) => ({
      title: holiday.name,
      start: new Date(holiday.from_date),
      end: new Date(holiday.to_date),
      allDay: true,
      resource: {
        description: holiday.description,
        holidayType: holiday.HolidayType.name,
      },
    })) || [];

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  // Custom style function
  function eventStyleGetter(event, start, end, isSelected) {
    const dayOfWeek = moment(start).format("dddd").toLowerCase();
    const isWeekend = weekendDays.includes(dayOfWeek);

    const style = {
      backgroundColor: isWeekend ? "lightcoral" : "#3174ad", // Apply color for weekends
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };

    return {
      style: style,
    };
  }

  // Custom dayPropGetter to style entire days
  function dayPropGetter(date) {
    const dayOfWeek = moment(date).format("dddd").toLowerCase();
    const isWeekend = weekendDays.includes(dayOfWeek);

    const style = {
      backgroundColor: isWeekend ? "#FFCCCC" : null, // Light red for weekends
    };

    return {
      style: style,
    };
  }

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        defaultView="month"
        views={["month", "week", "day", "agenda"]}
        step={30}
        selectables
        popup
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter} // Apply custom styles to entire days
      />
      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default MyCalendar;
