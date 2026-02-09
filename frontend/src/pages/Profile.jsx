import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Toast from '../components/Toast';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        company: user?.company || '',
        address: user?.address || '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            await updateProfile(formData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

                {message && (
                    <Toast
                        type={message.type}
                        message={message.text}
                        onClose={() => setMessage(null)}
                    />
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation (Mock) */}
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6 text-center border-b border-gray-100">
                                <img
                                    src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full mx-auto mb-3 border border-gray-200"
                                />
                                <h3 className="font-bold text-gray-900">{user?.name}</h3>
                                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                            </div>
                            <nav className="p-2">
                                <a href="#" className="block px-4 py-2 text-primary font-medium bg-red-50 rounded-md">Personal Info</a>
                                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Security</a>
                                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Addresses</a>
                                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Payment Methods</a>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Personal Information</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled
                                    />
                                    <Input
                                        label="Phone Number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 234 567 8900"
                                    />
                                    <Input
                                        label="Company Name"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Optional"
                                    />
                                    <div className="md:col-span-2">
                                        <Input
                                            label="Delivery Address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Street, City, Country"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
