import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useDeleteEmployeeAssetMutation,
  useGetAllDocsTypeListQuery,
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
  const companyId = useSelector((state) => state.company.companyId);
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
    <div className="mb-2 mt-5 flex w-full flex-wrap justify-between rounded-md">
      <div className="relative h-auto rounded-md bg-white p-4 dark:bg-dark-card">
        <h1 className="mb-4 text-xl font-medium dark:text-dark-heading-color">
          Assets
        </h1>
        {mode ? (
          <AssetForm mode={mode} setMode={setMode} />
        ) : (
          <div>
            <div className="my-4 flex gap-2">
              <h2 className="text-xs font-medium dark:text-dark-text-color">
                These files are you need to upload -{" "}
              </h2>
              {docsList?.data?.map((doc) => (
                <h2
                  key={doc?.id}
                  className="flex text-xs font-medium dark:text-dark-text-color"
                >
                  {doc?.status === "IS_REQUIRED" && (
                    <span className="text-red-600">*</span>
                  )}
                  {doc?.name}
                </h2>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-start gap-3">
              {employeeAsset?.map((asset) => (
                <div className="h-[181px] w-[170px]" key={asset?.id}>
                  <div className="flex w-[140px] flex-wrap items-center justify-between">
                    <h2 className="my-2 dark:text-dark-text-color">
                      {asset?.asset?.documentType?.name}
                    </h2>
                    <AiOutlineDelete
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDeleteAsset(asset?.asset?.id)}
                    />
                  </div>
                  {/* Open modal on image click */}
                  <img
                    src={asset?.imageUrl}
                    alt=""
                    className="h-[140px] w-[140px] cursor-pointer"
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
            className="absolute right-1 top-2 mr-2 flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center rounded-full bg-[#85858512] align-middle"
            onClick={() => handleEdit()}
          >
            <MdOutlineCancel className="text-xl text-red-600" />
          </div>
        ) : (
          <div
            className="absolute right-1 top-2 mr-2 flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center rounded-full bg-[#85858512] align-middle"
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
