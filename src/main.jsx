import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./app/store.js";
import { useGetbrandQuery } from "./features/api.js";

const UpdateFaviconComponent = () => {
  const companyId = useSelector((state) => state.company.companyId);
  const { data: brandDetails } = useGetbrandQuery(companyId);

  useEffect(() => {
    if (brandDetails) {
      const faviconUrl = brandDetails?.data?.favImageUrl; // Adjust the path as needed
      const faviconElement = document.getElementById("dynamic-favicon");

      if (faviconElement && faviconUrl) {
        faviconElement.href = faviconUrl;
      }
    }
  }, [brandDetails]);

  return null;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <UpdateFaviconComponent />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
