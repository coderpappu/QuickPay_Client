import { useEffect, useState } from "react";
import fileUpload from "./fileUpload";
import toast from "react-hot-toast";
import { ErrorMessage } from "formik";

const UploadForm = ({ setFieldValue, canSubmit, setCanSubmit }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setCanSubmit(false);

      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const downloadURL = await fileUpload({ file, setProgress });
      if (downloadURL) {
        setFieldValue("logo", downloadURL); // Update the logo URL in the parent component
        toast.success("File uploaded successfully!");
        setCanSubmit(true);
      }
    } catch (error) {
      toast.error("Failed to upload file");
      setCanSubmit(true); // Allow form submission in case of an error
    }
  };

  useEffect(() => {
    if (file !== null) {
      handleUpload();
    }
  }, [file, setFieldValue]);

  return (
    <div>
      <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
        Logo
      </label>
      <input
        type="file"
        name="logo"
        id="logo"
        onChange={handleChange}
        className="mt-1 block w-full text-gray-500"
      />
      {progress > 0 && (
        <div className="w-full bg-gray-200 h-4 rounded-md overflow-hidden">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <ErrorMessage
        name="logo"
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default UploadForm;
