import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  useCreateEmployeeCommissionMutation,
  useDeleteEmployeeCommissionMutation,
  useGetEmployeeCommissionListQuery,
  useUpdateEmployeeCommissionMutation,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import { InputBox, SelectOptionBox } from "../company/BrandInput";

const commissionSchema = Yup.object().shape({
  totalSale: Yup.number().required("Total Sale is required"),
  commissionType: Yup.string().required("Commission type is required"),
  amount: Yup.number().required("Amount is required"),
});

const EditPanel = ({ editSheet, onEditClose }) => {
  const [generateCommission] = useCreateEmployeeCommissionMutation();

  const employee_id = editSheet?.id;
  const companyId = useSelector((state) => state.company.companyId);

  const { data: employeeCommission } = useGetEmployeeCommissionListQuery({
    employeeId: employee_id,
    companyId,
  });

  const [updateCommission] = useUpdateEmployeeCommissionMutation();

  const [deleteCommission] = useDeleteEmployeeCommissionMutation();

  const initialValues = {
    totalSale: employeeCommission?.data?.[0]?.total_sale || "",
    commissionType: employeeCommission?.data?.[0]?.type || "PERCENTAGE",
    amount: employeeCommission?.data?.[0]?.value || "",
    companyId,
    employee_id,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    let total_com = values.amount;

    if (values.commissionType === "PERCENTAGE") {
      total_com = (values?.totalSale * values.amount) / 100;
    }

    try {
      if (employeeCommission?.data) {
        await updateCommission({
          id: employeeCommission?.data[0]?.id,
          employee_id,
          company_id: companyId,
          ...values,
          total_com,
        }).unwrap();

        toast.success("Commission updated successfully!");
        onEditClose();
      } else {
        await generateCommission({ ...values, total_com });
        toast.success("Commission saved successfully!");
        onEditClose();
      }
    } catch (error) {
      toast.error("Failed to save commission.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCommission = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteCommission(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Employee Commission deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete Commission");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Commission"
          />
        ),
        {
          duration: Infinity,
        },
      );
    onEditClose();
    confirm();
  };

  return (
    <div className="mx-auto max-w-3xl rounded-md p-6 shadow-md">
      <div className="mb-6 flex flex-wrap justify-between">
        <div>Employee ID : {editSheet?.employeeId}</div>
        <div>Month : {editSheet?.gen_date}</div>
      </div>

      <div className="w-full border border-white border-opacity-5 p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={commissionSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Total Sale */}
              <div>
                <label className="block text-sm font-medium dark:text-dark-text-color">
                  Total Sale
                </label>
                <InputBox name="totalSale" type="number" placeholder="10000" />
                <ErrorMessage
                  name="totalSale"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Commission Type */}
              <div>
                <label className="block text-sm font-medium dark:text-dark-text-color">
                  Commission Type
                </label>
                <SelectOptionBox
                  name="commissionType"
                  values={["PERCENTAGE", "FIXED"]}
                />
                <ErrorMessage
                  name="commissionType"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium dark:text-dark-text-color">
                  {values.commissionType === "PERCENTAGE"
                    ? "Percentage"
                    : "Amount"}
                </label>
                <InputBox name="amount" type="number" placeholder="10" />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteCommission(employeeCommission?.data[0]?.id)
                  }
                  disabled={!employeeCommission?.data[0]?.id}
                  className="rounded-sm bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-sm bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPanel;
