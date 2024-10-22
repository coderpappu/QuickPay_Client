import { useEffect, useState } from "react";
import fileUpload from "./fileUpload"; // Your upload function
import toast from "react-hot-toast";
import { ErrorMessage } from "formik";

const UploadForm = ({
  setFieldValue,
  canSubmit,
  setCanSubmit,
  name,
  uploadedImageUrl,
}) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(""); // For the selected image
  const [uploadedImage, setUploadedImage] = useState(uploadedImageUrl); // URL from the DB

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setCanSubmit(false);
      setFile(selectedFile);
      setUploadSuccess(false); // Reset success flag when a new file is selected

      // Create a preview URL for the selected image
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL); // Set the preview URL
    }
  };

  const handleUpload = async () => {
    if (isUploading) return; // Prevent multiple uploads

    setIsUploading(true);
    try {
      const downloadURL = await fileUpload({ file });
      if (downloadURL) {
        setFieldValue(name, downloadURL); // Update the image URL in the parent component
        toast.success("File uploaded successfully!");
        setUploadSuccess(true); // Set success flag to true
        setUploadedImage(downloadURL); // Set the uploaded image URL
        setCanSubmit(true);
        setFile(null); // Reset file after upload
        setImagePreview(""); // Reset preview after upload
      }
    } catch (error) {
      toast.error("Failed to upload file");
      setCanSubmit(true); // Allow form submission in case of an error
    } finally {
      setIsUploading(false); // Reset the flag after upload attempt
    }
  };

  useEffect(() => {
    if (file !== null) {
      handleUpload();
    }
  }, [file]);

  const handleChangeImage = () => {
    setImagePreview(""); // Reset preview
    setUploadedImage(""); // Reset uploaded image URL
    setFile(null); // Reset file state
    setUploadSuccess(false); // Reset success flag to hide the success message
  };

  return (
    <div>
      {/* Conditionally render uploader or image preview */}
      {!imagePreview && !uploadedImage && (
        <div className="flex flex-col items-center">
          <h2 className="text-xl dark:text-dark-text-color leading-10 mb-2 ">
            Set your profile picture
          </h2>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[350px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleChange} // Ensure we handle file selection
            />
          </label>
        </div>
      )}

      {/* Show Preview from uploaded file or DB URL */}
      {(imagePreview || uploadedImage) && (
        <div className="flex justify-center mt-4">
          <img
            className="h-64 w-64 rounded-full object-cover object-center"
            src={imagePreview || uploadedImage}
            alt="Uploaded Preview"
          />
        </div>
      )}

      {/* Change Profile button */}
      {uploadedImage && !imagePreview && (
        <button
          type="button"
          onClick={handleChangeImage}
          className="mt-4 p-2 text-blue-500 border border-blue-500 rounded"
        >
          Change Profile
        </button>
      )}

      {isUploading && (
        <h1 className="text-lg text-yellow-500"> Uploading...</h1>
      )}

      {/* Show success message only after a successful upload */}
      {uploadSuccess && (
        <p className="text-green-500 mt-2">File uploaded successfully!</p>
      )}

      <ErrorMessage
        name="image"
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default UploadForm;
