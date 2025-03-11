import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateWeekendMutation,
  useDeleteWeekendMutation,
  useGetWeekendListQuery,
} from "../../../features/api";

// Define days of the week
const daysOfWeek = [
  { name: "Saturday", key: "saturday" },
  { name: "Sunday", key: "sunday" },
  { name: "Monday", key: "monday" },
  { name: "Tuesday", key: "tuesday" },
  { name: "Wednesday", key: "wednesday" },
  { name: "Thursday", key: "thursday" },
  { name: "Friday", key: "friday" },
];

const WeekdaysTable = () => {
  const [weekends, setWeekends] = useState({
    saturday: false,
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });

  const [createWeekend] = useCreateWeekendMutation();
  const [deleteWeekend] = useDeleteWeekendMutation();
  const companyId = useSelector((state) => state.company.companyId);
  const {
    data: weekendList,
    isLoading,
    isError,
    error,
  } = useGetWeekendListQuery(companyId, {
    skip: companyId == null,
  });

  // Update weekends state with data from API
  useEffect(() => {
    if (weekendList) {
      // Initialize state based on weekendList data
      const initialState = { ...weekends };
      weekendList?.data?.forEach((weekend) => {
        if (daysOfWeek.some((day) => day.key === weekend.name.toLowerCase())) {
          initialState[weekend.name.toLowerCase()] =
            weekend.status === "ACTIVE";
        }
      });
      setWeekends(initialState);
    }
  }, [weekendList]);

  // Handle toggle switch change
  const handleToggle = async (day) => {
    const isCurrentlyActive = weekends[day];
    const newState = !isCurrentlyActive;
    setWeekends((prev) => ({
      ...prev,
      [day]: newState,
    }));
    if (newState) {
      // Create record if the day is being turned on
      try {
        await createWeekend({
          name: day,
          status: "ACTIVE", // Adjust status if needed
          company_id: companyId,
        }).unwrap();
      } catch (error) {
        console.error("Failed to create weekend:", error);
      }
    } else {
      // Delete record if the day is being turned off
      try {
        await deleteWeekend(day).unwrap();
      } catch (error) {
        console.error("Failed to delete weekend:", error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-4xl rounded-lg border border-gray-300 bg-white">
        <div className="p-6">
          <h2 className="mb-4 text-center text-2xl font-semibold">
            Select Weekend
          </h2>
          <table className="w-full rounded-lg border border-gray-200 bg-white">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border-b px-6 py-3 text-left">Day</th>
                <th className="border-b px-6 py-3">Weekend</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map(({ name, key }) => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="border-b px-6 py-3 text-left">{name}</td>
                  <td className="border-b px-6 py-3 text-left">
                    <Switch
                      checked={weekends[key]}
                      onChange={() => handleToggle(key)}
                      style={{ margin: "0 auto", display: "block" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeekdaysTable;
