import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import {
  useGetAllDocsTypeListQuery,
  useGetCompanyIdQuery,
  useGetEmployeeAssetQuery,
  useGetEmployeeDetailsQuery,
  useUploadImageMutation,
} from "../../features/api";
import { modifyPayload } from "../../utils/modifyPayload";

const AssetCard = () => {
  const [imagePreviews, setImagePreviews] = useState({});
  const [employeeData, setEmployeeData] = useState();
  const [mode, setMode] = useState(false);

  const { id } = useParams();
  const { data: companyId } = useGetCompanyIdQuery();
  const [uploadImage] = useUploadImageMutation();
  const { data: employeeAsset } = useGetEmployeeAssetQuery(id);
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
    <div className="w-full mx-5 mt-5 mb-2 rounded-md flex flex-wrap justify-between">
      <div className="w-[49%] h-[500px] relative p-4 bg-white dark:bg-dark-card rounded-md">
        <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
          Asset Upload
        </h1>
        {mode ? (
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
                      await uploadImage(formData).unwrap();
                    } catch (error) {
                      toast.error(`Upload error for document ID ${docId}`);
                    }
                  }
                }
              );

              try {
                await Promise.all(uploadPromises);
                toast.success("Files uploaded successfully");
              } catch (error) {
                toast.error("Some files failed to upload");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="flex flex-wrap justify-around items-center">
                  {docsList?.data?.map((doc) => (
                    <div key={doc.id} className="mb-4">
                      <label
                        htmlFor={`file-${doc.id}`}
                        className="block text-base my-2 font-medium dark:text-dark-text-color"
                      >
                        {doc?.name}
                      </label>
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
        ) : (
          <div className="flex flex-wrap justify-start items-center gap-3">
            {employeeAsset?.map((asset) => (
              <div className="w-[130px] h-[170px]" key={asset?.id}>
                <h2 className="my-2 dark:text-dark-text-color">
                  {asset?.asset?.documentType?.name}
                </h2>
                <Link to={asset?.imageUrl}>
                  <img
                    src={asset?.imageUrl}
                    alt=""
                    className="w-[130px] h-[130px]"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}

        {mode ? (
          <div
            className="absolute right-1 top-2 w-[40px] cursor-pointer h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2"
            onClick={() => setMode(!mode)}
          >
            <MdOutlineCancel className="text-red-600 text-xl" />
          </div>
        ) : (
          <div
            className="absolute right-1 top-2 w-[40px] cursor-pointer h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2"
            onClick={() => setMode(!mode)}
          >
            <FiEdit className="text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetCard;
