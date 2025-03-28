const SalarySettings = () => {
  // const [selectedAllowances, setSelectedAllowances] = useState([]);
  // const [selectedDeductions, setSelectedDeductions] = useState([]);
  // const [selectedGrade, setSelectedGrade] = useState("");
  // const { data: companyId } = useGetCompanyIdQuery();
  // const id = useParams()?.id;
  // const {
  //   data: allowancesList,
  //   isLoading: allowanceLoading,
  //   isError: allowanceError,
  // } = useGetAllowanceListQuery(companyId);
  // const {
  //   data: deductionsList,
  //   isLoading: deductionLoading,
  //   isError: deductionError,
  // } = useGetDeductionListQuery(companyId);
  // const {
  //   data: gradeList,
  //   isLoading: gradeLoading,
  //   isError: gradeError,
  // } = useGetGradeListQuery(companyId);
  // const { data: SalarySetting } = useGetSalarySettingQuery();
  // // Set initial selected allowances based on SalarySetting
  // useEffect(() => {
  //   if (SalarySetting?.data) {
  //     const initialAllowances = SalarySetting?.data?.allowances.map(
  //       (allowance) => allowance?.allowance?.id
  //     );
  //     const initialDeductions = SalarySetting?.data?.deductions.map(
  //       (deduction) => deduction?.deduction?.id
  //     );
  //     const initialgrades = SalarySetting?.data?.grade?.grade?.id;
  //     setSelectedGrade(initialgrades);
  //     setSelectedDeductions(initialDeductions || []);
  //     setSelectedAllowances(initialAllowances || []);
  //   }
  // }, [SalarySetting]);
  // const [createSalarySetting, { isLoading, isError }] =
  //   useCreateEmployeeAllowanceMutation();
  // const handleAllowanceChange = (allowanceId) => {
  //   setSelectedAllowances((prev) =>
  //     prev.includes(allowanceId)
  //       ? prev.filter((id) => id !== allowanceId)
  //       : [...prev, allowanceId]
  //   );
  // };
  // const handleDeductionChange = (deductionId) => {
  //   setSelectedDeductions((prev) =>
  //     prev.includes(deductionId)
  //       ? prev.filter((id) => id !== deductionId)
  //       : [...prev, deductionId]
  //   );
  // };
  // const handleGradeChange = (e) => {
  //   setSelectedGrade(e.target.value);
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const salaryData = {
  //     allowanceIds: selectedAllowances.map((id) => ({ id, checked: true })),
  //     deductionIds: selectedDeductions.map((id) => ({ id, checked: true })),
  //     gradeId: selectedGrade,
  //     companyId: companyId,
  //     employeeId: id,
  //   };
  //   createSalarySetting(salaryData);
  //   alert("Salary settings saved (check console for details)");
  // };
  // if (allowanceLoading || deductionLoading || gradeLoading)
  //   return <p>Loading...</p>;
  // if (allowanceError || deductionError || gradeError) return "Error ";
  // return (
  //   <div className="w-full mt-5 mb-2 rounded-mde flex flex-wrap justify-between ">
  //     <div className="w-[49%] relative p-4 bg-white dark:bg-dark-card rounded-md">
  //       <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
  //         Salary Settings
  //       </h1>
  //       <form onSubmit={handleSubmit} className="w-full">
  //         {/* Allowances Section */}
  //         <div className="mb-4">
  //           <h2 className="text-sm font-semibold mb-2 text-[#3c3c3c] dark:text-dark-text-color">
  //             Allowances
  //           </h2>
  //           {allowancesList?.data?.map((allowance) => (
  //             <div key={allowance?.id} className="flex items-center mb-1">
  //               <input
  //                 type="checkbox"
  //                 id={allowance?.id}
  //                 checked={selectedAllowances.includes(allowance?.id)}
  //                 onChange={() => handleAllowanceChange(allowance?.id)}
  //                 className="mr-2"
  //               />
  //               <label htmlFor={allowance?.id} className="text-gray-700">
  //                 {allowance?.name}
  //               </label>
  //             </div>
  //           ))}
  //         </div>
  //         {/* Deductions Section */}
  //         <div className="mb-4">
  //           <h2 className="text-sm font-semibold mb-2 dark:text-dark-text-color">
  //             Deductions
  //           </h2>
  //           {deductionsList?.data?.map((deduction) => (
  //             <div key={deduction.id} className="flex items-center mb-1">
  //               <input
  //                 type="checkbox"
  //                 id={deduction.id}
  //                 checked={selectedDeductions.includes(deduction.id)}
  //                 onChange={() => handleDeductionChange(deduction.id)}
  //                 className="mr-2"
  //               />
  //               <label htmlFor={deduction.id} className="text-gray-700">
  //                 {deduction.name}
  //               </label>
  //             </div>
  //           ))}
  //         </div>
  //         {/* Grade Selection */}
  //         <div className="mb-4">
  //           <label className="block text-sm font-semibold mb-2 text-[#3c3c3c] dark:text-dark-text-color">
  //             Grade
  //           </label>
  //           <select
  //             value={selectedGrade}
  //             onChange={handleGradeChange}
  //             className="w-full border rounded-md p-2 dark:bg-dark-box border-none dark:text-dark-text-color"
  //           >
  //             <option value="">Select Grade</option>
  //             {gradeList?.data?.map((grade) => (
  //               <option key={grade?.id} value={grade?.id}>
  //                 {grade?.name}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //         {/* Submit Button */}
  //         <button
  //           type="submit"
  //           className="bg-blue-500 text-white rounded-md px-4 py-2 mt-3 text-sm "
  //         >
  //           Save
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default SalarySettings;
