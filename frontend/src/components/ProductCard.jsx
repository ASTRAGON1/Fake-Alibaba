import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/helpers';
import Rating from './Rating';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const inWishlist = isInWishlist(product.id);

    const handleWishlistClick = (e) => {
        e.preventDefault();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <Link to={`/products/${product.id}`} className="card group block h-full relative overflow-hidden">
            {/* Discount Badge */}
            {product.discount > 0 && (
                <span className="absolute top-3 left-3 bg-danger text-white text-xs font-bold px-2 py-1 rounded z-10">
                    -{product.discount}%
                </span>
            )}

            {/* Wishlist Button */}
            <button
                onClick={handleWishlistClick}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-danger hover:shadow-md transition-all z-10 opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0"
            >
                {inWishlist ? <FaHeart className="text-danger" /> : <FaRegHeart />}
            </button>

            {/* Image */}
            <div className="relative pt-[100%] mb-4 overflow-hidden rounded-md bg-gray-100">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Quick Add to Cart (Overlay) */}
                <div className="absolute bottom-0 left-0 w-full p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-primary text-white py-2 rounded-md shadow-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
                    >
                        <FaShoppingCart /> <span>Add to Cart</span>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col h-[calc(100%-24px-100%)]">
                <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.title}
                </h3>

                <div className="mb-2">
                    <Rating value={product.rating} text={`(${product.numReviews})`} />
                </div>

                <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 line-through">
                            {product.originalPrice && formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                    <div className="text-xs text-secondary font-medium px-2 py-1 bg-gray-100 rounded">
                        MoQ: {product.moq || 1}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
