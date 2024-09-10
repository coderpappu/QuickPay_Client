import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
    useCreateNewSectionMutation,
    useGetCompanyIdQuery,
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

  const { data: companyId } = useGetCompanyIdQuery();

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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex-none">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
