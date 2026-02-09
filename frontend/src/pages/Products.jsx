import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { FaFilter } from 'react-icons/fa';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        priceRange: [0, 1000],
        rating: null,
        inStock: false
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Parse query params for initial filters
        const searchParams = new URLSearchParams(location.search);
        const category = searchParams.get('category');
        if (category) {
            setFilters(prev => ({ ...prev, category }));
        }
    }, [location.search]);

    useEffect(() => {
        // Mock API call
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Imitate network delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // Mock data similar to Home page but more
                const mockProducts = Array(12).fill(null).map((_, i) => ({
                    id: (currentPage - 1) * 12 + i + 1,
                    title: `Professional Grade Tool Set ${i + 1}`,
                    price: 49.99 + (i * 5),
                    originalPrice: 89.99 + (i * 5),
                    image: `https://picsum.photos/seed/${(currentPage - 1) * 12 + i + 200}/300/300`,
                    rating: 4 + (i % 2) * 0.5,
                    numReviews: 50 + i * 2,
                    moq: 5,
                    discount: i % 3 === 0 ? 20 : 0
                }));

                setProducts(mockProducts);
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Mobile Filter Button */}
                    <button
                        className="md:hidden flex items-center justify-center py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium mb-4"
                        onClick={() => setShowMobileFilter(!showMobileFilter)}
                    >
                        <FaFilter className="mr-2" /> Filters
                    </button>

                    {/* Sidebar */}
                    <div className={`md:w-1/4 ${showMobileFilter ? 'block' : 'hidden md:block'}`}>
                        <FilterSidebar filters={filters} onFilterChange={setFilters} />
                    </div>

                    {/* Product Grid */}
                    <div className="md:w-3/4">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {filters.category ? `Category: ${filters.category}` : 'All Products'}
                            </h1>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                                <select className="input-field text-sm py-1 px-3 w-auto">
                                    <option value="relevance">Relevance</option>
                                    <option value="price_low">Price: Low to High</option>
                                    <option value="price_high">Price: High to Low</option>
                                    <option value="newest">Newest Arrivals</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <Loader />
                        ) : products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={5} // Mock total pages
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
