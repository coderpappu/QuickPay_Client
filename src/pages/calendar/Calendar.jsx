import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

const events = [
  {
    id: 0,
    title: "Board Meeting",
    allDay: false,
    start: new Date(2024, 8, 12, 10, 0),
    end: new Date(2024, 8, 12, 12, 30),
  },
  {
    id: 1,
    title: "Team Stand-up",
    allDay: false,
    start: new Date(2024, 8, 13, 9, 0),
    end: new Date(2024, 8, 13, 9, 30),
  },
  {
    id: 2,
    title: "Project Deadline",
    allDay: true,
    start: new Date(2024, 8, 15),
    end: new Date(2024, 8, 15),
  },
];

const MyCalendar = () => {
  const [myEvents, setMyEvents] = useState(events);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("Enter event title");
    if (title) {
      setMyEvents([
        ...myEvents,
        {
          id: myEvents.length,
          title,
          start,
          end,
        },
      ]);
    }
  };

  const handleSelectEvent = (event) => {
    alert(`Event: ${event.title}`);
  };

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <BigCalendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        defaultView="month"
        views={["month", "week", "day", "agenda"]}
        step={30}
        selectable
        popup
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default MyCalendar;
