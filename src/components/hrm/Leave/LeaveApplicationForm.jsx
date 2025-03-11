import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  useGetLeaveApplicationDetailsQuery,
  useUpdateLeaveApplicationMutation,
  useUpdateLeaveTypeMutation,
} from "../../../features/api";
const applicationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  paid_status: Yup.string().required("Paid Status is required"),
  note: Yup.string().required("Note is required"),
});

const LeaveApplicationForm = ({ selectId, setIsPopupOpen }) => {
  const companyId = useSelector((state) => state.company.companyId);

  const [updateLeaveType] = useUpdateLeaveTypeMutation();

  const { data: leaveApplicationDetails, isLoading } =
    useGetLeaveApplicationDetailsQuery(selectId, { skip: !selectId });

  const [initialValues, setInitialValues] = useState({
    status: "",
    paid_status: "",
    note: "",
  });

  const [applicationUpdate] = useUpdateLeaveApplicationMutation();

  useEffect(() => {
    if (leaveApplicationDetails?.data) {
      setInitialValues({
        status: leaveApplicationDetails?.data?.status,
        paid_status: leaveApplicationDetails?.data?.paid_status,
        note: leaveApplicationDetails?.data?.note,
      });
    }
  }, [leaveApplicationDetails]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setIsPopupOpen(false)}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Update application
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={applicationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { status, paid_status, note } = values;

            try {
              await applicationUpdate({
                id: selectId,
                status,
                paid_status,
                note,
                company_id: companyId,
              }).then((res) => {
                if (res.error) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Appcation updated successfully");

                  setIsPopupOpen(false);
                }
              });
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
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  id="status"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="paid_status"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Paid Status
                </label>
                <Field
                  as="select"
                  name="paid_status"
                  id="paid_status"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                >
                  <option value="PAID">Paid</option>
                  <option value="UNPAID">Unpaid</option>
                </Field>
                <ErrorMessage
                  name="paid_status"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-color"
                >
                  Note
                </label>
                <Field
                  type="text"
                  name="note"
                  id="note"
                  placeHolder="Note"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm dark:border-none dark:bg-dark-box dark:text-dark-text-color"
                />
                <ErrorMessage
                  name="note"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 dark:bg-dark-box dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#3686FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5A21B3]"
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
