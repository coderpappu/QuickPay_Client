import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateNewSectionMutation,
  useGetSectionDetailsQuery,
  useUpdateSectionMutation,
} from "../../features/api";
import FormSkeleton from "../../skeletons/FormSkeleton";

const SectionSchema = Yup.object().shape({
  name: Yup.string().required("Section Name is required"),
});
const SectionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [createNewSection] = useCreateNewSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [initialValues, setInitialValues] = useState({ name: "" });

  const { data: section, isLoading: isSectionLoading } =
    useGetSectionDetailsQuery(id, { skip: !id });

  useEffect(() => {
    if (section?.data) {
      setInitialValues({ name: section?.data?.name });
    }
  }, [section]);

  const companyId = useSelector((state) => state.company.companyId);

  if (isSectionLoading) {
    return <FormSkeleton />;
  }

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={SectionSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { name } = values;
          if (id == null) {
            await createNewSection({ name, company_id: companyId })
              .then((res) => {
                if (res.error != null) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Section created successfully");
                  navigate("/section/list");
                  setSubmitting(false);
                }
              })
              .catch((error) => {
                toast.error(error);
              });
          } else {
            await updateSection({ id, name, company_id: companyId })
              .then((res) => {
                if (res.error != null) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Section updated successfully");
                  navigate("/section/list");
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
            <div className="flex items-end space-x-4">
              <div className="flex-grow">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Section name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="flex-none">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-md border border-transparent bg-[#3686FF] px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SectionForm;
