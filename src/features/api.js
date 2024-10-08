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
  tagTypes: [
    "User",
    "Company",
    "Shift",
    "Designation",
    "department",
    "Section",
    "CompanyId",
    "Employee",
    "Attendance",
    "weekend",
    "holiday_type",
    "holiday",
    "leaveType",
    "leaveApplication",
    "earnLeave",
  ],

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
      providesTags: ["User"],
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
    loginEmployee: builder.mutation({
      query: (credentials) => ({
        url: "/employee/login",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["Employee"],
    }),
    getEmployee: builder.query({
      query: () => "/employee/getemployee",

      providesTags: ["Employee"],
    }),

    getEmployees: builder.query({
      query: (companyId) => ({
        url: "/employee/getemployees",
        params: { companyId },
      }),
      providesTags: ["Employee"],
    }),

    getEmployeeDetails: builder.query({
      query: (id) => `/employee/getemployeedetails/${id}`,
      providesTags: ["Employee"],
    }),

    createNewEmployee: builder.mutation({
      query: (credentials) => ({
        url: "/employee/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Employee"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employee/delete`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Employee"],
    }),

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
      query: ({ company_Id }) => ({
        url: "/shift/listbycompany",
        params: { company_Id },
      }),

      providesTags: ["Shift"],
    }),

    getShiftDetails: builder.query({
      query: (id) => `/shift/getDetails/${id}`,

      providesTags: ["Shift"],
    }),

    addShift: builder.mutation({
      query: (credentials) => ({
        url: "/shift/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Shift"],
    }),

    deleteShift: builder.mutation({
      query: ({ shiftId, company_Id }) => ({
        url: `/shift/delete/${shiftId}`,
        method: "DELETE",
        params: { company_Id: company_Id },
      }),
      invalidatesTags: ["Shift"],
    }),

    updateShift: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/shift/update/${id}`,
        method: "PUT",
        body: credentials,
        // params: { company_Id: credentials.helperKeys.company_Id },
      }),
      invalidatesTags: ["Shift"],
    }),

    // Attendance related Endpoint
    createAttendance: builder.mutation({
      query: (credentials) => ({
        url: "/attendance/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Attendance"],
    }),

    getAttendances: builder.query({
      query: ({ companyId, date }) => ({
        url: "/attendance/getattendances",
        params: { companyId, date },
      }),

      providesTags: ["Attendance"],
    }),

    deleteAttendance: builder.mutation({
      query: (id) => ({
        url: `/attendance/delete`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Attendance"],
    }),

    // Departement related endpoints
    createDepartment: builder.mutation({
      query: (credentials) => ({
        url: "/department/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["department"],
    }),

    getDepartments: builder.query({
      query: (companyId) => ({
        url: `/department/list`,
        method: "GET",
        params: { companyId },
      }),
      providesTags: ["department"],
    }),

    getDepartmentDetails: builder.query({
      query: (id) => `/department/details/${id}`,
      providesTags: ["department"],
    }),

    updateDepartment: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/department/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["department"],
    }),

    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/department/delete`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["department"],
    }),

    // designation Related EndPoints
    getDesignations: builder.query({
      query: (companyId) => ({
        url: `/designation/list/`,
        params: { companyId },
      }),
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
        url: `/designation/delete/`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Designation"],
    }),

    // section Related EndPoints

    getSections: builder.query({
      query: (companyId) => ({
        url: `/section/list/`,
        params: { companyId },
      }),
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
        url: `/section/delete/`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Section"],
    }),

    // calendar related endpoints
    getWeekendList: builder.query({
      query: (companyId) => ({
        url: `/weekend/list/`,
        params: { companyId },
      }),
      providesTags: ["weekend"],
    }),

    getWeekendDetails: builder.query({
      query: (id) => `/weekend/details/${id}`,
      providesTags: ["weekend"],
    }),

    createWeekend: builder.mutation({
      query: (credentials) => ({
        url: "/weekend/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["weekend"],
    }),

    updateWeekend: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/weekend/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["weekend"],
    }),

    deleteWeekend: builder.mutation({
      query: (name) => ({
        url: `/weekend/delete/`,
        method: "DELETE",
        params: { name },
      }),
      invalidatesTags: ["weekend"],
    }),

    // holiday type
    createHolidayType: builder.mutation({
      query: (credentials) => ({
        url: "/holiday/type/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["holiday_type"],
    }),

    getTypeList: builder.query({
      query: (companyId) => ({
        url: `/holiday/type/list/`,
        params: { companyId },
      }),
      providesTags: ["holiday_type"],
    }),

    deleteType: builder.mutation({
      query: (id) => ({
        url: `/holiday/type/delete/`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["holiday_type"],
    }),

    // Holiday Endpoint
    createHoliday: builder.mutation({
      query: (credentials) => ({
        url: "/holiday/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["holiday"],
    }),

    getHolidayList: builder.query({
      query: (companyId) => ({
        url: `/holiday/list/`,
        params: { companyId },
      }),
      providesTags: ["holiday"],
    }),

    deleteHoliday: builder.mutation({
      query: (id) => ({
        url: `/holiday/delete/`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["holiday"],
    }),

    // Leave Related Endpoint

    createLeaveType: builder.mutation({
      query: (credentials) => ({
        url: "/leave/type/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["leaveType"],
    }),

    createEarnLeave: builder.mutation({
      query: (credentials) => ({
        url: "/leave/earnleave/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["leaveType"],
    }),

    employeeCreateLeave: builder.mutation({
      query: (credentials) => ({
        url: "/leave/employeecreate",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["leaveApplication"],
    }),

    getLeaveTypeList: builder.query({
      query: (companyId) => ({
        url: `/leave/type/list/`,
        params: { companyId },
      }),
      providesTags: ["leaveType"],
    }),
    getAllEmployeeLeaveList: builder.query({
      query: (companyId) => ({
        url: `/leave/list`,
        params: { companyId },
      }),
      providesTags: ["leaveApplication"],
    }),

    getAllLeaveApplication: builder.query({
      query: (companyId) => ({
        url: `/leave/application/list`,
        params: { companyId },
      }),
      providesTags: ["leaveApplication"],
    }),

    getEarnLeave: builder.query({
      query: (companyId) => ({
        url: `/leave/earnleave`,
        params: { companyId },
      }),
      providesTags: ["earnLeave"],
    }),

    calculationLeaveDays: builder.query({
      query: ({ year, company_id }) => ({
        url: `/leave/calculateleavedays`,
        params: { year, company_id },
      }),
      providesTags: ["leaveApplication"],
    }),

    updateLeaveType: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/leave/type/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["leaveType"],
    }),
    updateLeaveApplication: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/leave/application/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["leaveApplication"],
    }),

    getLeaveTypeDetails: builder.query({
      query: (id) => `/leave/type/details/${id}`,
      providesTags: ["leaveType"],
    }),
    deleteLeaveType: builder.mutation({
      query: (id) => ({
        url: `/leave/type/delete/`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["leaveType"],
    }),

    // payroll

    // Grade
    createGrade: builder.mutation({
      query: (credentials) => ({
        url: "/grade/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["grade"],
    }),

    getGradeList: builder.query({
      query: (companyId) => ({
        url: `/grade/list`,
        params: { companyId },
      }),
      providesTags: ["grade"],
    }),

    getGradeDetails: builder.query({
      query: (id) => ({
        url: `/grade/details`,
        params: { id },
      }),

      providesTags: ["grade"],
    }),

    updateGrade: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/grade/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["grade"],
    }),

    deleteGrade: builder.mutation({
      query: (gradeId) => ({
        url: `/grade/delete/`,
        method: "DELETE",
        params: { gradeId },
      }),
      invalidatesTags: ["grade"],
    }),

    // Allowance
    createAllowance: builder.mutation({
      query: (credentials) => ({
        url: "/allowance_deduction/allowance/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["allowance"],
    }),

    getAllowanceList: builder.query({
      query: (companyId) => ({
        url: `/allowance_deduction/allowance/list`,
        params: { companyId },
      }),
      providesTags: ["allowance"],
    }),

    getAllowanceDetails: builder.query({
      query: (id) => ({
        url: `/allowance_deduction/allowance/details`,
        params: { id },
      }),

      providesTags: ["allowance"],
    }),

    updateAllowance: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/allowance_deduction/allowance/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["allowance"],
    }),

    deleteAllowance: builder.mutation({
      query: (allowanceId) => ({
        url: `/allowance_deduction/allowance/delete/`,
        method: "DELETE",
        params: { allowanceId },
      }),
      invalidatesTags: ["allowance"],
    }),

    // Deduction
    createDeduction: builder.mutation({
      query: (credentials) => ({
        url: "/allowance_deduction/deduction/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["deduction"],
    }),

    getDeductionList: builder.query({
      query: (companyId) => ({
        url: `/allowance_deduction/deduction/list`,
        params: { companyId },
      }),
      providesTags: ["deduction"],
    }),

    getDeductionDetails: builder.query({
      query: (id) => ({
        url: `/allowance_deduction/deduction/details`,
        params: { id },
      }),

      providesTags: ["deduction"],
    }),

    updateDeduction: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/allowance_deduction/deduction/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["deduction"],
    }),

    deleteDeduction: builder.mutation({
      query: (deductionId) => ({
        url: `/allowance_deduction/deduction/delete/`,
        method: "DELETE",
        params: { deductionId },
      }),
      invalidatesTags: ["deduction"],
    }),

    // employee Create
    createEmployeeAllowance: builder.mutation({
      query: (credentials) => ({
        url: "/salarysetting/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["deduction"],
    }),

    getSalarySetting: builder.query({
      query: (companyId) => ({
        url: `/salarysetting/getsalarysetting`,
        params: { companyId },
      }),
      providesTags: ["deduction"],
    }),

    // Loan System Endpoint
    createLoanType: builder.mutation({
      query: (credentials) => ({
        url: "/loan/type/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["loanType"],
    }),

    getLoanTypeList: builder.query({
      query: (companyId) => ({
        url: `/loan/type/list`,
        params: { companyId },
      }),
      providesTags: ["loanType"],
    }),

    getLoanDetails: builder.query({
      query: (id) => ({
        url: `/loan/type/details`,
        params: { id },
      }),

      providesTags: ["loanType"],
    }),

    updateLoanType: builder.mutation({
      query: (credentials) => ({
        url: `/loan/type/update`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["loanType"],
    }),

    deleteLoanType: builder.mutation({
      query: ({ loanTypeId }) => ({
        url: `/loan/type/delete/`,
        method: "DELETE",
        params: { loanTypeId },
      }),
      invalidatesTags: ["loanType"],
    }),

    // Company Setting System

    getRootSetting: builder.query({
      query: (companyId) => ({
        url: `/setting/rootsetting/`,
        params: { company_id: companyId },
      }),
      providesTags: ["Section"],
    }),

    getEmployeeSetting: builder.query({
      query: (companyId) => ({
        url: `/setting/employeesetting/`,
        params: { company_id: companyId },
      }),
      providesTags: ["Section"],
    }),
    setSetting: builder.mutation({
      query: (credentials) => ({
        url: "/setting/employeesettingcreate",
        method: "POST",
        body: credentials,
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

  useLoginEmployeeMutation,
  useGetEmployeeQuery,
  useGetEmployeesQuery,
  useGetEmployeeDetailsQuery,
  useDeleteEmployeeMutation,
  useCreateNewEmployeeMutation,

  // useGetCompanyDetailsQuery,
  // useCreateNewCompanyMutation,
  // useUpdateCompanyMutation,
  // useDeleteCompanyMutation,

  useAddShiftMutation,
  useGetShiftListQuery,
  useDeleteShiftMutation,
  useGetShiftDetailsQuery,
  useUpdateShiftMutation,
  useDeleteDepartmentMutation,

  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useGetDepartmentDetailsQuery,
  useUpdateDepartmentMutation,

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

  // attendance
  useCreateAttendanceMutation,
  useGetAttendancesQuery,
  useDeleteAttendanceMutation,

  // weekend related endpoints
  useCreateWeekendMutation,
  useGetWeekendListQuery,
  useDeleteWeekendMutation,
  useUpdateWeekendMutation,
  useGetWeekendDetailsQuery,

  // holiday type
  useCreateHolidayTypeMutation,
  useGetTypeListQuery,
  useDeleteTypeMutation,

  // Holiday
  useCreateHolidayMutation,
  useGetHolidayListQuery,
  useDeleteHolidayMutation,

  // Leave Endpoint
  useCreateLeaveTypeMutation,
  useGetLeaveTypeListQuery,
  useUpdateLeaveTypeMutation,
  useGetLeaveTypeDetailsQuery,
  useDeleteLeaveTypeMutation,
  useEmployeeCreateLeaveMutation,
  useGetAllEmployeeLeaveListQuery,
  useGetAllLeaveApplicationQuery,
  useUpdateLeaveApplicationMutation,
  useCalculationLeaveDaysQuery,
  useGetEarnLeaveQuery,
  useCreateEarnLeaveMutation,

  // Grade Endpoint
  useCreateGradeMutation,
  useGetGradeListQuery,
  useGetGradeDetailsQuery,
  useUpdateGradeMutation,
  useDeleteGradeMutation,

  // Allowance
  useCreateAllowanceMutation,
  useGetAllowanceListQuery,
  useGetAllowanceDetailsQuery,
  useUpdateAllowanceMutation,
  useDeleteAllowanceMutation,

  //Deduction
  useCreateDeductionMutation,
  useGetDeductionListQuery,
  useGetDeductionDetailsQuery,
  useUpdateDeductionMutation,
  useDeleteDeductionMutation,

  // Employee Salaray Setting
  useCreateEmployeeAllowanceMutation,
  useGetSalarySettingQuery,

  // Loan Type Endpoint

  useCreateLoanTypeMutation,
  useGetLoanTypeListQuery,
  useGetLoanDetailsQuery,
  useUpdateLoanTypeMutation,
  useDeleteLoanTypeMutation,

  useSetSettingMutation,
  useGetRootSettingQuery,
  useGetEmployeeSettingQuery,
} = apiSlice;
