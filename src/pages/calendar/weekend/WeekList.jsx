import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import {
  useCreateWeekendMutation,
  useDeleteWeekendMutation,
  useGetCompanyIdQuery,
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
  const { data: companyId } = useGetCompanyIdQuery();
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
      <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Select Weekend
          </h2>
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-6 border-b text-left">Day</th>
                <th className="py-3 px-6 border-b">Weekend</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map(({ name, key }) => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="py-3 px-6 border-b text-left">{name}</td>
                  <td className="py-3 px-6 border-b text-left">
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
