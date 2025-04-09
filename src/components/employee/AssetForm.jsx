import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetAllDocsTypeListQuery,
  useGetEmployeeAssetQuery,
  useGetEmployeeDetailsQuery,
  useUploadImageMutation,
} from "../../features/api";
import { modifyPayload } from "../../utils/modifyPayload";
const AssetForm = ({ mode, setMode }) => {
  const [employeeData, setEmployeeData] = useState();
  const [imagePreviews, setImagePreviews] = useState({});

  const { id } = useParams();
  const { data: employeeAsset } = useGetEmployeeAssetQuery(id);
  const companyId = useSelector((state) => state.company.companyId);
  const [uploadImage] = useUploadImageMutation();
  const { data: employeeDetails } = useGetEmployeeDetailsQuery(id);
  const { data: docsList } = useGetAllDocsTypeListQuery(companyId);

  // Set employee data on load
  useEffect(() => {
    if (employeeDetails?.data) {
      setEmployeeData(employeeDetails?.data);
    }
  }, [employeeDetails]);

  // Initialize form values
  const initialValues = docsList?.data?.reduce((acc, doc) => {
    acc[doc.id] = null; // Initialize each doc type with a null file
    return acc;
  }, {});

  // Populate image previews with existing assets
  useEffect(() => {
    if (employeeAsset) {
      const previews = {};
      employeeAsset.forEach((asset) => {
        previews[asset.asset.documentType_id] = asset.imageUrl; // Assuming asset.imageUrl contains the URL to the image
      });
      setImagePreviews(previews);
    }
  }, [employeeAsset]);

  const handleFileChange = (event, docId, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue(docId, file);
      setImagePreviews((prev) => ({
        ...prev,
        [docId]: URL.createObjectURL(file), // Create a preview URL for the uploaded file
      }));
    }
  };

  console.log(employeeDetails?.data);
  console.log(employeeData);
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
                company_id: employeeData?.company_id,
                companyName: employeeData?.company?.company_name,
                employeeId: employeeData?.employeeId,
                file: file,
              });

              try {
                await uploadImage(formData).unwrap();
                toast.success("Files uploaded successfully");
              } catch (error) {
                toast.error(`Upload error for document ID ${docId}`);
              }
            }
          },
        );

        try {
          await Promise.all(uploadPromises);
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
          <div className="flex flex-wrap items-center justify-start gap-3">
            {docsList?.data?.map((doc) => (
              <div key={doc.id}>
                <label
                  htmlFor={`file-${doc.id}`}
                  className="my-2 block text-base font-medium dark:text-dark-text-color"
                >
                  {doc?.name}
                </label>

                {/* Check if there is an existing asset for this document type */}
                {imagePreviews[doc.id] ? (
                  // Show preview if an asset exists
                  <div className="flex justify-center">
                    <img
                      src={imagePreviews[doc.id]}
                      alt="Uploaded Preview"
                      className="h-64 w-[300px] object-cover object-center"
                    />
                  </div>
                ) : (
                  // Show upload box if no asset exists
                  <label
                    htmlFor={`dropzone-file-${doc.id}`}
                    className="flex h-64 w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
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
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2l2 2"
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
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 rounded-md bg-blue-600 px-5 py-2 text-white"
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
