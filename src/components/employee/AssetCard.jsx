import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import {
  useGetAllDocsTypeListQuery,
  useGetCompanyIdQuery,
  useUploadImageMutation,
} from "../../features/api";
import { modifyPayload } from "../../utils/modifyPayload";

const AssetCard = () => {
  // API call section
  const { data: companyId } = useGetCompanyIdQuery();
  const [uploadImage] = useUploadImageMutation();
  const {
    data: docsList,
    isLoading,
    isError,
  } = useGetAllDocsTypeListQuery(companyId);

  if (isLoading && !isError) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  // Set initial values for the form
  const initialValues = { file: null }; // Initialize file value

  return (
    <div className="w-full   mx-5 mt-5 mb-2 rounded-mde flex flex-wrap justify-between ">
      <div className="w-[49%] relative p-4 bg-white dark:bg-dark-card rounded-md">
        <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
          Asset Upload
        </h1>
        {docsList?.data?.map((doc) => (
          <div key={doc.id}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              // Add your validationSchema here
              onSubmit={async (values, { setSubmitting }) => {
                const formData = modifyPayload({
                  companyName: "codex",
                  employeeName: "pappu",
                  file: values.file,
                });

                try {
                  const response = await uploadImage(formData).unwrap();
                  console.log("Upload response:", response);
                } catch (error) {
                  console.error("Upload error:", error.data || error.message);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="flex flex-wrap items-center gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="file"
                      className="block text-sm font-medium dark:text-dark-text-color"
                    >
                      {doc?.name}
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("file", file); // Set file in Formik's values
                      }}
                      className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3686FF] focus:border-[#3686FF] sm:text-sm"
                    />
                    <ErrorMessage
                      name="file"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetCard;
