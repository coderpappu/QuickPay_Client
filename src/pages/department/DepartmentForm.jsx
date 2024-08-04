import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../utils/api';
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const DepartmentSchema = Yup.object().shape({
    name: Yup.string().required('Department Name is required'),
    department_head_id: Yup.string().required('Department head is required'),
});

const DepartmentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [initialValues, setInitialValues] = useState({
        name: '',
        department_head_id: '',
    });

    const [departmentHeads, setDepartmentHeads] = useState([]);

    // Fetch department heads
    useEffect(() => {
        // Replace with your API call to fetch department heads
        setDepartmentHeads([{ head_id: "3333", name: "haed one" }, { head_id: "33433", name: "haed two" }])
    }, []);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={DepartmentSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    // Your form submission logic here

                    console.log(values);
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className="">
                            {[
                                { label: 'Department name', name: 'name', type: 'text' },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                        {field.label}
                                    </label>
                                    <Field
                                        type={field.type}
                                        name={field.name}
                                        id={field.name}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            ))}
                            <div className="mt-4">
                                <label htmlFor="department_head_id" className="block text-sm font-medium text-gray-700">
                                    Department head
                                </label>
                                <Field
                                    as="select"
                                    name="department_head_id"
                                    id="department_head_id"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select a department head</option>
                                    {departmentHeads.map(head => (
                                        <option key={head.id} value={head.id}>
                                            {head.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="department_head_id" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default DepartmentForm;
