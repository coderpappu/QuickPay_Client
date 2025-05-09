const ConfirmDialog = ({ onConfirm, onCancel, title }) => (
  <div className="p-4">
    <p className="mb-4">{`Are you sure you want to delete this ${title} `}</p>
    <div className="flex justify-end space-x-2">
      <button
        onClick={onCancel}
        className="rounded bg-gray-300 px-3 py-1 text-black hover:bg-gray-400"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
);

export default ConfirmDialog;
