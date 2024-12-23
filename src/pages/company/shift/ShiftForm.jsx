import { Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/user/InputField";
import ShiftValidate from "../../../components/validationSchmea/shiftValidation";
import {
  useAddShiftMutation,
  useGetCompanyIdQuery,
  useUpdateShiftMutation,
} from "../../../features/api";

const ShiftForm = ({ shiftData }) => {
  const [shiftAdd, { data, isLoading, isError, error }] = useAddShiftMutation();
  const [updateShift, { data: updataData }] = useUpdateShiftMutation();
  const {
    data: companyId,
    isLoading: idLoading,
    isError: idError,
  } = useGetCompanyIdQuery();

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
          company_id: companyId,
        }).unwrap();

        toast.success("Shift successfully added");
        navigate("/company/shift/list");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    } else {
      try {
        await updateShift({
          // eslint-disable-next-line react/prop-types
          helperKeys: { id: shiftData?.id, company_Id: companyId },
          databody: { name, start_time, end_time, late_time_count },
        });
        toast.success("Successfully updated");
        navigate("/company/shift/list");
      } catch (error) {
        toast.error(error?.data?.message);
      } finally {
        setSubmitting(false);
      }
    }
  };
  return (
    <div className="m-auto py-4 md:w-full lg:w-[400px]">
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
              className="mt-4 rounded-md bg-[#61638A] px-10 py-2 text-white lg:px-16 lg:py-3"
              type="submit"
              disabled={isSubmitting}
            >
              Add Shift
            </button>
            {/* <Toaster position="bottom right" /> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShiftForm;
