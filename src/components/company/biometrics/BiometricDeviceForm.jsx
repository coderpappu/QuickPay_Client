import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useAddDeviceConfigurationMutation,
  useGetCompanyIdQuery,
  useUpdateDeviceConfigurationMutation,
} from "../../../features/api";

const DeviceSchema = Yup.object({
  name: Yup.string().required("Device Name is required"),
  configMethod: Yup.string()
    .oneOf(["API", "IP"], "Invalid Configuration Method")
    .required("Configuration Method is required"),
  apiUrl: Yup.string().when("configMethod", {
    is: "API",
    then: (schema) => schema.required("API URL is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  username: Yup.string().when("configMethod", {
    is: "API",
    then: (schema) => schema.required("Username is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: Yup.string().when("configMethod", {
    is: "API",
    then: (schema) => schema.required("Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  authKey: Yup.string().when("configMethod", {
    is: "API",
    then: (schema) => schema.required("Auth Key is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ipAddress: Yup.string().when("configMethod", {
    is: "IP",
    then: (schema) => schema.required("IP Address is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  port: Yup.string().when("configMethod", {
    is: "IP",
    then: (schema) => schema.required("Port is required"),
    otherwise: (schema) => schema.notRequired(),
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
              className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            />
            <ErrorMessage
              name="apiUrl"
              component="div"
              className="mt-1 text-sm text-red-500"
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
              className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="mt-1 text-sm text-red-500"
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
              className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-sm text-red-500"
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
              className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            />
            <ErrorMessage
              name="authKey"
              component="div"
              className="mt-1 text-sm text-red-500"
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
              className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            />
            <ErrorMessage
              name="ipAddress"
              component="div"
              className="mt-1 text-sm text-red-500"
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
              className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            />
            <ErrorMessage
              name="port"
              component="div"
              className="mt-1 text-sm text-red-500"
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

  const [addDevice] = useAddDeviceConfigurationMutation();
  const { data: companyId } = useGetCompanyIdQuery();
  const [updateDevice] = useUpdateDeviceConfigurationMutation();

  // const [updateDevice] = useUpdateDeviceMutation();

  const { data: company_id } = useGetCompanyIdQuery();
  // const { data: deviceData, isLoading: deviceLoading } =
  //   useGetDeviceDetailsQuery(deviceId, {
  //     skip: !deviceId,
  //   });

  // if (deviceLoading) return <CardSkeleton />;

  const initialValues = {
    name: "",
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
            await addDevice({ ...values, company_id }).unwrap();
          } else {
            // await updateDevice({
            //   id: deviceId,
            //   ...values,
            //   company_id,
            // }).unwrap();
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
        <Form className="mx-auto max-w-4xl px-4 py-6">
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
                className="h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-sm text-red-500"
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
                className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-bg px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
              >
                <option value="API">API</option>
                <option value="IP">IP</option>
              </Field>
              <ErrorMessage
                name="configMethod"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Conditional Fields */}
            <ConditionalFields />

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="hover:bg-button-hover rounded-md bg-button-bg px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DeviceForm;
