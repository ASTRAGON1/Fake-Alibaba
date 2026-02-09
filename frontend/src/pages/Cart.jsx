import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import Button from '../components/Button';

const Cart = () => {
    const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="bg-gray-50 min-h-[calc(100vh-400px)] flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-gray-100 p-6 rounded-full mb-4 text-gray-400">
                    <FaShoppingCart className="text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Button to="/products" variant="primary">
                    Start Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart ({cartItems.length} items)</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-medium text-gray-500">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Unit Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>

                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center last:border-0">
                                    <div className="col-span-6 flex items-center">
                                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md border border-gray-200 mr-4" />
                                        <div>
                                            <Link to={`/products/${item.id}`} className="font-medium text-gray-900 hover:text-primary line-clamp-2">
                                                {item.title}
                                            </Link>
                                            <p className="text-xs text-gray-500 mt-1">MOQ: {item.moq}</p>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-xs text-danger hover:underline mt-2 flex items-center md:hidden"
                                            >
                                                <FaTrash className="mr-1" /> Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-center hidden md:block">
                                        {formatPrice(item.price)}
                                    </div>

                                    <div className="col-span-2 flex justify-center">
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-l-md"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= (item.moq || 1)}
                                            >-</button>
                                            <input
                                                type="number"
                                                className="w-12 text-center border-x border-gray-300 py-1 text-sm focus:outline-none"
                                                value={item.quantity}
                                                readOnly
                                            />
                                            <button
                                                className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-r-md"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-right font-medium text-gray-900 flex flex-col items-end justify-between h-full">
                                        <span className="md:hidden text-xs text-gray-500 mb-1">Total:</span>
                                        {formatPrice(item.price * item.quantity)}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-xs text-gray-400 hover:text-danger mt-2 hidden md:flex items-center"
                                        >
                                            <FaTrash className="mr-1" /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-6">
                            <Link to="/products" className="flex items-center text-primary font-medium hover:underline">
                                <FaArrowLeft className="mr-2" /> Continue Shopping
                            </Link>
                            <button
                                onClick={clearCart}
                                className="text-gray-500 hover:text-danger text-sm"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping Estimate</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                                <span>Total</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>

                            <Button to="/checkout" variant="primary" fullWidth className="mb-4 flex items-center justify-center">
                                Proceed to Checkout <FaArrowRight className="ml-2" />
                            </Button>

                            <div className="flex items-center justify-center space-x-2 text-gray-400 text-2xl">
                                <i className="fab fa-cc-visa"></i>
                                <i className="fab fa-cc-mastercard"></i>
                                <i className="fab fa-cc-paypal"></i>
                                <i className="fab fa-cc-stripe"></i>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                Secure Checkout - SSL Encrypted
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;