import { useState } from 'react';
import Rating from './Rating';

const FilterSidebar = ({ filters, onFilterChange }) => {
    const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 1000]);

    // TODO: Link with backend - fetch categories from API
    const categories = [];

    const handleCategoryChange = (categoryId) => {
        // TODO: Link with backend - apply category filter
        onFilterChange({ ...filters, category: categoryId });
    };

    const handlePriceChange = (e, index) => {
        const newRange = [...priceRange];
        newRange[index] = parseInt(e.target.value);
        setPriceRange(newRange);
    };

    const applyPriceFilter = () => {
        // TODO: Link with backend - apply price range filter
        onFilterChange({ ...filters, priceRange });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2 mb-6">
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <button
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`text-sm w-full text-left py-1 hover:text-primary transition-colors ${filters.category === cat.id ? 'text-primary font-bold' : 'text-gray-600'
                                }`}
                        >
                            {cat.name}
                        </button>
                    </li>
                ))}
            </ul>

            <h3 className="font-bold text-gray-800 mb-4">Price Range</h3>
            <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Min"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Max"
                    />
                </div>
                <button
                    onClick={applyPriceFilter}
                    className="w-full btn btn-outline btn-sm text-xs py-1"
                >
                    Apply
                </button>
            </div>

            <h3 className="font-bold text-gray-800 mb-4">Rating</h3>
            <div className="space-y-2 mb-6">
                {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`rating-${rating}`}
                            className="mr-2 cursor-pointer"
                            checked={filters.rating === rating}
                            onChange={() => onFilterChange({ ...filters, rating: filters.rating === rating ? null : rating })}
                        />
                        <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer text-sm text-gray-600">
                            <Rating value={rating} />
                            <span className="ml-1">& Up</span>
                        </label>
                    </div>
                ))}
            </div>

            <h3 className="font-bold text-gray-800 mb-4">Availability</h3>
            <div className="space-y-2">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="in-stock"
                        className="mr-2 cursor-pointer"
                        checked={filters.inStock}
                        onChange={(e) => onFilterChange({ ...filters, inStock: e.target.checked })}
                    />
                    <label htmlFor="in-stock" className="text-sm text-gray-600 cursor-pointer">
                        In Stock Only
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
