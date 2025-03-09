import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api";
import companyReducer from "../features/companySlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    company: companyReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
