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
import { useEffect, useState } from "react";
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
  const [canSubmit, setCanSubmit] = useState(true);
  const { id } = useParams();
  const [createNewCompany] = useCreateNewCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [initialValues, setInitialValues] = useState({
    company_name: "",
    address: "",
    country: "",
    city: "",
    state: "",
    postal_code: "",
    email: "",
    phone_number: "",
    mobile_number: "",
    fax: "",
    website_url: "",
    date_format: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: "English",
    currency_code: "",
    currency_symbol: "",
    logo: null,
  });

  const {
    data: company,
    isLoading: isCompanyLoading,
    isError: isCompanyLoadingError,
  } = useGetCompanyDetailsQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (company) {
      setInitialValues({
        company_name: company.companyDetails.company_name,
        address: company.companyDetails.address,
        country: company.companyDetails.country,
        city: company.companyDetails.city,
        state: company.companyDetails.state,
        postal_code: company.companyDetails.postal_code,
        email: company.companyDetails.email,
        phone_number: company.companyDetails.phone_number,
        mobile_number: company.companyDetails.mobile_number,
        fax: company.companyDetails.fax,
        website_url: company.companyDetails.website_url,
        date_format: company.companyDetails.date_format,
        timezone: company.companyDetails.timezone,
        language: company.companyDetails.language,
        currency_code: company.companyDetails.currency_code,
        currency_symbol: company.companyDetails.currency_symbol,
        logo: company.companyDetails.logo,
      });
    }
  }, [company]);

  const handleDeleteLogo = () => {
    setInitialValues({
      ...initialValues,
      logo: null,
    });
  };

  if (isCompanyLoading) {
    return <FormSkeleton />;
  }

  if (isCompanyLoadingError) {
    return <h3>Some error occurred</h3>;
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        let {
          company_name,
          address,
          country,
          city,
          state,
          postal_code,
          email,
          phone_number,
          mobile_number,
          fax,
          website_url,
          date_format,
          timezone,
          language,
          currency_code,
          currency_symbol,
          logo,
        } = values;

        try {
          if (!id) {
            const response = await createNewCompany({
              company_name,
              address,
              country,
              city,
              state,
              postal_code,
              email,
              phone_number,
              mobile_number,
              fax,
              website_url,
              date_format,
              timezone,
              language,
              currency_code,
              currency_symbol,
              logo,
            });
            if (response.error) {
              toast.error(response.error.data.msg);
            } else {
              toast.success("Company created successfully");
              setSubmitting(false);
              // navigate("/company/list");
            }
          } else {
            const response = await updateCompany({
              id,
              company_name,
              address,
              country,
              city,
              state,
              postal_code,
              email,
              phone_number,
              mobile_number,
              fax,
              website_url,
              date_format,
              timezone,
              language,
              currency_code,
              currency_symbol,
              logo,
            });
            if (response.error) {
              toast.error(response.error.data.msg);
            } else {
              toast.success("Company updated successfully");
              setSubmitting(false);
              navigate("/company/list");
            }
          }
        } catch (error) {
          toast.error(error.message);
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
                />
              )}
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
