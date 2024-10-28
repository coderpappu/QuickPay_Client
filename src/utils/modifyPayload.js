export const modifyPayload = (values) => {
  const obj = { ...values };
  const file = obj["file"];
  delete obj["file"];
  const formData = new FormData();

  // Append each key-value pair from the object to the FormData
  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Append the file to the FormData
  if (file) {
    formData.append("file", file);
  }

  return formData;
};
