import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import Button from '../../components/Button';
import { formatPrice } from '../../utils/helpers';
import { useEffect } from 'react';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/products/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                console.log('Products from API:', data.products);
                setProducts(data.products);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            window.confirm()
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the product');
            }

            const data = await response.json();
            setProducts(products.filter(p => p._id !== id));

        } catch (error) {
            setError(error.message);
            console.error('Error deleting the product:', error);
        } finally {
            setLoading(false);
        }

    };
    if (loading) return <div className="p-12 text-center">Loading...</div>;
    if (error) return <div className="p-12 text-center text-red-500">{error}</div>;

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
                    <Button to="/seller/products/add" className="flex items-center">
                        <FaPlus className="mr-2" /> Add New Product
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatPrice(product.price)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <Link to={`/products/${product._id}`} className="text-gray-400 hover:text-gray-600" title="View">
                                            <FaEye />
                                        </Link>
                                        <Link to={`/seller/products/edit/${product._id}`} className="text-blue-500 hover:text-blue-700" title="Edit">
                                            <FaEdit />
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700" title="Delete">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            No products found. Start by adding one!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProducts;
