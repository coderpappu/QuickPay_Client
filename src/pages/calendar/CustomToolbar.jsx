import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  LayoutGrid,
  List,
} from "lucide-react";

const CustomToolbar = ({
  date,
  onNavigate,
  onView,
  view,
  views,
  isDarkMode,
}) => {
  // Format the current date display
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);

  // Navigate to today
  const goToToday = () => {
    onNavigate("TODAY");
  };

  // Navigate back
  const goBack = () => {
    onNavigate("PREV");
  };

  // Navigate forward
  const goNext = () => {
    onNavigate("NEXT");
  };

  // Get icon for a view
  const getViewIcon = (viewName) => {
    switch (viewName) {
      case "month":
        return <LayoutGrid size={18} />;
      case "week":
        return <CalendarIcon size={18} />;
      case "day":
        return <Clock size={18} />;
      case "agenda":
        return <List size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className={`toolbar-container ${isDarkMode ? "dark-toolbar" : ""}`}>
      <div className="toolbar-date-section">
        <button onClick={goToToday} className="toolbar-today-btn">
          Today
        </button>
        <div className="toolbar-nav-buttons">
          <button onClick={goBack} className="toolbar-nav-btn">
            <ChevronLeft size={20} />
          </button>
          <button onClick={goNext} className="toolbar-nav-btn">
            <ChevronRight size={20} />
          </button>
        </div>
        <h2 className="toolbar-title">{formattedDate}</h2>
      </div>

      <div className="toolbar-view-selector">
        {views.map((viewOption) => (
          <button
            key={viewOption}
            onClick={() => onView(viewOption)}
            className={`toolbar-view-btn ${view === viewOption ? "active" : ""}`}
          >
            {getViewIcon(viewOption)}
            <span>
              {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomToolbar;
