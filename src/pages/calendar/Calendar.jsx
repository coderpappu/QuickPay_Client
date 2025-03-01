import { format, getDay, parse, startOfWeek } from "date-fns";
import enUS from "date-fns/locale/en-US";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  useGetCompanyIdQuery,
  useGetEmployeeQuery,
  useGetHolidayListQuery,
  useGetWeekendListQuery,
} from "../../features/api";
import EventPopup from "../../utils/EventPopup";
import CustomToolbar from "../../utils/Toolbar";

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

  const { data } = useGetEmployeeQuery();

  const { data: holidaysData } = useGetHolidayListQuery(companyId, {
    skip: companyId == null,
  });

  const { data: weekendsData } = useGetWeekendListQuery(companyId, {
    skip: companyId == null,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeEnabled);
  }, []);

  // Extract weekend days (e.g., "friday")
  const weekendDays =
    weekendsData?.data?.map((day) => day.name.toLowerCase()) || [];

  // Convert holidays to event format
  const holidays =
    holidaysData?.data?.holidays?.map((holiday) => ({
      title: holiday.name,
      start: new Date(holiday.from_date),
      end: new Date(holiday.to_date),
      allDay: true,
      resource: {
        description: holiday.description,
        holidayType: holiday.HolidayType?.name,
      },
    })) || [];

  // Convert fridays to event format
  const fridays =
    holidaysData?.data?.fridayDates?.map((date) => ({
      title: "Friday (Weekend)",
      start: new Date(date),
      end: new Date(date),
      allDay: true,
      resource: {
        description: "Weekly weekend",
      },
    })) || [];

  // Merge holidays and fridays into events list
  const events = [...holidays, ...fridays];

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  // Custom event styling
  function eventStyleGetter(event, start, end, isSelected) {
    const dayOfWeek = moment(start).format("dddd").toLowerCase();
    const isFriday = event.title.includes("Friday");
    const isWeekend = weekendDays.includes(dayOfWeek);

    const style = {
      backgroundColor: isFriday
        ? "#FFA500"
        : isWeekend
          ? "lightcoral"
          : "#15B392",
      borderRadius: "4px",
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
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const isFriday = holidaysData?.data?.fridayDates?.includes(formattedDate);

    const style = {
      backgroundColor: isFriday ? "#FFF3CD" : "#fff",
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
        className="rounded-sm p-4 dark:bg-dark-card"
        defaultView="month"
        views={["month", "week", "day", "agenda"]}
        step={30}
        popup
        components={{
          toolbar: CustomToolbar,
        }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
      />
      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default MyCalendar;
