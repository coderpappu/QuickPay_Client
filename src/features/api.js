import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let companyId = null;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      // getState().auth.token ||
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Company", "Shift", "Designation", "Section", "CompanyId"],
  endpoints: (builder) => ({
    // user Related EndPoints
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      // providesTags: ["User"],
    }),

    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      query: () => "/user/getuser",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/user/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // Company Related EndPoints
    getCompanies: builder.query({
      query: () => "/company/getcompany",
      providesTags: ["Company"],
    }),
    getCompanyDetails: builder.query({
      query: (id) => `/company/getcompanydetails/${id}`,
      providesTags: ["Company"],
    }),
    createNewCompany: builder.mutation({
      query: (credentials) => ({
        url: "/company/createcompany",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/company/updatecompany/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/company/deletecompany/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),

    // employee
    getEmployees: builder.query({
      query: () => "/employee/getemployees",
      providesTags: ["Company"],
    }),

    getEmployeeDetails: builder.query({
      query: (id) => `/employee/getemployeesdetails/${id}`,
      providesTags: ["Company"],
    }),

    // createNewCompany: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/company/createcompany",
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   invalidatesTags: ["Company"],
    // }),
    // updateCompany: builder.mutation({
    //   query: ({ id, ...credentials }) => ({
    //     url: `/company/updatecompany/${id}`,
    //     method: "PUT",
    //     body: credentials,
    //   }),
    //   invalidatesTags: ["Company"],
    // }),
    // deleteCompany: builder.mutation({
    //   query: (id) => ({
    //     url: `/company/deletecompany/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Company"],
    // }),

    // company selection
    setCompanyId: builder.mutation({
      queryFn: async (newCompanyId) => {
        companyId = newCompanyId;
        return { data: companyId };
      },
      invalidatesTags: [{ type: "CompanyID", id: "CURRENT" }],
    }),
    getCompanyId: builder.query({
      queryFn: async () => {
        return { data: companyId };
      },
      providesTags: [{ type: "CompanyID", id: "CURRENT" }],
    }),

    // Shift Related EndPoints
    getShiftList: builder.query({
      query: () => "company/shift/list",
      providesTags: ["Shift"],
    }),
    getShift: builder.query({
      query: (id) => `company/get/shift/${id}`,

      providesTags: ["Shift"],
    }),

    addShift: builder.mutation({
      query: (credentials) => ({
        url: "/company/add/shift",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Shift"],
    }),
    deleteShift: builder.mutation({
      query: (id) => ({
        url: `/company/delete/shift/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shift"],
    }),
    updateShift: builder.mutation({
      query: (credentials) => ({
        url: `/company/update/shift/${credentials.id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Shift"],
    }),

    // designation Related EndPoints
    getDesignations: builder.query({
      query: (company_id) => `/designation/list/${company_id}`,
      providesTags: ["Designation"],
    }),
    getDesignationDetails: builder.query({
      query: (id) => `/designation/details/${id}`,
      providesTags: ["Designation"],
    }),
    createNewDesignation: builder.mutation({
      query: (credentials) => ({
        url: "/designation/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Designation"],
    }),
    updateDesignation: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/designation/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Designation"],
    }),
    deleteDesignation: builder.mutation({
      query: (id) => ({
        url: `/designation/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Designation"],
    }),

    // section Related EndPoints
    getSections: builder.query({
      query: (company_id) => `/section/list/${company_id}`,
      providesTags: ["Section"],
    }),
    getSectionDetails: builder.query({
      query: (id) => `/section/details/${id}`,
      providesTags: ["Section"],
    }),
    createNewSection: builder.mutation({
      query: (credentials) => ({
        url: "/section/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Section"],
    }),
    updateSection: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/section/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Section"],
    }),
    deleteSection: builder.mutation({
      query: (id) => ({
        url: `/section/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Section"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetCompaniesQuery,
  useGetCompanyDetailsQuery,
  useCreateNewCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,

  useSetCompanyIdMutation,
  useGetCompanyIdQuery,

  useGetEmployeesQuery,
  useGetEmployeeDetailsQuery,
  // useGetCompanyDetailsQuery,
  // useCreateNewCompanyMutation,
  // useUpdateCompanyMutation,
  // useDeleteCompanyMutation,

  useAddShiftMutation,
  useGetShiftListQuery,
  useDeleteShiftMutation,
  useGetShiftQuery,
  useUpdateShiftMutation,

  useGetDesignationsQuery,
  useGetDesignationDetailsQuery,
  useCreateNewDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,

  useGetSectionsQuery,
  useGetSectionDetailsQuery,
  useCreateNewSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = apiSlice;
