import { useParams, Link } from 'react-router-dom';
import { formatPrice, formatDate, getStatusColor } from '../utils/helpers';
import { FaArrowLeft, FaPrint, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../components/Button';

const OrderDetail = () => {
    const { id } = useParams();

    // TODO: Link with backend - fetch order details from API
    const order = null;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/orders" className="flex items-center text-gray-600 hover:text-primary">
                        <FaArrowLeft className="mr-2" /> Back to Orders
                    </Link>
                    <button className="flex items-center text-gray-600 hover:text-primary" onClick={() => window.print()}>
                        <FaPrint className="mr-2" /> Print Invoice
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Order #{order.id}</h1>
                            <p className="text-gray-500 text-sm">Placed on {formatDate(order.date)}</p>
                        </div>
                        <div className={`mt-4 md:mt-0 px-3 py-1 rounded-full text-sm font-semibold badge-${getStatusColor(order.status)}`}>
                            {order.status}
                        </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
                                <FaMapMarkerAlt className="mr-2 text-gray-400" /> Shipping Address
                            </h3>
                            <address className="not-italic text-gray-600 text-sm leading-relaxed">
                                <span className="font-bold text-gray-900">{order.shippingAddress.name}</span><br />
                                {order.shippingAddress.address}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                {order.shippingAddress.country}
                            </address>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
                                <FaTruck className="mr-2 text-gray-400" /> Shipment Details
                            </h3>
                            {/* TODO: Link with backend - fetch shipment details from API */}
                            <p className="text-gray-600 text-sm">Payment: {order?.paymentMethod}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-100">
                        <h3 className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 bg-gray-50">
                            Items Ordered
                        </h3>
                        <div className="divide-y divide-gray-100">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-6 flex items-center">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded border border-gray-200 mr-4" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right font-bold text-gray-900">
                                        {formatPrice(item.price * item.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex flex-col items-end space-y-2">
                            <div className="flex justify-between w-full md:w-64 text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between w-full md:w-64 text-sm text-gray-600">
                                <span>Shipping</span>
                                <span>{formatPrice(order.shipping)}</span>
                            </div>
                            <div className="flex justify-between w-full md:w-64 text-sm text-gray-600">
                                <span>Tax</span>
                                <span>{formatPrice(order.tax)}</span>
                            </div>
                            <div className="flex justify-between w-full md:w-64 text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                <span>Total</span>
                                <span>{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <Button variant="outline" to="/help" className="mr-4">Need Help?</Button>
                    <Button to="/products">Re-order Items</Button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
