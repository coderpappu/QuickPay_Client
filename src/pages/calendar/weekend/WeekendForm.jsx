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
} from "../../../features/api";
import FormSkeleton from "../../../skeletons/FormSkeleton";

const WeekendSchema = Yup.object().shape({
  name: Yup.string().required("Weekend Name is required"),
  status: Yup.string().required("Status is required"),
});

const WeekendForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [createWeekend] = useCreateWeekendMutation();
  const [updateWeekend] = useUpdateWeekendMutation();
  const [initialValues, setInitialValues] = useState({ name: "", status: "" });

  const { data: weekend, isLoading: isDesignationLoading } =
    useGetWeekendDetailsQuery(id, { skip: !id });

  useEffect(() => {
    if (weekend?.data) {
      setInitialValues({
        name: weekend?.data?.name,
        status: weekend?.data?.status,
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
          const { name, status } = values;
          if (id == null) {
            await createWeekend({ name, status, company_id: companyId })
              .then((res) => {
                if (res.error != null) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Weekend added successfully");
                  navigate("/weekend/list");
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
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weekend name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex-grow">
                <label
                  htmlFor="select"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  id="status"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </Field>
                <ErrorMessage
                  name="status"
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

export default WeekendForm;