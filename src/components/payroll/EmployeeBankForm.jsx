import { ErrorMessage, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateEmployeeBankAccMutation,
  useUpdateBankAccMutation,
} from "../../features/api";
import { InputBox, SelectOptionBox } from "../company/BrandInput";

// Define initial validation schema
const validationSchema = Yup.object().shape({
  bank_name: Yup.string().required("Bank name is required"),
  branch_name: Yup.string().required("Branch name is required"),
  bank_acc_no: Yup.string()
    .required("Account number is required")
    .matches(/^\d+$/, "Account number must be a valid number"),
  routing_no: Yup.string().matches(
    /^[0-9]{9}$/,
    "Routing number must be 9 digits",
  ),
});

const BankAccountForm = ({ onClose, initialData }) => {
  const [createBankAcc] = useCreateEmployeeBankAccMutation();
  const [updateBankAcc] = useUpdateBankAccMutation();

  const company_id = useSelector((state) => state.company.companyId);
  const { id: employee_id } = useParams();

  const initialValues = {
    bank_name: initialData?.bank_name || "",
    branch_name: initialData?.branch_name || "",
    routing_no: initialData?.routing_no || "",
    bank_acc_no: initialData?.bank_acc_no || "",
  };

  // Array of bank options for select dropdown
  const banks = [
    "Sonali Bank Ltd.",
    "Janata Bank Ltd.",
    "Agrani Bank Ltd.",
    "Rupali Bank Ltd.",
    "Dutch-Bangla Bank Ltd.",
    "BRAC Bank Ltd.",
    "Eastern Bank Ltd.",
    "Islami Bank Bangladesh Ltd.",
    "Prime Bank Ltd.",
    "City Bank Ltd.",
    "Standard Chartered Bank",
    "HSBC Bangladesh",
    "Other",
  ];

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting }) => {
    if (!initialData) {
      try {
        await createBankAcc({ ...values, company_id, employee_id }).unwrap();
        toast.success("Bank Account created successfully");
        onClose();
      } catch (error) {
        toast.error("An error occurred while submitting the form.");
      } finally {
        setSubmitting(false);
      }
    }
    if (initialData) {
      try {
        await updateBankAcc({
          ...values,
          company_id,
          employee_id,
          acc_id: initialData?.id,
        }).unwrap();
        toast.success("Bank Account updated successfully");
        onClose();
      } catch (error) {
        toast.error("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mx-auto max-w-md space-y-6 rounded-md p-4">
          <h2 className="text-lg font-semibold">Bank Account Form</h2>

          <div>
            <label className="text-sm font-medium">Bank Name*</label>
            <SelectOptionBox name="bank_name" values={banks} />
            <ErrorMessage
              name="bank_name"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Branch Name*</label>
            <InputBox name="branch_name" placeholder="e.g., Gulshan Branch" />
            <ErrorMessage
              name="branch_name"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Routing Number</label>
            <InputBox name="routing_no" placeholder="Optional" />
            <ErrorMessage
              name="routing_no"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Account Number*</label>
            <InputBox name="bank_acc_no" placeholder="e.g., 1005789456123" />
            <ErrorMessage
              name="bank_acc_no"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BankAccountForm;
