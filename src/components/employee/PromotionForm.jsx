import { Field, Form, Formik } from "formik";
import React from "react";
import {
  useGetCompanyIdQuery,
  useGetDepartmentsQuery,
  useGetDesignationsQuery,
  useGetSectionsQuery,
} from "../../features/api";
import { InputBox } from "../company/BrandInput";
import InputTitle from "../company/InputTitle";

const PromotionForm = ({ onClose, employeeDetails }) => {
  const { data: companyId } = useGetCompanyIdQuery();

  const { data: deptList } = useGetDepartmentsQuery(companyId);
  const { data: desgList } = useGetDesignationsQuery(companyId);
  const { data: sectionList } = useGetSectionsQuery(companyId);

  const initialValues = {};

  return (
    <div className="w-full">
      <Formik initialValues={initialValues} onSubmit={async (values) => {}}>
        {({ isSubmitting }) => (
          <Form>
            {/* department */}
            <div className="flex gap-2">
              <div className="mb-4 w-[50%]">
                <InputTitle title="Department from" />
                <InputBox
                  name="jobTitle"
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
                  name="designationId"
                  id="designationId"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-dark-box  dark:border-dark-border-color dark:border-opacity-10 dark:text-dark-text-color"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-dark-box  dark:border-dark-border-color dark:border-opacity-10 dark:text-dark-text-color"
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
                  name="section"
                  value={employeeDetails?.EmployeeSection[0]?.section.name}
                  placeholder="Software Developer"
                  disabled
                />
              </div>
              <div className="mb-4 w-[50%]">
                <InputTitle title="Promoted to" />

                <Field
                  as="select"
                  name="section"
                  id="section"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-dark-box  dark:border-dark-border-color dark:border-opacity-10 dark:text-dark-text-color"
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
              <div className="mb-4 w-[50%]">
                <InputTitle title="Total increment" />
                <InputBox name="increment" value="" placeholder="00" disabled />
              </div>
              <div className="mb-4 w-[50%]">
                <InputTitle title="New increment" />
                <InputBox name="increment" type="number" placeholder="00" />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 bg-white rounded-md text-sm font-medium text-gray-800 border border-dark-border-color dark:border-opacity-10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 rounded-md text-sm font-medium text-white"
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
