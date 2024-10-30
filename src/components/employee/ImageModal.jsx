import { MdOutlineCancel } from "react-icons/md";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-4 rounded-lg">
        <img src={imageUrl} alt="Preview" className="max-w-full max-h-[80vh]" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full text-red-600 hover:text-red-800"
        >
          <MdOutlineCancel className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
