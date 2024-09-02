import HolidayList from "./HolidayList";
import TypeList from "./type/TypeList";

const Holiday = () => {
  return (
    <div className="flex flex-wrap justify-between">
      <TypeList />
      <HolidayList />
    </div>
  );
};

export default Holiday;
