import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';



const DepartmentList = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Total 0 departments.</h1>
                <Link to="/department/create">
                    <button className="bg-[#6D28D9] text-white font-semibold py-1 px-2 rounded text-xs hover:bg-blue-700">
                        Add Department
                    </button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Created By</th>
                            <th className="py-2 px-4 border-b text-left">Department Head</th>
                            <th className="py-2 px-4 border-b text-left">Edit</th>
                            <th className="py-2 px-4 border-b text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       

                        <tr key="">
                            <td className="py-2 px-4 border-b text-left">Test</td>
                            <td className="py-2 px-4 border-b text-left">Test</td>
                            <td className="py-2 px-4 border-b text-left">Test</td>
                            
                            <td className="py-2 px-4 border-b text-left">
                                <Link to={`/company/update/`}>
                                    <button className="text-blue-500 ">
                                        <FontAwesomeIcon icon={faEdit} style={{ color: '#6D28D9' }}/>
                                    </button>
                                </Link>
                            </td>
                            <td className="py-2 px-4 border-b text-left">
                                <button className="text-red-500" type="button" >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default DepartmentList;