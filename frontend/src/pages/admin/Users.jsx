import { useState } from 'react';
import { FaEdit, FaTrash, FaUserShield, FaBan } from 'react-icons/fa';
import Button from '../../components/Button';

const AdminUsers = () => {
    // TODO: Link with backend - fetch users from API
    const [users, setUsers] = useState([]);

    const handleDelete = (id) => {
        // TODO: Link with backend - DELETE /api/admin/users/:id
    };

    const handleStatusChange = (id, currentStatus) => {
        // TODO: Link with backend - PUT /api/admin/users/:id/status
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">User Management</h1>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold mr-3">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'Seller' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => handleStatusChange(user.id, user.status)}
                                            className={`${user.status === 'Active' ? 'text-yellow-600 hover:text-yellow-800' : 'text-green-600 hover:text-green-800'}`}
                                            title={user.status === 'Active' ? 'Suspend' : 'Activate'}
                                        >
                                            {user.status === 'Active' ? <FaBan /> : <FaUserShield />}
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700" title="Delete">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
