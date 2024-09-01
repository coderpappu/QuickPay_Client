import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import {
  useGetDesignationDetailsQuery,
  useUpdateDesignationMutation,
  useGetCompanyIdQuery,
  useCreateWeekendMutation,
  useGetWeekendDetailsQuery,
  useUpdateWeekendMutation,
  useCreateHolidayTypeMutation,
  useDeleteTypeMutation,
} from "../../../../features/api";

import FormSkeleton from "../../../../skeletons/FormSkeleton";

const WeekendSchema = Yup.object().shape({
  type: Yup.string().required("Weekend Name is required"),
});

const HolidayForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [createHolidayType] = useCreateHolidayTypeMutation();
  const [updateWeekend] = useDeleteTypeMutation();
  const [initialValues, setInitialValues] = useState({ type: "" });

  const { data: weekend, isLoading: isDesignationLoading } =
    useGetWeekendDetailsQuery(id, { skip: !id });

  useEffect(() => {
    if (weekend?.data) {
      setInitialValues({
        name: weekend?.data?.name,
      });
    }
  }, [weekend]);

  const { data: companyId } = useGetCompanyIdQuery();

  if (companyId == null) {
    navigate("/");
  }

  if (isDesignationLoading) {
    return <FormSkeleton />;
  }

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={WeekendSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { type } = values;
          if (id == null) {
            await createHolidayType({ type, company_id: companyId })
              .then((res) => {
                if (res.error != null) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Weekend added successfully");
                  navigate("/holiday");
                  setSubmitting(false);
                }
              })
              .catch((error) => {
                toast.error(error);
              });
          } else {
            await updateWeekend({ id, name, company_id: companyId, status })
              .then((res) => {
                if (res?.error != null) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Weekend updated successfully");
                  navigate("/designation/list");
                  setSubmitting(false);
                }
              })
              .catch((error) => {
                toast.error(error);
              });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-lg">
            <div className=" ">
              <div className="flex-grow">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Holiday Type
                </label>
                <Field
                  type="select"
                  name="type"
                  id="type"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Holiday Type</option>
                  <option value="public">Public Holiday</option>
                  <option value="special">Special Holiday</option>
                </Field>

                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex-grow">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Time
                </label>
                <Field
                  type="text"
                  name="type"
                  id="type"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex-grow">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Time
                </label>
                <Field
                  type="text"
                  name="type"
                  id="type"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex-none mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HolidayForm;
