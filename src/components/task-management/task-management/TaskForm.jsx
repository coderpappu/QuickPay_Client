import { ErrorMessage, Field, Form, Formik } from "formik";
import { X } from "lucide-react";
import * as Yup from "yup";

const TaskForm = ({
  initialValues,
  users,
  employees,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string()
      .oneOf(["LOW", "MEDIUM", "HIGH", "URGENT"])
      .required("Priority is required"),
    assignedToId: Yup.string().required("Assignee is required"),
    dueDate: Yup.date().required("Due date is required"),
  });

  const statusOptions = [
    { value: "NOT_STARTED", label: "Not Started" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "REVIEW", label: "Under Review" },
    { value: "COMPLETED", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
    { value: "URGENT", label: "Urgent" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-lg dark:bg-dark-box">
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text-color">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => {
            const formatDate = (date) => {
              if (!date) return "";
              const d = new Date(date);
              const month = `${d.getMonth() + 1}`.padStart(2, "0");
              const day = `${d.getDate()}`.padStart(2, "0");
              return `${d.getFullYear()}-${month}-${day}`;
            };

            return (
              <Form className="p-4">
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Task Title*
                    </label>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Enter task title"
                      className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Priority*
                    </label>
                    <Field
                      as="select"
                      name="priority"
                      className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                    >
                      <option value="">Select Priority</option>
                      {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="priority"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description*
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Enter task description"
                    rows={4}
                    className="w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Assign To*
                    </label>
                    <Field
                      as="select"
                      name="assignedToId"
                      value={values.assignedToId || ""}
                      className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                      onChange={(e) => {
                        setFieldValue("assignedToId", e.target.value);
                      }}
                    >
                      <option value="">Select Assignee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name} (
                          {employee?.EmployeeDesignation[0]?.designation?.name})
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="assignedToId"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Due Date*
                    </label>
                    <Field
                      name="dueDate"
                      type="date"
                      value={formatDate(values.dueDate)}
                      className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                      onChange={(e) => setFieldValue("dueDate", e.target.value)}
                    />
                    <ErrorMessage
                      name="dueDate"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status
                      </label>
                      <Field
                        as="select"
                        name="status"
                        className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Progress (%)
                      </label>
                      <Field
                        name="progress"
                        type="number"
                        min="0"
                        max="100"
                        className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-button-bg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-button-bg/90"
                  >
                    {isEditing ? "Save Changes" : "Create Task"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
