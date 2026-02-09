import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="flex space-x-4">
                <Button to="/" variant="primary">Go Home</Button>
                <Button to="/products" variant="outline">Browse Products</Button>
            </div>
        </div>
    );
};

export default NotFound;
