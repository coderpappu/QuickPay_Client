import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { InputBox } from "../../components/company/BrandInput";
import {
  useAddModulePermissionMutation,
  useGetModuleDetailsQuery,
  useGetModuleListQuery,
  useUpdateModuleDetailsMutation,
} from "../../features/api";

const permissionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  slug: Yup.string().required("Slug is required"),
});

const PermissionForm = ({ moduleId, onClose }) => {
  const navigate = useNavigate();
  const { data: moduleList } = useGetModuleListQuery();
  const [addModulePermission] = useAddModulePermissionMutation();
  const { data: moduleDetails } = useGetModuleDetailsQuery(moduleId);
  const [updateModulePermission] = useUpdateModuleDetailsMutation();

  const [initialValues, setInitialValues] = useState({
    name: "",
    slug: "",
    parent_id: "",
  });

  useEffect(() => {
    if (moduleId) {
      const module = moduleList?.data?.find((mod) => mod.id === moduleId);
      if (module) {
        setInitialValues({
          name: module.name,
          slug: module.slug,
          parent_id: module.parent_id || "",
        });
      }
    }
  }, [moduleId, moduleList]);

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
          {moduleId ? "Edit Permission" : "Add Permission"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={permissionSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { name, slug, parent_id } = values;

              if (!moduleId) {
                await addModulePermission({
                  name,
                  slug,
                  parent_id: parent_id || null,
                }).unwrap();

                toast.success("Permission added successfully");
              } else {
                // Handle update logic here
                await updateModulePermission({
                  moduleId,
                  name,
                  slug,
                  parent_id: parent_id || null,
                }).unwrap();
                toast.success("Permission updated successfully");
              }
              onClose();
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
                  htmlFor="slug"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Slug
                </label>
                <InputBox name="slug" type="text" placeholder="Slug" />
                <ErrorMessage
                  name="slug"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="parent_id"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Parent Module
                </label>
                <Field
                  as="select"
                  name="parent_id"
                  className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                >
                  <option value="">None</option>
                  {moduleList?.data
                    ?.filter((mod) => !mod.parent_id)
                    .map((module) => (
                      <option key={module.id} value={module.id}>
                        {module.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="parent_id"
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
                  {moduleId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PermissionForm;
