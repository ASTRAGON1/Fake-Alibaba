import { Link } from 'react-router-dom';
import { FaBox, FaShoppingBag, FaMoneyBillWave, FaChartLine, FaPlus } from 'react-icons/fa';
import { formatPrice } from '../../utils/helpers';
import Button from '../../components/Button';

const SellerDashboard = () => {
    // Mock Stats
    const stats = [
        { label: 'Total Sales', value: formatPrice(15240), icon: <FaMoneyBillWave />, color: 'bg-green-100 text-green-600' },
        { label: 'Total Orders', value: '1,245', icon: <FaShoppingBag />, color: 'bg-blue-100 text-blue-600' },
        { label: 'Products', value: '45', icon: <FaBox />, color: 'bg-orange-100 text-orange-600' },
        { label: 'Growth', value: '+12.5%', icon: <FaChartLine />, color: 'bg-purple-100 text-purple-600' },
    ];

    // Mock Recent Orders
    const recentOrders = [
        { id: 'ORD-001', product: 'Wireless Headphones', customer: 'John Doe', date: '2026-02-07', amount: 129.99, status: 'Pending' },
        { id: 'ORD-002', product: 'Bluetooth Speaker', customer: 'Jane Smith', date: '2026-02-06', amount: 89.99, status: 'Shipped' },
        { id: 'ORD-003', product: 'Smart Watch', customer: 'Bob Johnson', date: '2026-02-05', amount: 199.99, status: 'Delivered' },
    ];

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
                            <div className="flex items-start p-3 bg-blue-50 rounded-md border border-blue-100">
                                <div className="text-blue-500 mt-1 mr-3"><FaShoppingBag /></div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">New Order Recieved</h4>
                                    <p className="text-xs text-gray-600 mt-1">You have received a new order #ORD-004 from Alice.</p>
                                    <span className="text-xs text-gray-400 block mt-2">2 mins ago</span>
                                </div>
                            </div>
                            <div className="flex items-start p-3 bg-yellow-50 rounded-md border border-yellow-100">
                                <div className="text-yellow-600 mt-1 mr-3"><FaBox /></div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Low Stock Alert</h4>
                                    <p className="text-xs text-gray-600 mt-1">Product "Wireless Earbuds" is running low on stock (5 left).</p>
                                    <span className="text-xs text-gray-400 block mt-2">1 hour ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
