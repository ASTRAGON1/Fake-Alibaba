import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSignOutAlt, FaStore, FaCog } from 'react-icons/fa';
import Button from './Button';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center text-2xl font-bold text-primary">
                        <span className="text-secondary mr-1">Fake</span>Alibaba
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <form onSubmit={handleSearch} className="w-full relative">
                            <input
                                type="text"
                                placeholder="Search products, brands and categories..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md hover:bg-red-600 transition-colors"
                                aria-label="Search"
                            >
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {isAuthenticated ? (
                            <>
                                {user.role === 'seller' && (
                                    <Link to="/seller/dashboard" className="flex flex-col items-center text-gray-600 hover:text-primary">
                                        <FaStore className="text-xl mb-1" />
                                        <span className="text-xs">Store</span>
                                    </Link>
                                )}

                                {user.role === 'admin' && (
                                    <Link to="/admin/dashboard" className="flex flex-col items-center text-gray-600 hover:text-primary">
                                        <FaCog className="text-xl mb-1" />
                                        <span className="text-xs">Admin</span>
                                    </Link>
                                )}

                                <Link to="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-primary relative">
                                    <FaHeart className="text-xl mb-1" />
                                    <span className="text-xs">Wishlist</span>
                                    {wishlistItems.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                            {wishlistItems.length}
                                        </span>
                                    )}
                                </Link>

                                <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-primary relative">
                                    <FaShoppingCart className="text-xl mb-1" />
                                    <span className="text-xs">Cart</span>
                                    {cartItems.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Link>

                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-gray-700 hover:text-primary focus:outline-none">
                                        <img
                                            src={user.avatar || 'https://ui-avatars.com/api/?name=User'}
                                            alt="Profile"
                                            className="h-8 w-8 rounded-full border border-gray-200"
                                        />
                                        <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                                    </button>
                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                                        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-gray-100 flex items-center"
                                        >
                                            <FaSignOutAlt className="mr-2" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-700 hover:text-primary font-medium">Log In</Link>
                                <Button to="/signup" variant="primary" size="small">Sign Up</Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <Link to="/cart" className="text-gray-600 mr-4 relative">
                            <FaShoppingCart className="text-xl" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                                    <FaSearch />
                                </button>
                            </div>
                        </form>

                        <div className="flex flex-col space-y-3">
                            <Link to="/" className="text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link to="/products" className="text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>All Products</Link>

                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" className="text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
                                    <Link to="/orders" className="text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                                    <Link to="/wishlist" className="text-gray-700 font-medium py-2 flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                                        Wishlist <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">{wishlistItems.length}</span>
                                    </Link>

                                    {user.role === 'seller' && (
                                        <Link to="/seller/dashboard" className="text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>Seller Dashboard</Link>
                                    )}

                                    {user.role === 'admin' && (
                                        <Link to="/admin/dashboard" className="text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                                    )}

                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-danger font-medium py-2 text-left flex items-center">
                                        <FaSignOutAlt className="mr-2" /> Sign Out
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-3 pt-2">
                                    <Link to="/login" className="text-center py-2 border border-gray-300 rounded-md text-gray-700 font-medium">Log In</Link>
                                    <Link to="/signup" className="text-center py-2 bg-primary text-white rounded-md font-medium">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;