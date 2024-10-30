import React, { useEffect, useState } from "react";
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
import AssetForm from "./AssetForm";

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

  const handleEdit = () => {
    setMode(!mode);
    setImagePreviews({});
  };
  return (
    <div className="w-full mx-5 mt-5 mb-2 rounded-md flex flex-wrap justify-between">
      <div className=" h-auto relative p-4 bg-white dark:bg-dark-card rounded-md">
        <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
          Asset Upload
        </h1>
        {mode ? (
          <AssetForm />
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
            onClick={() => handleEdit()}
          >
            <MdOutlineCancel className="text-red-600 text-xl" />
          </div>
        ) : (
          <div
            className="absolute right-1 top-2 w-[40px] cursor-pointer h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2"
            onClick={() => handleEdit()}
          >
            <FiEdit className="text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetCard;
