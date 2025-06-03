import { Calendar, Info, X } from "lucide-react";

const EventPopup = ({ event, onClose, isDarkMode }) => {
  const isHoliday = event.resource?.type === "holiday";
  const isWeekend = event.resource?.type === "weekend";

  // Format date range
  const formatDateRange = () => {
    const start = new Date(event.start);
    const end = new Date(event.end);

    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date);
    };

    // If same day event
    if (start.toDateString() === end.toDateString()) {
      return formatDate(start);
    }

    // If multi-day event
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  // Get background color based on event type
  const getHeaderColor = () => {
    if (isWeekend) return isDarkMode ? "#805200" : "#FFA500";
    if (isHoliday) return isDarkMode ? "#3730a3" : "#4F46E5";
    return isDarkMode ? "#0f766e" : "#15B392";
  };

  return (
    <div className={`event-popup-overlay ${isDarkMode ? "dark-overlay" : ""}`}>
      <div className={`event-popup ${isDarkMode ? "dark-popup" : ""}`}>
        <div
          className="event-popup-header"
          style={{ backgroundColor: getHeaderColor() }}
        >
          <h3 className="event-popup-title">{event.title}</h3>
          <button className="event-popup-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="event-popup-content">
          <div className="event-popup-detail">
            <Calendar size={18} />
            <span>{formatDateRange()}</span>
          </div>

          {isHoliday && event.resource?.holidayType && (
            <div className="event-popup-detail">
              <Info size={18} />
              <span>Type: {event.resource.holidayType}</span>
            </div>
          )}

          {event.resource?.description && (
            <div className="event-popup-description">
              <h4>Description</h4>
              <p>{event.resource.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
