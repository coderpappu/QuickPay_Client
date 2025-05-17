import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';

const TaskForm = ({
  initialValues,
  users,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    priority: Yup.string().oneOf(['low', 'medium', 'high', 'urgent']).required('Priority is required'),
    assignedTo: Yup.object().required('Assignee is required'),
    dueDate: Yup.date().required('Due date is required')
  });

  const statusOptions = [
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'review', label: 'Under Review' },
    { value: 'completed', label: 'Completed' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-box rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text-color">
            {isEditing ? 'Edit Task' : 'Create New Task'}
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
          {({ setFieldValue, values }) => (
            <Form className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Task Title*
                  </label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Enter task title"
                    className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority*
                  </label>
                  <Field
                    as="select"
                    name="priority"
                    className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                  >
                    <option value="">Select Priority</option>
                    {priorityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="priority" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description*
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter task description"
                  rows={4}
                  className="w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assign To*
                  </label>
                  <Field
                    as="select"
                    name="assignedTo.id"
                    className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                    onChange={(e) => {
                      const selectedUser = users.find(user => user.id === e.target.value);
                      if (selectedUser) {
                        setFieldValue('assignedTo', selectedUser);
                      }
                    }}
                  >
                    <option value="">Select Assignee</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} {user.position ? `(${user.position})` : ''}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="assignedTo" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date*
                  </label>
                  <Field
                    name="dueDate"
                    type="date"
                    className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                  />
                  <ErrorMessage name="dueDate" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
              
              {isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-button-bg hover:bg-button-bg/90 text-white rounded-md text-sm font-medium transition-colors"
                >
                  {isEditing ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;