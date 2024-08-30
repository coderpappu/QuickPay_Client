import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

// import timeGridPlugin from "@fullcalendar/timegrid";

import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// needed for dayClick

const CalendarSys = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "New Year Holiday", start: "2024-01-01", allDay: true },
    { id: 2, title: "Company Offsite", start: "2024-01-15", end: "2024-01-15" },
    { id: 3, title: "Government Holiday", start: "2024-03-26", allDay: true },
  ]);

  const handleDateClick = (arg) => {
    // Handle the click event on a date
    const newEvent = {
      id: events.length + 1,
      title: "New Event",
      start: arg.dateStr,
    };
    setEvents([...events, newEvent]);
  };

  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) =>
      event.id === parseInt(info.event.id)
        ? { ...event, start: info.event.startStr }
        : event
    );
    setEvents(updatedEvents);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
      editable={true}
      eventDrop={handleEventDrop}
    />
  );
};

export default CalendarSys;
