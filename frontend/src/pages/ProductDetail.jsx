import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart, FaShippingFast, FaCheck, FaShieldAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/Button';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { formatPrice } from '../utils/helpers';

// Mock Product Data
const MOCK_PRODUCT = {
    id: 1,
    title: "Industrial Grade Wireless Headphones with Noise Cancellation",
    price: 129.99,
    originalPrice: 199.99,
    description: "Experience high-fidelity audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable memory foam ear cushions. Perfect for bulk orders and corporate gifts.",
    images: [
        "https://picsum.photos/seed/head1/600/600",
        "https://picsum.photos/seed/head2/600/600",
        "https://picsum.photos/seed/head3/600/600",
        "https://picsum.photos/seed/head4/600/600"
    ],
    rating: 4.8,
    numReviews: 324,
    stock: 1500,
    moq: 10,
    sku: "HP-WL-001",
    brand: "TechSound",
    specifications: [
        { name: "Connectivity", value: "Bluetooth 5.2" },
        { name: "Battery Life", value: "30 Hours" },
        { name: "Charging Time", value: "2 Hours" },
        { name: "Driver Size", value: "40mm" },
        { name: "Weight", value: "250g" }
    ],
    seller: {
        id: 101,
        name: "Global Tech Suppliers Ltd.",
        rating: 4.9,
        years: 5
    }
};

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        // Simulate API fetch
        setLoading(true);
        setTimeout(() => {
            setProduct({ ...MOCK_PRODUCT, id: parseInt(id) || 1 });
            setLoading(false);
            setQuantity(MOCK_PRODUCT.moq);
        }, 600);
    }, [id]);

    if (loading) return <Loader fullScreen />;
    if (!product) return <div>Product not found</div>;

    const inWishlist = isInWishlist(product.id);

    const handleQuantityChange = (val) => {
        if (val < product.moq) return;
        setQuantity(val);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="bg-gray-50 py-8 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-6">
                    <Link to="/" className="hover:text-primary">Home</Link> /
                    <Link to="/products" className="hover:text-primary mx-1">Electronics</Link> /
                    <span className="text-gray-900 mx-1">{product.title}</span>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                    <div className="flex flex-col md:flex-row">
                        {/* Image Gallery */}
                        <div className="md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-100">
                            <div className="mb-4 aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.title}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="flex space-x-2 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden ${selectedImage === idx ? 'border-primary' : 'border-gray-200'
                                            }`}
                                        onClick={() => setSelectedImage(idx)}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="md:w-1/2 p-6 lg:p-10">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                {product.title}
                            </h1>

                            <div className="flex items-center mb-4">
                                <Rating value={product.rating} />
                                <span className="text-gray-500 ml-2 text-sm">
                                    {product.rating} ({product.numReviews} reviews) | {product.stock > 0 ? <span className="text-accent font-medium">In Stock</span> : <span className="text-danger font-medium">Out of Stock</span>}
                                </span>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="flex items-baseline mb-2">
                                    <span className="text-3xl font-bold text-primary mr-3">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-lg text-gray-400 line-through">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    <strong>MOQ:</strong> {product.moq} pieces
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>SKU:</strong> {product.sku}
                                </div>
                            </div>

                            <div className="mb-8">
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {product.description}
                                </p>
                                <div className="flex items-center space-x-6 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <FaShieldAlt className="text-accent mr-2" /> Trade Assurance
                                    </div>
                                    <div className="flex items-center">
                                        <FaShippingFast className="text-info mr-2" /> Fast Shipping
                                    </div>
                                    <div className="flex items-center">
                                        <FaCheck className="text-primary mr-2" /> Verified Supplier
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex items-center mb-6">
                                    <div className="mr-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600"
                                                onClick={() => handleQuantityChange(quantity - 1)}
                                                disabled={quantity <= product.moq}
                                            >-</button>
                                            <input
                                                type="number"
                                                className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                                                value={quantity}
                                                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || product.moq)}
                                            />
                                            <button
                                                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600"
                                                onClick={() => handleQuantityChange(quantity + 1)}
                                            >+</button>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-medium text-gray-700 mb-1">Total Price</span>
                                        <span className="text-xl font-bold text-gray-900">{formatPrice(product.price * quantity)}</span>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <Button
                                        className="flex-1 justify-center"
                                        onClick={handleAddToCart}
                                    >
                                        <FaShoppingCart className="mr-2" /> Add to Cart
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 justify-center"
                                        to="/messages/new"
                                    >
                                        Contact Supplier
                                    </Button>
                                    <button
                                        onClick={handleWishlistToggle}
                                        className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-500 hover:text-danger transition-colors"
                                    >
                                        {inWishlist ? <FaHeart className="text-danger text-xl" /> : <FaRegHeart className="text-xl" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'description' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'specs' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('specs')}
                        >
                            Specifications
                        </button>
                        <button
                            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews ({product.numReviews})
                        </button>
                    </div>

                    <div className="p-6 md:p-10">
                        {activeTab === 'description' && (
                            <div className="prose max-w-none text-gray-600">
                                <p>{product.description}</p>
                                <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-100">
                                    <h4 className="font-bold text-gray-800 mb-2">About the Seller</h4>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                                            {product.seller.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-gray-900">{product.seller.name}</h5>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <span className="mr-2">{product.seller.years} Yrs</span>
                                                <Rating value={product.seller.rating} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'specs' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.specifications.map((spec, idx) => (
                                    <div key={idx} className="flex border-b border-gray-100 py-3">
                                        <span className="w-1/3 text-gray-500 font-medium">{spec.name}</span>
                                        <span className="w-2/3 text-gray-900">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold">Customer Reviews</h3>
                                    <Button variant="outline" size="small">Write a Review</Button>
                                </div>
                                {/* Mock Reviews */}
                                <div className="space-y-6">
                                    {[1, 2, 3].map((review) => (
                                        <div key={review} className="border-b border-gray-100 pb-6 last:border-0">
                                            <div className="flex items-center mb-2">
                                                <img src={`https://ui-avatars.com/api/?name=User+${review}`} alt="User" className="w-10 h-10 rounded-full mr-3" />
                                                <div>
                                                    <h5 className="font-bold text-gray-900 text-sm">John Doe</h5>
                                                    <Rating value={5} />
                                                </div>
                                                <span className="ml-auto text-sm text-gray-400">2 days ago</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">
                                                Great product! The quality exceeded my expectations. Shipping was fast and packaging was secure. Will definitely order again.
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
