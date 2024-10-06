const ConfirmDialog = ({ onConfirm, onCancel, title }) => (
  <div className="p-4">
    <p className="mb-4">{`Are you sure you want to delete this ${title} `}</p>
    <div className="flex justify-end space-x-2">
      <button
        onClick={onCancel}
        className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
);

export default ConfirmDialog;
