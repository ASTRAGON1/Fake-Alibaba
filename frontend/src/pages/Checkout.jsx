import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast from '../components/Toast';
import { FaCheck, FaTruck, FaCreditCard, FaLock } from 'react-icons/fa';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            clearCart();
            navigate('/orders'); // Actually should go to order success page
        }, 2000);
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Checkout Flow */}
                    <div className="lg:w-2/3">

                        {/* Steps Indicator */}
                        <div className="mb-8 flex items-center justify-between relative">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>

                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex flex-col items-center bg-gray-50 px-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
                                        {step > s ? <FaCheck /> : s}
                                    </div>
                                    <span className={`text-xs mt-1 font-medium ${step >= s ? 'text-primary' : 'text-gray-500'}`}>
                                        {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Step 1: Shipping Address */}
                        {step === 1 && (
                            <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <FaTruck className="mr-3 text-primary" /> Shipping Information
                                </h2>
                                <div className="space-y-4">
                                    <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                    <Input label="Address" name="address" value={formData.address} onChange={handleChange} required />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
                                        <Input label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                                    </div>
                                    <Input label="Country" name="country" value={formData.country} onChange={handleChange} required />
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <Button onClick={nextStep}>Continue to Payment</Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <FaCreditCard className="mr-3 text-primary" /> Payment Method
                                </h2>

                                <div className="mb-6 p-4 bg-blue-50 text-info text-sm rounded-md border border-blue-100 flex items-start">
                                    <FaLock className="mr-2 mt-0.5" />
                                    Your payment information is encrypted and secure. We do not store your full card details.
                                </div>

                                <div className="space-y-4">
                                    <Input label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleChange} required />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input label="Expiry Date" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} required />
                                        <Input label="CVC" name="cvc" placeholder="123" value={formData.cvc} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-between">
                                    <Button variant="outline" onClick={prevStep}>Back</Button>
                                    <Button onClick={nextStep}>Review Order</Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review */}
                        {step === 3 && (
                            <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <FaCheck className="mr-3 text-primary" /> Review Order
                                </h2>

                                <div className="mb-6 border-b border-gray-100 pb-6">
                                    <h3 className="font-bold text-gray-800 mb-2">Shipping Information</h3>
                                    <p className="text-gray-600 text-sm">
                                        {formData.fullName}<br />
                                        {formData.address}<br />
                                        {formData.city}, {formData.postalCode}<br />
                                        {formData.country}
                                    </p>
                                </div>

                                <div className="mb-6 border-b border-gray-100 pb-6">
                                    <h3 className="font-bold text-gray-800 mb-2">Payment Information</h3>
                                    <p className="text-gray-600 text-sm flex items-center">
                                        <FaCreditCard className="mr-2" />
                                        Visa ending in **** {formData.cardNumber.slice(-4) || '0000'}
                                    </p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{item.title} <span className="text-xs text-gray-400">x{item.quantity}</span></span>
                                            <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <Button variant="outline" onClick={prevStep}>Back</Button>
                                    <Button onClick={handlePlaceOrder} disabled={loading}>
                                        {loading ? 'Processing...' : `Pay ${formatPrice(cartTotal)}`}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900">
                                <span>Total</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
