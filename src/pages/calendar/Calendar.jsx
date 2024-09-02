import React from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
} from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import {
  useGetCompaniesQuery,
  useGetCompanyIdQuery,
  useGetHolidayListQuery,
  useGetWeekendListQuery,
} from "../../features/api";

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

  // Assume weekend data includes days like ["Friday", "Saturday"]
  const { data: weekends } = useGetWeekendListQuery(companyId, {
    skip: companyId == null,
  });

  const weekendDays =
    weekends?.data?.map((day) => day.name.toLowerCase()) || [];

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

  // Create a function to check if a day is a weekend
  const isWeekend = (date) => {
    const dayName = moment(date).format("dddd").toLowerCase();
    return weekendDays.includes(dayName);
  };

  // Custom style function
  function eventStyleGetter(event, start, end, isSelected) {
    const backgroundColor = isWeekend(start) ? "#D3D3D3" : "#3174ad";
    return {
      style: {
        backgroundColor,
        borderRadius: "0px",
        opacity: 0.8,
        color: "black",
        border: "0px",
        display: "block",
      },
    };
  }

  const handleSelectEvent = (event) => {
    alert(`Event: ${event.title}`);
  };

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
        selectable
        popup
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MyCalendar;
