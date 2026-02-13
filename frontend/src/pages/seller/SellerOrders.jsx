import { useState } from 'react';
import { formatPrice, formatDate, getStatusColor } from '../../utils/helpers';

const SellerOrders = () => {
    // TODO: Link with backend - fetch seller orders from API
    const [orders, setOrders] = useState([]);

    const handleStatusChange = (id, newStatus) => {
        // TODO: Link with backend - PUT /api/orders/:id/status
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Manage Orders</h1>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.date)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatPrice(order.total)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full badge-${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <select
                                            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-1"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
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

export default SellerOrders;
