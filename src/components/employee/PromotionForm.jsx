import { Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useCreatePromotionMutation,
  useGetDepartmentsQuery,
  useGetDesignationsQuery,
  useGetEmployeeSalaryIncrementQuery,
  useGetSectionsQuery,
} from "../../features/api";
import { InputBox } from "../company/BrandInput";
import InputTitle from "../company/InputTitle";
const PromotionForm = ({ onClose, employeeDetails }) => {
  const companyId = useSelector((state) => state.company.companyId);
  const employee_id = useParams().id;

  const { data: deptList } = useGetDepartmentsQuery(companyId);
  const { data: desgList } = useGetDesignationsQuery(companyId);
  const { data: sectionList } = useGetSectionsQuery(companyId);
  const [createPromotion] = useCreatePromotionMutation();
  const { data: employeeSalaryIncrement } = useGetEmployeeSalaryIncrementQuery({
    employee_id,
    companyId,
  });

  const totalIncrementSalary = employeeSalaryIncrement?.data?.reduce(
    (total, item) => total + item.increment_salary,
    0,
  );

  const initialValues = {};

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await createPromotion({
            employeeId: employeeDetails?.id,
            departmentId: values.departmentId || "",
            designationId: values.designationId || "",
            sectionId: values.sectionId || "",
            companyId: companyId,
            increment_salary: values.increment_salary || "",
            increment_date: values.increment_date || "",
          });
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* department */}
            <div className="flex gap-2">
              <div className="mb-4 w-[50%]">
                <InputTitle title="Department from" />
                <InputBox
                  name="department"
                  value={
                    employeeDetails?.EmployeeDepartment[0]?.department?.name
                  }
                  placeholder="Software Developer"
                  disabled
                />
              </div>
              <div className="mb-4 w-[50%]">
                <InputTitle title="Promoted to" />

                <Field
                  as="select"
                  name="departmentId"
                  id="departmentId"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                >
                  <option value="">Select Department</option>
                  {deptList?.data?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            {/* designation */}
            <div className="flex gap-2">
              <div className="mb-4 w-[50%]">
                <InputTitle title="Designation from" />
                <InputBox
                  name="designationId"
                  value={
                    employeeDetails?.EmployeeDesignation[0]?.designation?.name
                  }
                  placeholder="Software Developer"
                  disabled
                />
              </div>
              <div className="mb-4 w-[50%]">
                <InputTitle title="Promoted to" />

                <Field
                  as="select"
                  name="designationId"
                  id="designationId"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                >
                  <option value="">Select Designation</option>
                  {desgList?.data?.map((desg) => (
                    <option key={desg.id} value={desg.id}>
                      {desg.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            {/* section */}
            <div className="flex gap-2">
              <div className="mb-4 w-[50%]">
                <InputTitle title="Section from" />
                <InputBox
                  name="sectionId"
                  value={employeeDetails?.EmployeeSection[0]?.section.name}
                  placeholder="Software Developer"
                  disabled
                />
              </div>
              <div className="mb-4 w-[50%]">
                <InputTitle title="Promoted to" />

                <Field
                  as="select"
                  name="sectionId"
                  id="sectionId"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-dark-border-color dark:border-opacity-10 dark:bg-dark-box dark:text-dark-text-color"
                >
                  <option value="">Select Section</option>
                  {sectionList?.data?.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            {/* increment */}
            <div className="flex gap-2">
              <div className="mb-4 w-[32%]">
                <InputTitle title="Total increment" />
                <InputBox
                  name="increment_salary"
                  value={totalIncrementSalary}
                  placeholder="00"
                  disabled
                />
              </div>
              <div className="mb-4 w-[32%]">
                <InputTitle title="New increment" />
                <InputBox
                  name="increment_salary"
                  type="number"
                  placeholder="00"
                />
              </div>
              <div className="mb-4 w-[32%]">
                <InputTitle title="Increment Date" />
                <InputBox name="increment_date" type="date" />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 rounded-md border border-dark-border-color bg-white px-4 py-2 text-sm font-medium text-gray-800 dark:border-opacity-10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PromotionForm;
