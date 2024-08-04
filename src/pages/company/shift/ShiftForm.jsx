import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import formValidate from "../../../components/validationSchmea/UserValidation";
import InputField from "../../../components/user/InputField";
import {
  useAddShiftMutation,
  useUpdateShiftMutation,
} from "../../../features/api";
import toast, { Toaster } from "react-hot-toast";
import ShiftValidate from "../../../components/validationSchmea/shiftValidation";

const ShiftForm = ({ shiftData }) => {
  const [shiftAdd, { data, isLoading, isError }] = useAddShiftMutation();
  const [updateShift, { data: updataData }] = useUpdateShiftMutation();

  const navigate = useNavigate();

  const handleUpdate = async (values, { setSubmitting }) => {
    const { name, start_time, end_time, late_time_count } = values;

    if (!shiftData) {
      try {
        await shiftAdd({
          name,
          start_time,
          end_time,
          late_time_count,
        });

        navigate("/company/shift/list");
      } catch (error) {
        console.error(error.message);
      } finally {
        setSubmitting(false);
      }
    } else {
      try {
        await updateShift({
          // eslint-disable-next-line react/prop-types
          id: shiftData?._id,
          name,
          start_time,
          end_time,
          late_time_count,
        });

        navigate("/company/shift/list");
      } catch (error) {
        console.error(error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };
  return (
    <div className="py-4 md:w-full lg:w-[400px]  m-auto">
      <Formik
        initialValues={{
          name: shiftData?.name,
          start_time: shiftData?.start_time,
          end_time: shiftData?.end_time,
          late_time_count: shiftData?.late_time_count,
        }}
        validate={ShiftValidate}
        onSubmit={handleUpdate}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="Name"
              name="name"
              type="text"
              placeholder="Day Shift"
            />
            <InputField
              label="Start Time"
              name="start_time"
              type="time"
              placeholder=""
            />
            <InputField
              label="End Time"
              name="end_time"
              type="time"
              placeholder=""
            />
            <InputField
              label="Late Time Count"
              name="late_time_count"
              type="time"
              placeholder=""
            />

            <button
              className="px-10 py-2 lg:px-16 lg:py-3 bg-[#61638A] rounded-md text-white mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              Add Shift
            </button>
            <Toaster position="bottom right" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShiftForm;
