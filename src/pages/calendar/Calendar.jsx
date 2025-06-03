import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar as BigCalendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import {
  useGetEmployeeQuery,
  useGetHolidayListQuery,
  useGetWeekendListQuery,
} from "../../features/api";
import "./calendarStyles.css";
import { createLocalizer } from "./calendarUtils";
import CustomToolbar from "./CustomToolbar";
import EventPopup from "./EventPopup";

const MyCalendar = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-12
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const companyId = useSelector((state) => state.company.companyId);
  const localizer = createLocalizer();

  const { data } = useGetEmployeeQuery();

  const { data: holidaysData } = useGetHolidayListQuery(
    { companyId, month, year },
    { skip: !companyId },
  );

  const { data: weekendsData } = useGetWeekendListQuery(companyId, {
    skip: companyId == null,
  });

  // Detect dark mode from system preference or document class
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Initial check
    checkDarkMode();

    // Create an observer to watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Handler to update month/year when calendar view changes
  const handleNavigate = (date) => {
    setMonth(date.getMonth() + 1); // JS months are 0-based
    setYear(date.getFullYear());
  };

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
        type: "holiday",
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
        type: "weekend",
      },
    })) || [];

  // Merge holidays and fridays into events list
  const events = [...holidays, ...fridays];

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  // Custom event styling
  const eventStyleGetter = (event) => {
    const isFriday = event.resource?.type === "weekend";
    const isHoliday = event.resource?.type === "holiday";

    let backgroundColor = "#15B392"; // Default color

    if (isFriday) {
      backgroundColor = "#FFA500"; // Orange for weekends
    } else if (isHoliday) {
      backgroundColor = "#4F46E5"; // Purple for holidays
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
        padding: "4px 8px",
        fontWeight: "500",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.1s ease, opacity 0.1s ease",
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    };
  };

  // Custom dayPropGetter to style entire days
  const dayPropGetter = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const isFriday = holidaysData?.data?.fridayDates?.includes(formattedDate);
    const dayOfWeek = moment(date).format("dddd").toLowerCase();
    const isWeekend = weekendDays.includes(dayOfWeek);

    let backgroundColor = "#fff";
    let textColor = undefined;

    if (isDarkMode) {
      backgroundColor = "#23272f";
      textColor = "#fff";

      if (isFriday || isWeekend) {
        backgroundColor = "#3a2e13";
      }
    } else {
      if (isFriday || isWeekend) {
        backgroundColor = "#FFF3CD";
      }
    }

    return {
      style: {
        backgroundColor,
        color: textColor,
        transition: "background-color 0.3s ease",
      },
    };
  };

  return (
    <div
      className={`calendar-container ${isDarkMode ? "dark-theme" : "light-theme"}`}
      data-theme={isDarkMode ? "dark" : "light"}
    >
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 700,
          borderRadius: "12px",
          overflow: "hidden",
        }}
        className={`calendar-main ${isDarkMode ? "dark-calendar" : ""}`}
        defaultView="month"
        views={["month", "week", "day", "agenda"]}
        step={30}
        popup
        components={{
          toolbar: (props) => (
            <CustomToolbar {...props} isDarkMode={isDarkMode} />
          ),
        }}
        onSelectEvent={handleSelectEvent}
        onNavigate={handleNavigate}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
      />
      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          onClose={handleClosePopup}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default MyCalendar;
