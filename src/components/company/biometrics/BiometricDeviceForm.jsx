import { ErrorMessage, Field, Formik, useFormikContext } from "formik";
import toast from "react-hot-toast";
import { Form, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {
  useCreateDeviceMutation,
  useGetCompanyIdQuery,
  useGetDeviceDetailsQuery,
  useUpdateDeviceMutation,
} from "../../../features/api";
import CardSkeleton from "../../../skeletons/card";

const DeviceSchema = Yup.object().shape({
  name: Yup.string().required("Device Name is required"),
  configMethod: Yup.string().required("Configuration Method is required"),
  apiUrl: Yup.string().when("configMethod", {
    is: "API",
    then: Yup.string().required("API URL is required"),
  }),
  username: Yup.string().when("configMethod", {
    is: "API",
    then: Yup.string().required("Username is required"),
  }),
  password: Yup.string().when("configMethod", {
    is: "API",
    then: Yup.string().required("Password is required"),
  }),
  authKey: Yup.string().when("configMethod", {
    is: "API",
    then: Yup.string().required("Auth Key is required"),
  }),
  ipAddress: Yup.string().when("configMethod", {
    is: "IP",
    then: Yup.string().required("IP Address is required"),
  }),
  port: Yup.string().when("configMethod", {
    is: "IP",
    then: Yup.string().required("Port is required"),
  }),
});

const ConditionalFields = () => {
  const { values } = useFormikContext();
  const configMethod = values.configMethod;

  return (
    <>
      {configMethod === "API" && (
        <>
          <div>
            <label
              htmlFor="apiUrl"
              className="block text-sm font-medium text-gray-700"
            >
              API URL
            </label>
            <Field
              type="text"
              name="apiUrl"
              id="apiUrl"
              placeholder="Enter API URL"
              className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
            />
            <ErrorMessage
              name="apiUrl"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <Field
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="authKey"
              className="block text-sm font-medium text-gray-700"
            >
              Auth Key
            </label>
            <Field
              type="text"
              name="authKey"
              id="authKey"
              placeholder="Enter Auth Key"
              className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
            />
            <ErrorMessage
              name="authKey"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
        </>
      )}

      {configMethod === "IP" && (
        <>
          <div>
            <label
              htmlFor="ipAddress"
              className="block text-sm font-medium text-gray-700"
            >
              IP Address
            </label>
            <Field
              type="text"
              name="ipAddress"
              id="ipAddress"
              placeholder="Enter IP Address"
              className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
            />
            <ErrorMessage
              name="ipAddress"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="port"
              className="block text-sm font-medium text-gray-700"
            >
              Port
            </label>
            <Field
              type="text"
              name="port"
              id="port"
              placeholder="Enter Port"
              className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
            />
            <ErrorMessage
              name="port"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
        </>
      )}
    </>
  );
};

const DeviceForm = ({ deviceId, setIsPopupOpen }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [createDevice, { isLoading }] = useCreateDeviceMutation();
  const [updateDevice] = useUpdateDeviceMutation();

  const { data: company_id } = useGetCompanyIdQuery();
  const { data: deviceData, isLoading: deviceLoading } =
    useGetDeviceDetailsQuery(deviceId, {
      skip: !deviceId,
    });

  if (deviceLoading) return <CardSkeleton />;

  const initialValues = {
    name: deviceData?.data?.name || "",
    configMethod: "API",
    apiUrl: "",
    username: "",
    password: "",
    authKey: "",
    ipAddress: "",
    port: "",
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={DeviceSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (!deviceId) {
            await createDevice({ ...values, company_id }).unwrap();
          } else {
            await updateDevice({
              id: deviceId,
              ...values,
              company_id,
            }).unwrap();
          }

          setIsPopupOpen(false);
          resetForm();
          toast.success("Device saved successfully!");
        } catch (error) {
          toast.error(error?.data?.message || "An error occurred");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {/* Device Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Device Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Enter Device Name"
                className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Configuration Method */}
            <div>
              <label
                htmlFor="configMethod"
                className="block text-sm font-medium text-gray-700"
              >
                Configuration Method
              </label>
              <Field
                as="select"
                name="configMethod"
                id="configMethod"
                className="w-full px-2 py-1 border-dark-box border border-opacity-5 bg-light-bg  dark:bg-dark-card rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
              >
                <option value="API">API</option>
                <option value="IP">IP</option>
              </Field>
              <ErrorMessage
                name="configMethod"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Conditional Fields */}
            <ConditionalFields />

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-button-bg text-white rounded-md hover:bg-button-hover"
              >
                {/* { "Saving..." : "Submit"} */}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DeviceForm;
