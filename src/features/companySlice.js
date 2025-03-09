import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyId: null,
  },
  reducers: {
    setCompanyId: (state, action) => {
      state.companyId = action.payload;
    },
    removeCompanyId: (state) => {
      state.companyId = null;
    },
  },
});

export const { setCompanyId, removeCompanyId } = companySlice.actions;
export default companySlice.reducer;
