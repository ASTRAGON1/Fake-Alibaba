import { Link } from 'react-router-dom';
import { FaUserFriends, FaShoppingBag, FaMoneyBillWave, FaChartBar, FaExclamationTriangle } from 'react-icons/fa';
import { formatPrice } from '../../utils/helpers';

const AdminDashboard = () => {
    // TODO: Link with backend - fetch admin stats from API
    const stats = [];

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                            <div className={`p-4 rounded-full mr-4 ${stat.color}`}>
                                <span className="text-xl">{stat.icon}</span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quick Links */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Management</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/admin/users" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center text-center">
                                <FaUserFriends className="text-3xl text-primary mb-2" />
                                <span className="font-medium text-gray-700">Manage Users</span>
                            </Link>
                            <Link to="/admin/products" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center text-center">
                                <FaShoppingBag className="text-3xl text-primary mb-2" />
                                <span className="font-medium text-gray-700">Manage Products</span>
                            </Link>
                            <Link to="/admin/orders" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center text-center">
                                <FaChartBar className="text-3xl text-primary mb-2" />
                                <span className="font-medium text-gray-700">Analytics</span>
                            </Link>
                            <Link to="/admin/settings" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center text-center">
                                <FaExclamationTriangle className="text-3xl text-primary mb-2" />
                                <span className="font-medium text-gray-700">Moderation</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {/* TODO: Link with backend - fetch recent activity from API */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
