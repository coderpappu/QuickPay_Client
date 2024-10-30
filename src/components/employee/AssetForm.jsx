import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  useGetAllDocsTypeListQuery,
  useGetCompanyIdQuery,
  useGetEmployeeAssetQuery,
  useGetEmployeeDetailsQuery,
  useUploadImageMutation,
} from "../../features/api";

import { modifyPayload } from "../../utils/modifyPayload";

const AssetForm = ({ mode, setMode }) => {
  const [employeeData, setEmployeeData] = useState();
  const [imagePreviews, setImagePreviews] = useState({});
  const [editModeAsset, setEditModeAsset] = useState();

  const { id } = useParams();
  const { data: employeeAsset } = useGetEmployeeAssetQuery(id);
  const { data: companyId } = useGetCompanyIdQuery();
  const [uploadImage] = useUploadImageMutation();
  const { data: employeeDetails } = useGetEmployeeDetailsQuery(id);
  const { data: docsList } = useGetAllDocsTypeListQuery(companyId);

  useEffect(() => {
    if (employeeDetails?.data) {
      setEmployeeData(employeeDetails?.data?.[0]);
    }
  }, [employeeDetails]);

  const initialValues = docsList?.data?.reduce((acc, doc) => {
    acc[doc.id] = null; // Initialize each doc type with a null file
    return acc;
  }, {});

  const handleFileChange = (event, docId, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue(docId, file);
      setImagePreviews((prev) => ({
        ...prev,
        [docId]: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        const uploadPromises = Object.entries(values).map(
          async ([docId, file]) => {
            if (file) {
              const formData = modifyPayload({
                employee_id: employeeData?.id,
                documentType_id: docId,
                company_id: employeeData?.company?.id,
                companyName: employeeData?.company?.company_name,
                employeeId: employeeData?.employeeId,
                file: file,
              });

              try {
                let response = await uploadImage(formData).unwrap();
                toast.success("Files uploaded successfully");
              } catch (error) {
                toast.error(`Upload error for document ID ${docId}`);
              }
            }
          }
        );

        try {
          await Promise.all(uploadPromises);

          2;
        } catch (error) {
          toast.error("Some files failed to upload");
        } finally {
          setSubmitting(false);
        }

        setMode(!mode);
      }}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div className="flex flex-wrap justify-start gap-3">
            {docsList?.data?.map((doc) => (
              <div key={doc.id}>
                <label
                  htmlFor={`file-${doc.id}`}
                  className="block text-base my-2 font-medium dark:text-dark-text-color"
                >
                  {doc?.name}
                </label>

                <div className="flex gap-3">
                  {!imagePreviews[doc.id] ? (
                    <label
                      htmlFor={`dropzone-file-${doc.id}`}
                      className="flex flex-col items-center justify-center w-[300px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id={`dropzone-file-${doc.id}`}
                        type="file"
                        name={doc.id}
                        className="hidden"
                        onChange={(event) =>
                          handleFileChange(event, doc.id, setFieldValue)
                        }
                      />
                    </label>
                  ) : (
                    <div className="flex justify-center mt-4">
                      <img
                        className="h-64 w-64 object-cover object-center"
                        src={imagePreviews[doc.id]}
                        alt="Uploaded Preview"
                      />
                    </div>
                  )}
                  <div className="w-[120px] h-auto">
                    {employeeAsset?.map(
                      (asset) =>
                        asset?.asset?.id && (
                          <img
                            src={
                              asset?.asset?.documentType_id == doc.id &&
                              asset.imageUrl
                            }
                          />
                        )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AssetForm;
