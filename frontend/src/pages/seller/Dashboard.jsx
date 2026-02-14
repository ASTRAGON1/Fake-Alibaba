import { Link } from 'react-router-dom';
import { FaBox, FaShoppingBag, FaMoneyBillWave, FaChartLine, FaPlus } from 'react-icons/fa';
import { formatPrice } from '../../utils/helpers';
import Button from '../../components/Button';

const SellerDashboard = () => {
    // TODO: Link with backend - fetch seller stats from API
    const stats = [];

    // TODO: Link with backend - fetch recent orders from API
    const recentOrders = [];

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
                    <Button to="/seller/products/add" className="flex items-center">
                        <FaPlus className="mr-2" /> Add Product
                    </Button>
                </div>

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
                    {/* Recent Orders */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                            <Link to="/seller/orders" className="text-primary text-sm hover:underline">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-500 text-sm border-b border-gray-100">
                                        <th className="pb-3">Order ID</th>
                                        <th className="pb-3">Product</th>
                                        <th className="pb-3">Amount</th>
                                        <th className="pb-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                            <td className="py-3 font-medium text-primary">{order.id}</td>
                                            <td className="py-3 text-gray-600">{order.product}</td>
                                            <td className="py-3 font-medium">{formatPrice(order.amount)}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions / Notifications */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Notifications</h2>
                        <div className="space-y-4">
                            {/* TODO: Link with backend - fetch notifications from API */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
