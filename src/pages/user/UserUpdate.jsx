import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../../features/api";

const UserUpdate = ({ user, onClose }) => {
  const [updateUser, { isError, isLoading }] = useUpdateUserMutation();

  return (
    <div className="py-4 md:w-full lg:w-[400px]">
      <Formik
        initialValues={{
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          phone: user.phone || "",
          email: user.email || "",
          role: user.type || "SUBSCRIBER",
          status: user.status || "ACTIVE",
        }}
        validate={(values) => {
          const errors = {};
          // first name
          if (!values.first_name) {
            errors.first_name = "Required";
          } else if (values.first_name.length < 3) {
            errors.first_name = "First name must be at least 3 characters";
          }
          // last name
          if (!values.last_name) {
            errors.last_name = "Required";
          } else if (values.last_name.length < 2) {
            errors.last_name = "Last name must be at least 2 characters";
          }
          // email
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          // phone
          if (!values.phone) {
            errors.phone = "Required";
          } else if (values.phone.length < 10) {
            errors.phone = "Phone number must be at least 10 characters";
          }
          // role
          if (!values.role) {
            errors.role = "Required";
          }
          // status
          if (!values.status) {
            errors.status = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const userData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            type: values.role,
            status: values.status,
          };
          try {
            await updateUser({ id: user.id, ...userData }).unwrap();

            toast.success("User update successfully completed!");

            onClose();
          } catch (error) {
            toast.error("User update failed!");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="first_name" className="text-md text-[#797979]">
              First Name
            </label>
            <Field
              type="text"
              name="first_name"
              placeholder="Pappu"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            />
            <ErrorMessage
              name="first_name"
              component="div"
              className="text-[red]"
            />

            <label htmlFor="last_name" className="text-md text-[#797979]">
              Last Name
            </label>
            <Field
              type="text"
              name="last_name"
              placeholder="Dey"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            />
            <ErrorMessage
              name="last_name"
              component="div"
              className="text-[red]"
            />

            <label htmlFor="email" className="text-md text-[#797979]">
              Email Address
            </label>
            <Field
              type="email"
              name="email"
              placeholder="coder@gmail.com"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            />
            <ErrorMessage name="email" component="div" className="text-[red]" />

            <label htmlFor="phone" className="text-md text-[#797979]">
              Phone
            </label>
            <Field
              type="text"
              name="phone"
              placeholder="0152536362"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            />
            <ErrorMessage name="phone" component="div" className="text-[red]" />

            <label htmlFor="role" className="text-md text-[#797979]">
              Role
            </label>
            <Field
              as="select"
              name="role"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            >
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SUBSCRIBER">SUBSCRIBER</option>
            </Field>
            <ErrorMessage name="role" component="div" className="text-[red]" />

            <label htmlFor="status" className="text-md text-[#797979]">
              Status
            </label>
            <Field
              as="select"
              name="status"
              className="border-1 mb-3 mt-1 h-12 w-[100%] rounded-[5px] border-[#3686FF] px-1 dark:bg-dark-box"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </Field>
            <ErrorMessage
              name="status"
              component="div"
              className="text-[red]"
            />

            <button
              className="mt-4 rounded-md bg-[#61638A] px-10 py-2 text-white lg:px-16 lg:py-3"
              type="submit"
              disabled={isSubmitting}
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserUpdate;
