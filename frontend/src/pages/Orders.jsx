import { Link } from 'react-router-dom';
import { FaBoxOpen, FaEye } from 'react-icons/fa';
import { formatPrice, formatDate, getStatusColor } from '../utils/helpers';

const Orders = () => {
    // Mock Orders Data
    const orders = [
        { id: 'ORD-2026-001', date: '2026-02-01', total: 429.50, status: 'Delivered', itemCount: 3 },
        { id: 'ORD-2026-002', date: '2026-01-25', total: 125.00, status: 'Shipped', itemCount: 1 },
        { id: 'ORD-2026-003', date: '2026-01-14', total: 899.99, status: 'Processing', itemCount: 5 },
        { id: 'ORD-2025-098', date: '2025-12-20', total: 54.00, status: 'Cancelled', itemCount: 2 },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.date)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{formatPrice(order.total)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full badge-${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.itemCount} Items</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/orders/${order.id}`} className="text-primary hover:text-red-700 flex items-center justify-end">
                                                <FaEye className="mr-1" /> View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {orders.length === 0 && (
                        <div className="p-12 text-center">
                            <FaBoxOpen className="mx-auto text-4xl text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                            <p className="text-gray-500 mt-1 mb-6">Start shopping to see your orders here.</p>
                            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
