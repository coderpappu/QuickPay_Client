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
      // headers.set("Content-Type", "application/json");
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
      query: () => "/user/getusers",
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

    getUserDetails: builder.query({
      query: (id) => ({
        url: `/user/getuser/details/${id}`,
      }),
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
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: `/user/update/password`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/deleteuser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // Company Related EndPoints
    getCompanies: builder.query({
      query: (id) => ({
        url: "/company/getcompany",
        params: { id },
      }),

      providesTags: ["Company"],
    }),

    getActiveCompany: builder.query({
      query: () => "/company/activecompany",
      providesTags: ["ActiveId"],
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

    createActiveCompany: builder.mutation({
      query: (credentials) => ({
        url: "/company/activecompany",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["ActiveId"],
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

    updateEmployee: builder.mutation({
      query: (credentials) => ({
        url: `/employee/update`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Employee"],
    }),

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
      invalidatesTags: ["CompanyID"],
    }),

    getCompanyId: builder.query({
      queryFn: async () => {
        return { data: companyId };
      },
      providesTags: ["CompanyID"],
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

    // branch related endpoint

    createBranch: builder.mutation({
      query: (credentials) => ({
        url: "/branch/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["branch"],
    }),

    getBranchList: builder.query({
      query: (companyId) => ({
        url: `/branch/list`,
        method: "GET",
        params: { companyId },
      }),
      providesTags: ["branch"],
    }),

    getBranchDetails: builder.query({
      query: (id) => `/branch/details/${id}`,
      providesTags: ["branch"],
    }),

    updateBranch: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/branch/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["branch"],
    }),

    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branch/delete`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["branch"],
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
      invalidatesTags: ["earnLeave"],
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

    getAllEmployeeApplication: builder.query({
      query: (companyId) => ({
        url: `/leave/application/employee/list`,
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

    getLeaveApplicationDetails: builder.query({
      query: (id) => `/leave/application/details/${id}`,
      providesTags: ["leaveApplication"],
    }),

    deleteLeaveType: builder.mutation({
      query: (id) => ({
        url: `/leave/type/delete/`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["leaveType"],
    }),

    deleteApplication: builder.mutation({
      query: (applicationId) => ({
        url: `/leave/application/delete`,
        method: "DELETE",
        params: { applicationId },
      }),
      invalidatesTags: ["leaveApplication"],
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

    // employee basic salary
    createBasicSalary: builder.mutation({
      query: (credentials) => ({
        url: "/grade/employeebasic/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["basic_salary"],
    }),

    getEmployeeBasicSalaryDetails: builder.query({
      query: ({ employeeId, companyId }) => ({
        url: `/grade/basicsalary/details`,
        params: { employeeId, companyId },
      }),
      providesTags: ["basic_salary"],
    }),

    // Allowance
    createAllowanceType: builder.mutation({
      query: (credentials) => ({
        url: "/setsalary/allowance/type/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["allowance_type"],
    }),

    createEmployeeeAllowance: builder.mutation({
      query: (credentials) => ({
        url: "/setsalary/allowance/employee/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["employee_allowance"],
    }),

    createPayslipAllowance: builder.mutation({
      query: (credentials) => ({
        url: "/setsalary/allowance/employeepayslip/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["payslip_allowance"],
    }),

    getAllowanceTypeList: builder.query({
      query: (companyId) => ({
        url: `/setsalary/allowance/types`,
        params: { companyId },
      }),
      providesTags: ["allowance_type"],
    }),
    getAllowanceTypeDetails: builder.query({
      query: (id) => ({
        url: `/setsalary/allowance/type/details`,
        params: { id },
      }),
      providesTags: ["allowance_type"],
    }),

    getEmployeeAllowance: builder.query({
      query: ({ employeeId, companyId }) => ({
        url: `/setsalary/allowance/employee`,
        params: { employeeId, companyId },
      }),
      providesTags: ["employee_allowance"],
    }),

    getPayslipEmployeeAllowance: builder.query({
      query: (companyId) => ({
        url: `/setsalary/allowance/employee`,
        params: { companyId },
      }),
      providesTags: ["payslip_allowance"],
    }),

    getEmployeeAllowanceDetails: builder.query({
      query: (id) => ({
        url: `/setsalary/allowance/employee/details`,
        params: { id },
      }),

      providesTags: ["employee_allowance"],
    }),

    updateEmployeeAllowance: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/setsalary/allowance/employee/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["employee_allowance"],
    }),

    updateAllowanceType: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/setsalary/allowance/type/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["allowance_type"],
    }),

    deleteAllowanceType: builder.mutation({
      query: (typeId) => ({
        url: `/setsalary/allowance/type/delete`,
        method: "DELETE",
        params: { typeId },
      }),
      invalidatesTags: ["allowance_type"],
    }),

    deleteEmployeeAllowance: builder.mutation({
      query: (allowanceId) => ({
        url: `/setsalary/allowance/employee/delete`,
        method: "DELETE",
        params: { allowanceId },
      }),
      invalidatesTags: ["employee_allowance"],
    }),

    // Deduction

    createDeductionType: builder.mutation({
      query: (credentials) => ({
        url: "/setsalary/deduction/type/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["deduction_type"],
    }),

    createEmployeeeDeduction: builder.mutation({
      query: (credentials) => ({
        url: "/setsalary/deduction/employee/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["employee_deduction"],
    }),

    getDeductionTypeList: builder.query({
      query: (companyId) => ({
        url: `/setsalary/deduction/types`,
        params: { companyId },
      }),
      providesTags: ["deduction_type"],
    }),

    getDeductionTypeDetails: builder.query({
      query: (id) => ({
        url: `/setsalary/deduction/type/details`,
        params: { id },
      }),

      providesTags: ["deduction_type"],
    }),

    getEmployeeDeduction: builder.query({
      query: ({ employeeId, companyId }) => ({
        url: `/setsalary/deduction/employee`,
        params: { employeeId, companyId },
      }),

      providesTags: ["employee_deduction"],
    }),

    getEmployeeDeductionDetails: builder.query({
      query: (id) => ({
        url: `/setsalary/deduction/employee/details`,
        params: { id },
      }),

      providesTags: ["employee_deduction"],
    }),

    // updateEmployeeAllowance: builder.mutation({
    //   query: ({ id, ...credentials }) => ({
    //     url: `/setsalary/allowance/employee/update/${id}`,
    //     method: "PUT",
    //     body: credentials,
    //   }),
    //   invalidatesTags: ["employee_allowance"],
    // }),

    deleteDeductionType: builder.mutation({
      query: (typeId) => ({
        url: `/setsalary/deduction/type/delete`,
        method: "DELETE",
        params: { typeId },
      }),
      invalidatesTags: ["deduction_type"],
    }),

    deleteEmployeeDeduction: builder.mutation({
      query: (deductionId) => ({
        url: `/setsalary/deduction/employee/delete`,
        method: "DELETE",
        params: { deductionId },
      }),
      invalidatesTags: ["employee_deduction"],
    }),

    updateDeductionType: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/setsalary/deduction/type/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["deduction_type"],
    }),

    // employee commission
    createEmployeeCommission: builder.mutation({
      query: (credentials) => ({
        url: "/setsalary/commission/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["employee_Commission"],
    }),

    getEmployeeCommissionList: builder.query({
      query: ({ employeeId, companyId }) => ({
        url: `/setsalary/commission/getemployeecommission`,
        params: { employeeId, companyId },
      }),

      providesTags: ["employee_Commission"],
    }),

    getEmployeeCommissionDetails: builder.query({
      query: (commission_id) => ({
        url: `/setsalary/commission/getemployee/details`,
        params: { commission_id },
      }),

      providesTags: ["employee_Commission"],
    }),

    updateEmployeeCommission: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/setsalary/commission/employee/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["employee_Commission"],
    }),

    deleteEmployeeCommission: builder.mutation({
      query: (commissionId) => ({
        url: `/setsalary/commission/employee/delete`,
        method: "DELETE",
        params: { commissionId },
      }),
      invalidatesTags: ["employee_Commission"],
    }),

    // employee over time
    createEmployeeOverTime: builder.mutation({
      query: (credentials) => ({
        url: "/setsalary/overtime/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["employee_overtime"],
    }),

    getEmployeeOverTimeDetails: builder.query({
      query: ({ employeeId, companyId }) => ({
        url: `/setsalary/overtime/employee/details`,
        params: { employeeId, companyId },
      }),

      providesTags: ["employee_overtime"],
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

    applyLoan: builder.mutation({
      query: (credentials) => ({
        url: "/loan/create",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["loanApply"],
    }),

    getApplyLoanList: builder.query({
      query: (employeeId) => ({
        url: `/loan/application/employee/list`,
        params: { employeeId },
      }),
      providesTags: ["loanApply"],
    }),

    getAppliedLoanDetails: builder.query({
      query: (id) => ({
        url: `/loan/application/employee/${id}`,
      }),

      providesTags: ["loanApply"],
    }),

    deleteAppliedLoan: builder.mutation({
      query: ({ loanTypeId }) => ({
        url: `/loan/type/delete/`,
        method: "DELETE",
        params: { loanTypeId },
      }),
      invalidatesTags: ["loanType"],
    }),

    updateAppliedLoan: builder.mutation({
      query: (credentials) => ({
        url: `/loan/type/update`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["loanApply"],
    }),

    // Loan Admin
    getCompanyLoanList: builder.query({
      query: (companyId) => ({
        url: `/loan/company/application/employee/list`,
        params: { companyId },
      }),
      providesTags: ["loanApply"],
    }),

    updateLoanApplicationApproval: builder.mutation({
      query: (credentials) => ({
        url: `/loan/approval/update`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["loanApply"],
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

    // application format
    createLeaveApplicationFormat: builder.mutation({
      query: (credentials) => ({
        url: "/applicationformat/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["leaveApplicationFormat"],
    }),

    // offer letter application format
    offerLetterFormat: builder.mutation({
      query: (credentials) => ({
        url: "/applicationformat/create/offerletter",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["offerLetterFormat"],
    }),

    createJoiningLetterFormat: builder.mutation({
      query: (credentials) => ({
        url: "/applicationformat/create/joiningletterformat",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["joiningLetterFormat"],
    }),

    createExperienceCertificateFormat: builder.mutation({
      query: (credentials) => ({
        url: "/applicationformat/create/experiencecertificateformat",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["experienceCertificateFormat"],
    }),

    createNocLetterFormat: builder.mutation({
      query: (credentials) => ({
        url: "/applicationformat/create/nocletterformat",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["nocLetterFormat"],
    }),

    getLeaveApplicationFormat: builder.query({
      query: (company_id) => ({
        url: `/applicationformat/leaveapplicationformat/`,
        params: { company_id: company_id },
      }),
      providesTags: ["leaveApplicationFormat"],
    }),

    getOfferLetterFormat: builder.query({
      query: (company_id) => ({
        url: `/applicationformat/offerletterformat/`,
        params: { company_id: company_id },
      }),
      providesTags: ["offerLetterFormat"],
    }),
    getExperienceCertificateFormat: builder.query({
      query: (company_id) => ({
        url: `/applicationformat/experiencecertificateformat`,
        params: { company_id: company_id },
      }),
      providesTags: ["experienceCertificateFormat"],
    }),

    getJoiningLetterFormat: builder.query({
      query: (company_id) => ({
        url: `/applicationformat/joiningletterformat/`,
        params: { company_id: company_id },
      }),
      providesTags: ["joiningLetterFormat"],
    }),

    getNocLetterFormat: builder.query({
      query: (company_id) => ({
        url: `/applicationformat/nocletterformat`,
        params: { company_id: company_id },
      }),
      providesTags: ["nocletterformat"],
    }),

    // document type endpoint
    createDocsType: builder.mutation({
      query: (credentials) => ({
        url: "/docstype/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["docsType"],
    }),

    getAllDocsTypeList: builder.query({
      query: (companyId) => ({
        url: `/docstype/list`,
        params: { companyId },
      }),
      providesTags: ["docsType"],
    }),

    deleteDocsType: builder.mutation({
      query: (docsTypeId) => ({
        url: `/docstype/delete/`,
        method: "DELETE",
        params: { docsTypeId },
      }),
      invalidatesTags: ["docsType"],
    }),

    updateDocsType: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/docstype/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["docsType"],
    }),

    getDocsTypeDetails: builder.query({
      query: (id) => ({
        url: `/docstype/details`,
        params: { id },
      }),

      providesTags: ["docsType"],
    }),

    // image uploader
    uploadImage: builder.mutation({
      query: (credentials) => ({
        url: "/upload-asset",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": undefined,
        },
      }),
      invalidatesTags: ["assetUp"],
    }),

    getEmployeeAsset: builder.query({
      query: (employeeId) => ({
        url: `/assets/${employeeId}`,
        params: { employeeId },
      }),

      providesTags: ["assetUp"],
    }),

    deleteEmployeeAsset: builder.mutation({
      query: (assetId) => ({
        url: `/assets`,
        method: "DELETE",
        params: { assetId },
      }),
      invalidatesTags: ["assetUp"],
    }),

    createBrand: builder.mutation({
      query: (credentials) => ({
        url: "/systemSettings/create/brandsetting",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": undefined,
        },
      }),
      invalidatesTags: ["brand"],
    }),

    getbrand: builder.query({
      query: (companyId) => ({
        url: `/systemSettings/getbrand`,
        params: { companyId },
      }),

      providesTags: ["brand"],
    }),

    // system setting route
    createSystemSettings: builder.mutation({
      query: (credentials) => ({
        url: "/systemSettings/create/systemsettings",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["systemSettings"],
    }),

    getSystemSettings: builder.query({
      query: (companyId) => ({
        url: `/systemSettings/getsystemsettings`,
        params: { companyId },
      }),

      providesTags: ["systemSettings"],
    }),

    // currency setting route
    createCurrencySetting: builder.mutation({
      query: (credentials) => ({
        url: "/systemSettings/create/currencysettings",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["currency"],
    }),

    getCurrencySetting: builder.query({
      query: (companyId) => ({
        url: `/systemSettings/getcurrencysettings`,
        params: { companyId },
      }),
      providesTags: ["currency"],
    }),

    // email setting route
    createEmailSetting: builder.mutation({
      query: (credentials) => ({
        url: "/systemSettings/create/emailsettings",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["emailSetting"],
    }),

    getEmailSetting: builder.query({
      query: (companyId) => ({
        url: `/systemSettings/getemailsettings`,
        params: { companyId },
      }),
      providesTags: ["emailSetting"],
    }),

    // payment setting route
    createPaymentSettings: builder.mutation({
      query: (credentials) => ({
        url: "/systemSettings/create/paymentsettings",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["paymentSetting"],
    }),

    getPaymentSettings: builder.query({
      query: (companyId) => ({
        url: `/systemSettings/getpaymentsettings`,
        params: { companyId },
      }),
      providesTags: ["paymentSetting"],
    }),

    // zoom setting route
    createZoomSetting: builder.mutation({
      query: (credentials) => ({
        url: "/systemSettings/create/zoomsettings",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["zoomSetting"],
    }),

    getZoomSetting: builder.query({
      query: (companyId) => ({
        url: `/systemSettings/getzoomsettings`,
        params: { companyId },
      }),
      providesTags: ["zoomSetting"],
    }),

    // Notification Setting
    createNotificationSetting: builder.mutation({
      query: (credentials) => ({
        url: "/systemSettings/create/notificationsettings",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["notificationSetting"],
    }),

    getNotificationSetting: builder.query({
      query: (companyId) => ({
        url: `/systemSettings/getnotificationsettings`,
        params: { companyId },
      }),
      providesTags: ["notificationSetting"],
    }),

    // biometric setting
    createBiometricSetting: builder.mutation({
      query: (credentials) => ({
        url: "/systemSettings/create/biometricsettings",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["biometricSetting"],
    }),

    getBiometricSetting: builder.query({
      query: (companyId) => ({
        url: `/systemSettings/getbiometricsettings`,
        params: { companyId },
      }),
      providesTags: ["biometricSetting"],
    }),

    // job time line
    createJobTimeLine: builder.mutation({
      query: (credentials) => ({
        url: "/jobtimeline/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["jobTimeline"],
    }),

    getJobTimeLine: builder.query({
      query: (employee_id) => ({
        url: `/jobtimeline/joblist`,
        params: { employee_id },
      }),
      providesTags: ["jobTimeline"],
    }),

    deleteJobTimeLine: builder.mutation({
      query: (id) => ({
        url: `/jobtimeline/delete`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["jobTimeline"],
    }),

    updateJobTimeline: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/jobtimeline/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["jobTimeline"],
    }),

    getJobTimeLineDetails: builder.query({
      query: (id) => `/jobtimeline/details/${id}`,
      providesTags: ["jobTimeline"],
    }),

    // bonus end point
    createBonusType: builder.mutation({
      query: (credentials) => ({
        url: "/bonus/type/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["bonus_type"],
    }),

    getBonusTypeList: builder.query({
      query: (companyId) => ({
        url: `/bonus/type/list`,
        params: { companyId },
      }),
      providesTags: ["bonus_type"],
    }),

    deleteBonusType: builder.mutation({
      query: (bonusTypeId) => ({
        url: `/bonus/type/delete`,
        method: "DELETE",
        params: { bonusTypeId },
      }),
      invalidatesTags: ["bonus_type"],
    }),

    updateBonusType: builder.mutation({
      query: ({ bonusTypeId, ...credentials }) => ({
        url: `/bonus/type/update/${bonusTypeId}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["bonus_type"],
    }),

    getBonusTypeDetails: builder.query({
      query: (bonusTypeId) => ({
        url: `/bonus/type/details`,
        params: { bonusTypeId },
      }),
      providesTags: ["bonus_type"],
    }),

    // promotion
    createPromotion: builder.mutation({
      query: (credentials) => ({
        url: "/promotion/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Employee"],
    }),

    getEmployeeSalaryIncrement: builder.query({
      query: (employee_id, company_id) => ({
        url: `/promotion/get/salaryincrement`,
        params: { employee_id, company_id },
      }),
      providesTags: ["Employee"],
    }),

    GeneratedEmployeeSalaryBulk: builder.mutation({
      query: (credentials) => ({
        url: `/salarysetting/bulk-salary-generate`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["employeesalarysheet"],
    }),
    getGeneratedSalarySheet: builder.query({
      query: ({ companyId, month, year }) => ({
        url: `/salarysetting/getsalarysheet`,
        params: { companyId, month, year },
      }),
      providesTags: ["employeesalarysheet"],
    }),

    getEmployeeSalarySheet: builder.query({
      query: ({ employeeId, companyId, month, year }) => ({
        url: `/salarysetting/getemployeesalary`,
        params: { employeeId, companyId, month, year },
      }),
      providesTags: ["employeesalarysheet"],
    }),

    bulkEmployeePayment: builder.mutation({
      query: (credentials) => ({
        url: `/salarysetting/bulk-payment-update`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["employeesalarysheet"],
    }),

    updateSalarySheet: builder.mutation({
      query: ({ employeeId, ...credentials }) => ({
        url: `/salarysetting/update-salary/${employeeId}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["employeesalarysheet"],
    }),

    deleteSalarySheet: builder.mutation({
      query: ({ employeeId, generate_date }) => ({
        url: `/salarysetting/salary-sheet/delete`,
        method: "DELETE",
        params: { employeeId, generate_date },
      }),
      invalidatesTags: ["employeesalarysheet"],
    }),

    // device configuration
    addDeviceConfiguration: builder.mutation({
      query: (credentials) => ({
        url: "/device/add",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["device"],
    }),

    updateDeviceConfiguration: builder.mutation({
      query: ({ deviceId, ...credentials }) => ({
        url: `/device/update/${deviceId}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["device"],
    }),
    deleteDeviceConfigure: builder.mutation({
      query: (id) => ({
        url: `/device/delete`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["device"],
    }),

    getDeviceList: builder.query({
      query: (companyId) => ({
        url: `/device/company-device`,
        params: { companyId },
      }),
      providesTags: ["device"],
    }),

    getDeviceDetails: builder.query({
      query: (deviceId) => ({
        url: `/device/get-details/${deviceId}`,
      }),
      providesTags: ["device"],
    }),

    getCompanyAttendance: builder.query({
      query: (date) => ({
        url: `/device/get-attendance`,
        params: { date },
      }),
      providesTags: ["device"],
    }),

    // module permission
    addModulePermission: builder.mutation({
      query: (credentials) => ({
        url: "/modulepermission/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["modulePermission"],
    }),

    getModuleList: builder.query({
      query: () => ({
        url: `/modulepermission/modulelist`,
      }),
      providesTags: ["modulePermission"],
    }),

    getModuleDetails: builder.query({
      query: (deviceId) => ({
        url: `/modulepermission/details/${deviceId}`,
      }),
      providesTags: ["modulePermission"],
    }),

    updateModuleDetails: builder.mutation({
      query: ({ moduleId, ...credentials }) => ({
        url: `/modulepermission/update/${moduleId}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["modulePermission"],
    }),

    deleteModule: builder.mutation({
      query: (moduleId) => ({
        url: `/modulepermission/delete`,
        method: "DELETE",
        params: { moduleId },
      }),
      invalidatesTags: ["modulePermission"],
    }),

    // user permission
    createUserPermission: builder.mutation({
      query: (credentials) => ({
        url: "/userpermission/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["userPermission"],
    }),

    getUserPermission: builder.query({
      query: (userId) => ({
        url: `/userpermission/get/${userId}`,
      }),
      providesTags: ["userPermission"],
    }),

    getUserPerModule: builder.query({
      query: (userId) => ({
        url: `/userpermission/get/module/${userId}`,
      }),
      providesTags: ["userPermission"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdatePasswordMutation,
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
  useUpdateEmployeeMutation,

  // useGetCompanyDetailsQuery,
  // useCreateNewCompanyMutation,
  // useUpdateCompanyMutation,
  // useDeleteCompanyMutation,

  useAddShiftMutation,
  useGetShiftListQuery,
  useDeleteShiftMutation,
  useGetShiftDetailsQuery,
  useUpdateShiftMutation,

  // branch
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useGetBranchDetailsQuery,
  useGetBranchListQuery,
  useDeleteBranchMutation,

  // Department

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
  useGetAllEmployeeApplicationQuery,
  useGetAllEmployeeLeaveListQuery,
  useGetAllLeaveApplicationQuery,
  useUpdateLeaveApplicationMutation,
  useCalculationLeaveDaysQuery,
  useGetEarnLeaveQuery,
  useCreateEarnLeaveMutation,
  useDeleteApplicationMutation,

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
  useGetEmployeeAllowanceDetailsQuery,
  useUpdateEmployeeAllowanceMutation,
  useUpdateAllowanceTypeMutation,
  useDeleteAllowanceTypeMutation,
  useDeleteEmployeeAllowanceMutation,
  useGetAllowanceTypeDetailsQuery,

  useCreateAllowanceTypeMutation,
  useCreateEmployeeeAllowanceMutation,
  useCreatePayslipAllowanceMutation,

  useGetAllowanceTypeListQuery,
  useGetEmployeeAllowanceQuery,
  useGetPayslipEmployeeAllowanceQuery,

  //Deduction
  useCreateDeductionTypeMutation,
  useCreateEmployeeeDeductionMutation,
  useGetDeductionTypeListQuery,
  useGetEmployeeDeductionQuery,
  useUpdateDeductionMutation,
  useDeleteDeductionMutation,
  useGetDeductionTypeDetailsQuery,
  useUpdateDeductionTypeMutation,
  useDeleteEmployeeDeductionMutation,
  useDeleteDeductionTypeMutation,
  useGetEmployeeDeductionDetailsQuery,
  useCreateBasicSalaryMutation,
  useGetEmployeeBasicSalaryDetailsQuery,

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

  useApplyLoanMutation,
  useGetApplyLoanListQuery,
  useGetAppliedLoanDetailsQuery,
  useDeleteAppliedLoanMutation,
  useUpdateAppliedLoanMutation,
  useGetCompanyLoanListQuery,
  useUpdateLoanApplicationApprovalMutation,

  // applicationFormat
  useCreateLeaveApplicationFormatMutation,
  useGetLeaveApplicationFormatQuery,
  useGetLeaveApplicationDetailsQuery,

  useOfferLetterFormatMutation,
  useGetOfferLetterFormatQuery,

  useGetJoiningLetterFormatQuery,
  useCreateJoiningLetterFormatMutation,

  useCreateExperienceCertificateFormatMutation,
  useGetExperienceCertificateFormatQuery,

  useCreateNocLetterFormatMutation,
  useGetNocLetterFormatQuery,

  // docs type Routes
  useCreateDocsTypeMutation,
  useGetAllDocsTypeListQuery,
  useDeleteDocsTypeMutation,
  useUpdateDocsTypeMutation,
  useGetDocsTypeDetailsQuery,

  // upload image
  useUploadImageMutation,
  useGetEmployeeAssetQuery,
  useDeleteEmployeeAssetMutation,

  //brand route
  useCreateBrandMutation,
  useGetbrandQuery,
  // useUpdateBrandMutation,
  // useDeleteBrandMutation,

  // system setting route
  useCreateSystemSettingsMutation,
  useGetSystemSettingsQuery,

  // useGetSystemSettingsQuery,
  // useUpdateSystemSettingsMutation,
  // useDeleteSystemSettingsMutation,

  // currency setting route
  useCreateCurrencySettingMutation,
  useGetCurrencySettingQuery,
  // useUpdateCurrencySettingMutation,
  // useDeleteCurrencySettingMutation,

  // email setting route
  useCreateEmailSettingMutation,
  useGetEmailSettingQuery,

  // payment Setting routes
  useCreatePaymentSettingsMutation,
  useGetPaymentSettingsQuery,

  // zoom setting route
  useCreateZoomSettingMutation,
  useGetZoomSettingQuery,

  // notification settings route
  useCreateNotificationSettingMutation,
  useGetNotificationSettingQuery,

  // biometric settings route
  useCreateBiometricSettingMutation,
  useGetBiometricSettingQuery,

  // job time line
  useCreateJobTimeLineMutation,
  useGetJobTimeLineQuery,
  useDeleteJobTimeLineMutation,
  useUpdateJobTimelineMutation,
  useGetJobTimeLineDetailsQuery,

  // employee commission
  useCreateEmployeeCommissionMutation,
  useGetEmployeeCommissionListQuery,
  useGetEmployeeCommissionDetailsQuery,
  useUpdateEmployeeCommissionMutation,
  useDeleteEmployeeCommissionMutation,

  // employee over time
  useCreateEmployeeOverTimeMutation,
  useGetEmployeeOverTimeDetailsQuery,

  // bonus end point
  useCreateBonusTypeMutation,
  useGetBonusTypeListQuery,
  useDeleteBonusTypeMutation,
  useUpdateBonusTypeMutation,
  useGetBonusTypeDetailsQuery,

  // promotion
  useCreatePromotionMutation,
  useGetEmployeeSalaryIncrementQuery,

  useGeneratedEmployeeSalaryBulkMutation,
  useGetGeneratedSalarySheetQuery,
  useUpdateSalarySheetMutation,
  useDeleteSalarySheetMutation,

  // device configure
  useAddDeviceConfigurationMutation,
  useUpdateDeviceConfigurationMutation,
  useDeleteDeviceConfigureMutation,
  useGetDeviceListQuery,
  useGetDeviceDetailsQuery,

  useGetCompanyAttendanceQuery,

  useGetEmployeeSalarySheetQuery,
  useBulkEmployeePaymentMutation,
  useGetActiveCompanyQuery,
  useCreateActiveCompanyMutation,

  useAddModulePermissionMutation,
  useGetModuleListQuery,
  useGetModuleDetailsQuery,
  useUpdateModuleDetailsMutation,
  useDeleteModuleMutation,

  useCreateUserPermissionMutation,
  useGetUserPermissionQuery,
  useGetUserPerModuleQuery,
} = apiSlice;
