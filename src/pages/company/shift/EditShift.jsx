import React from "react";
import { useParams } from "react-router-dom";
import { useGetShiftQuery } from "../../../features/api";
import ShiftForm from "./ShiftForm";

const EditShift = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetShiftQuery(id);
  let content = null;
  if (isLoading && !isError) content = "Loading...";
  if (isError && !isLoading) content = "There was an error ";
  if (!isLoading && !isError && data.length === 0)
    content = "No Shift Available";
  if (!isLoading && !isError && data)
    content = (
      <div>
        <h1 className="text-2xl font-semibold m-auto mb-4">
          Update The {data.name} Data{" "}
        </h1>
        <ShiftForm shiftData={data} />
      </div>
    );

  return content;
};

export default EditShift;
