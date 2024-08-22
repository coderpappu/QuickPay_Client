import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  useCreateNewCompanyMutation,
  useGetCompanyDetailsQuery,
  useUpdateCompanyMutation,
} from "../../features/api";
import { useState } from "react";
import UploadForm from "../../helpers/UploadForm";
import FormSkeleton from "../../skeletons/FormSkeleton";

const SignupSchema = Yup.object().shape({
  company_name: Yup.string().required("Company Name is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postal_code: Yup.string()
    .required("Postal Code is required")
    .length(4, "Postal code must be exactly 4 characters"),
  email: Yup.string().email("Invalid email"),
  phone_number: Yup.string()
    .required("Phone Number is required")
    .length(11, "Phone Number must be exactly 11 characters"),
  mobile_number: Yup.string().length(
    11,
    "Mobile Number must be exactly 11 characters"
  ),
  fax: Yup.string().notRequired(),
  website_url: Yup.string().url("Invalid URL"),
  date_format: Yup.string().required("Date Format is required"),
  timezone: Yup.string().required("Timezone is required"),
  language: Yup.string().required("Language is required"),
  currency_code: Yup.string().required("Currency Code is required"),
  currency_symbol: Yup.string().required("Currency Symbol is required"),
  logo: Yup.mixed().notRequired(),
});

const CompanyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // `id` will be undefined for create mode
  const [canSubmit, setCanSubmit] = useState(true);
  const [createNewCompany] = useCreateNewCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();

  const {
    data: company,
    isLoading,
    isError,
  } = useGetCompanyDetailsQuery(id, {
    skip: !id, // Skip fetching company details if there's no `id`
  });

  const initialValues = {
    company_name: company?.data?.company_name || "",
    address: company?.data?.address || "",
    country: company?.data?.country || "",
    city: company?.data?.city || "",
    state: company?.data?.state || "",
    postal_code: company?.data?.postal_code || "",
    email: company?.data?.email || "",
    phone_number: company?.data?.phone_number || "",
    mobile_number: company?.data?.mobile_number || "",
    fax: company?.data?.fax || "",
    website_url: company?.data?.website_url || "",
    date_format: company?.data?.date_format || "",
    timezone:
      company?.data?.timezone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: company?.data?.language || "English",
    currency_code: company?.data?.currency_code || "",
    currency_symbol: company?.data?.currency_symbol || "",
    logo: company?.data?.logo || null,
  };

  const handleDeleteLogo = () => {
    setCanSubmit(true);
    // setFieldValue("logo", null);
  };

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (isError) {
    return <h3>Some error occurred</h3>;
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let response;
          if (id) {
            // Update existing company
            response = await updateCompany({ id, ...values });
          } else {
            // Create a new company
            response = await createNewCompany(values);
          }

          if (response.error) {
            toast.error(response.error.data.message);
          } else {
            toast.success(`Company ${id ? "updated" : "created"} successfully`);
            setSubmitting(false);
            navigate("/company/list");
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Company Name", name: "company_name", type: "text" },
              { label: "Address", name: "address", type: "text" },
              { label: "Country", name: "country", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "Postal Code", name: "postal_code", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "phone_number", type: "text" },
              { label: "Mobile Number", name: "mobile_number", type: "text" },
              { label: "Fax", name: "fax", type: "text" },
              { label: "Website URL", name: "website_url", type: "url" },
              { label: "Date Format", name: "date_format", type: "text" },
              { label: "Timezone", name: "timezone", type: "text" },
              { label: "Language", name: "language", type: "text" },
              { label: "Currency Code", name: "currency_code", type: "text" },
              {
                label: "Currency Symbol",
                name: "currency_symbol",
                type: "text",
              },
            ].map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <Field
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}
            <div>
              {initialValues.logo ? (
                <div className="flex">
                  <img
                    src={initialValues.logo}
                    className="w-40vw"
                    alt="Company Logo"
                  ></img>
                  <button
                    className="text-red-500 hover:text-red-700 ml-2"
                    type="button"
                    onClick={handleDeleteLogo}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ) : (
                <UploadForm
                  setFieldValue={setFieldValue}
                  canSubmit={canSubmit}
                  setCanSubmit={setCanSubmit}
                  name="logo"
                />
              )}
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className={` w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${!canSubmit && "bg-[#a582dc]"} bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 `}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyForm;
