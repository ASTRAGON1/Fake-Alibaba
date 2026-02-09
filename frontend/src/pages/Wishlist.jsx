import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { FaHeart } from 'react-icons/fa';
import Button from '../components/Button';

const Wishlist = () => {
    const { wishlistItems } = useWishlist();

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center mb-8">
                    <FaHeart className="text-primary text-2xl mr-3" />
                    <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                    <span className="ml-3 bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {wishlistItems.length} items
                    </span>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <FaHeart className="text-4xl" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Browse our catalog and tap the heart icon to save products you want to buy later.
                        </p>
                        <Button to="/products" variant="primary">
                            Start Shopping
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
