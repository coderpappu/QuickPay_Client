import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useAddShiftMutation,
  useCreateAllowanceMutation,
  useCreateDeductionMutation,
  useCreateGradeMutation,
  useCreateLeaveTypeMutation,
  useGetAllowanceDetailsQuery,
  useGetCompanyIdQuery,
  useGetDeductionDetailsQuery,
  useGetDeductionListQuery,
  useGetGradeDetailsQuery,
  useGetLeaveTypeDetailsQuery,
  useGetShiftDetailsQuery,
  useGetTypeListQuery,
  useUpdateAllowanceMutation,
  useUpdateDeductionMutation,
  useUpdateGradeMutation,
  useUpdateLeaveTypeMutation,
  useUpdateShiftMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";
import { InputBox } from "../../company/BrandInput";

import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";
import ConfirmDialog from "../../../helpers/ConfirmDialog";

const shiftSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  start_time: Yup.string().required("Start time is required"),
  end_time: Yup.string().required("End time is required"),
  late_time_count: Yup.string().required("Late time is required"),
});

const ShiftForm = ({ shiftId, onClose }) => {
  console.log(shiftId);
  const navigate = useNavigate();

  const { data: companyId } = useGetCompanyIdQuery();
  const [createShift] = useAddShiftMutation();
  const [updateShift] = useUpdateShiftMutation();

  const [initialValues, setInitialValues] = useState({
    name: "",
    start_time: "",
    end_time: "",
    late_time_count: "",
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
      });
    }
  }, [shiftDetails]);

  if (companyId == null) {
    navigate("/");
  }

  if (isShiftLoading && !isError) {
    return <CardSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold  dark:text-dark-heading-color mb-4">
          {shiftId ? "Edit Shift" : "Add Shift"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={shiftSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, start_time, end_time, late_time_count } = values;

            try {
              if (!shiftId) {
                await createShift({
                  name,
                  start_time,
                  end_time,
                  late_time_count,
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
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 px-4 py-2 bg-white rounded-md text-sm font-medium text-gray-800 border border-dark-border-color dark:border-opacity-10 "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#3686FF] rounded-md text-sm font-medium text-white "
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
