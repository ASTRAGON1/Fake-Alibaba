import { Link } from 'react-router-dom';
import { FaArrowRight, FaShippingFast, FaUndo, FaHeadset, FaShieldAlt } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

const Home = () => {
    // TODO: Link with backend - fetch featured products from API
    const featuredProducts = [];

    // TODO: Link with backend - fetch categories from API
    const categories = [];

    return (
        <div className="bg-gray-50 pb-12">
            {/* Hero Section */}
            <section className="bg-white">
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                                Global Trade starts here.
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-lg">
                                The leading B2B ecommerce platform for global trade. Connect with millions of suppliers and buyers.
                            </p>
                            <div className="flex space-x-4">
                                <Link to="/products" className="btn btn-primary btn-large flex items-center">
                                    Start Sourcing <FaArrowRight className="ml-2" />
                                </Link>
                                <Link to="/signup" state={{ role: 'seller' }} className="btn btn-outline btn-large">
                                    Become a Supplier
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="" // i will add this picture later
                                alt="Global Trade"
                                className="rounded-lg shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                            <FaShippingFast className="text-3xl text-primary" />
                            <div>
                                <h4 className="font-bold text-gray-800">Fast Delivery</h4>
                                <p className="text-sm text-gray-500">Shipping worldwide</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                            <FaShieldAlt className="text-3xl text-primary" />
                            <div>
                                <h4 className="font-bold text-gray-800">Trade Assurance</h4>
                                <p className="text-sm text-gray-500">Safe & secure payments</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                            <FaUndo className="text-3xl text-primary" />
                            <div>
                                <h4 className="font-bold text-gray-800">Return Policy</h4>
                                <p className="text-sm text-gray-500">30 days return guarantee</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                            <FaHeadset className="text-3xl text-primary" />
                            <div>
                                <h4 className="font-bold text-gray-800">24/7 Support</h4>
                                <p className="text-sm text-gray-500">Dedicated support team</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Explore by Category</h2>
                        <Link to="/products" className="text-primary hover:text-red-600 font-medium">View All</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((cat) => (
                            <Link key={cat.id} to={`/products?category=${cat.id}`} className="group block text-center">
                                <div className="bg-white rounded-full p-4 mx-auto w-24 h-24 flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow ring-1 ring-gray-100">
                                    <img src={cat.image} alt={cat.name} className="w-12 h-12 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                        <Link to="/products" className="text-primary hover:text-red-600 font-medium">View All</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl">
                            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">Limited Time Offer</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Sourcing Festival 2026
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Discover millions of products with reliable suppliers and logistics services. Up to 50% off on selected categories.
                            </p>
                            <Link to="/products" className="btn btn-primary">
                                View Deals
                            </Link>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>
                        <div className="absolute bottom-0 right-20 -mb-20 w-60 h-60 bg-primary opacity-10 rounded-full"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;