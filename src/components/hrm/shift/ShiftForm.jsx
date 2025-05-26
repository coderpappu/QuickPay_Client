import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useAddShiftMutation,
  useGetShiftDetailsQuery,
  useUpdateShiftMutation,
} from "../../../features/api";

import { useSelector } from "react-redux";
import FormSkeleton from "../../../skeletons/FormSkeleton";
import { InputBox } from "../../company/BrandInput";

const shiftSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  start_time: Yup.string().required("Start time is required"),
  end_time: Yup.string().required("End time is required"),
  late_time_count: Yup.string().required("Late time is required"),
});

const ShiftForm = ({ shiftId, onClose }) => {
  const navigate = useNavigate();

  const companyId = useSelector((state) => state.company.companyId);
  const [createShift] = useAddShiftMutation();
  const [updateShift] = useUpdateShiftMutation();

  const [initialValues, setInitialValues] = useState({
    name: "",
    start_time: "",
    end_time: "",
    late_time_count: "",
    early_out_count: "",
  });

  const {
    data: shiftDetails,
    isLoading: isShiftLoading,
    isError,
  } = useGetShiftDetailsQuery(shiftId, { skip: !shiftId });

  useEffect(() => {
    if (shiftDetails?.data) {
      setInitialValues({
        name: shiftDetails?.data?.name,
        start_time: shiftDetails?.data?.start_time,
        end_time: shiftDetails?.data?.end_time,
        late_time_count: shiftDetails?.data?.late_time_count,
        early_out_count: shiftDetails?.data?.early_out_count,
      });
    }
  }, [shiftDetails]);

  if (companyId == null) {
    navigate("/");
  }

  if (isShiftLoading && !isError) {
    return <FormSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold dark:text-dark-heading-color">
          {shiftId ? "Edit Shift" : "Add Shift"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={shiftSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const {
              name,
              start_time,
              end_time,
              late_time_count,
              early_out_count,
            } = values;

            try {
              if (!shiftId) {
                await createShift({
                  name,
                  start_time,
                  end_time,
                  late_time_count,
                  early_out_count,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Shifts added successfully");

                    onClose();
                  }
                });
              } else {
                await updateShift({
                  id: shiftId,
                  name,
                  start_time,
                  end_time,
                  late_time_count,
                  early_out_count,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Shift updated successfully");
                    onClose();
                  }
                });
              }
            } catch (error) {
              toast.error("An error occurred while submitting the form.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Name
                </label>

                <InputBox name="name" type="text" placeholder="Name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="start_time"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Start Time
                </label>

                <InputBox name="start_time" type="time" />
                <ErrorMessage
                  name="start_time"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="end_time"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  End Time
                </label>

                <InputBox name="end_time" type="time" />
                <ErrorMessage
                  name="end_time"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="late_time_count"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Late Time
                </label>

                <InputBox name="late_time_count" type="time" />
                <ErrorMessage
                  name="late_time_count"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="early_out_count"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Early Out Time
                </label>

                <InputBox name="early_out_count" type="time" />
                <ErrorMessage
                  name="early_out_count"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 rounded-md border border-dark-border-color bg-white px-4 py-2 text-sm font-medium text-gray-800 dark:border-opacity-10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#3686FF] px-4 py-2 text-sm font-medium text-white"
                >
                  {shiftId ? "Update" : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ShiftForm;
