import { Form, Formik } from "formik";
import React, { useState } from "react";
import {
  useGetAllDocsTypeListQuery,
  useGetCompanyIdQuery,
  useUploadImageMutation,
} from "../../features/api";
import { modifyPayload } from "../../utils/modifyPayload";

const AssetCard = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const [uploadImage] = useUploadImageMutation();
  const {
    data: docsList,
    isLoading,
    isError,
  } = useGetAllDocsTypeListQuery(companyId);

  // Use an object to manage previews for each doc by its ID
  const [imagePreviews, setImagePreviews] = useState({});

  if (isLoading && !isError) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  const initialValues = { file: null };

  const handleFileChange = (event, docId, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("file", file);
      // Set preview specifically for this doc ID
      setImagePreviews((prev) => ({
        ...prev,
        [docId]: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="w-full mx-5 mt-5 mb-2 rounded-md flex flex-wrap justify-between ">
      <div className="w-[49%] relative p-4 bg-white dark:bg-dark-card rounded-md">
        <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
          Asset Upload
        </h1>
        {docsList?.data?.map((doc) => (
          <div key={doc.id}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
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
                      htmlFor={`file-${doc.id}`}
                      className="block text-sm font-medium dark:text-dark-text-color"
                    >
                      {doc?.name}
                    </label>

                    {!imagePreviews[doc.id] ? (
                      <label
                        htmlFor={`dropzone-file-${doc.id}`}
                        className="flex flex-col items-center justify-center w-[350px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id={`dropzone-file-${doc.id}`}
                          type="file"
                          name="file"
                          className="hidden"
                          onChange={(event) =>
                            handleFileChange(event, doc.id, setFieldValue)
                          }
                        />
                      </label>
                    ) : (
                      <div className="flex justify-center mt-4">
                        <img
                          className="h-64 w-64  object-cover object-center"
                          src={imagePreviews[doc.id]}
                          alt="Uploaded Preview"
                        />
                      </div>
                    )}
                  </div>
                  {imagePreviews[doc.id] && (
                    <button
                      type="button"
                      onClick={() =>
                        setImagePreviews((prev) => ({
                          ...prev,
                          [doc.id]: "", // Clear preview for the specific doc ID
                        }))
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      Change
                    </button>
                  )}
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
