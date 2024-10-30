import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  useDeleteEmployeeAssetMutation,
  useGetAllDocsTypeListQuery,
  useGetCompanyIdQuery,
  useGetEmployeeAssetQuery,
  useGetEmployeeDetailsQuery,
  useUploadImageMutation,
} from "../../features/api";
import AssetForm from "./AssetForm";
import ImageModal from "./ImageModal";

const AssetCard = () => {
  const [imagePreviews, setImagePreviews] = useState({});
  const [employeeData, setEmployeeData] = useState();
  const [mode, setMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const { id } = useParams();
  const { data: companyId } = useGetCompanyIdQuery();
  const [uploadImage] = useUploadImageMutation();
  const { data: employeeAsset } = useGetEmployeeAssetQuery(id);
  const { data: employeeDetails } = useGetEmployeeDetailsQuery(id);
  const { data: docsList } = useGetAllDocsTypeListQuery(companyId);
  const [deleteAsset] = useDeleteEmployeeAssetMutation();

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

  const handleDeleteAsset = async (assetId) => {
    try {
      await deleteAsset(assetId);
      toast.success("Asset deleted successfully");
      // Optionally refresh or update state to reflect deletion
    } catch (error) {
      toast.error("Failed to delete asset");
      console.error(error);
    }
  };

  const handleEdit = () => {
    setMode(!mode);
    setImagePreviews({});
  };

  // Function to open modal with selected image
  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImageUrl("");
  };

  return (
    <div className="w-full mx-5 mt-5 mb-2 rounded-md flex flex-wrap justify-between">
      <div className="h-auto relative p-4 bg-white dark:bg-dark-card rounded-md">
        <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
          Assets
        </h1>
        {mode ? (
          <AssetForm mode={mode} setMode={setMode} />
        ) : (
          <div>
            <div className="flex gap-2 my-4">
              <h2 className="text-xs font-medium dark:text-dark-text-color">
                These files are you need to upload -{" "}
              </h2>
              {docsList?.data?.map((doc) => (
                <h2
                  key={doc?.id}
                  className="text-xs font-medium dark:text-dark-text-color flex"
                >
                  {doc?.status === "IS_REQUIRED" && (
                    <span className="text-red-600">*</span>
                  )}
                  {doc?.name}
                </h2>
              ))}
            </div>
            <div className="flex flex-wrap justify-start items-center gap-3">
              {employeeAsset?.map((asset) => (
                <div className="w-[170px] h-[170px]" key={asset?.id}>
                  <div className="w-[140px] flex flex-wrap justify-between items-center">
                    <h2 className="my-2 dark:text-dark-text-color">
                      {asset?.asset?.documentType?.name}
                    </h2>
                    <AiOutlineDelete
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDeleteAsset(asset?.asset?.id)}
                    />
                  </div>
                  {/* Open modal on image click */}
                  <img
                    src={asset?.imageUrl}
                    alt=""
                    className="w-[140px] h-[140px] cursor-pointer"
                    onClick={() => openModal(asset.imageUrl)} // Open modal with image URL
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for displaying the image */}
        <ImageModal
          isOpen={modalOpen}
          onClose={closeModal}
          imageUrl={selectedImageUrl}
        />

        {/* Toggle mode button */}
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
