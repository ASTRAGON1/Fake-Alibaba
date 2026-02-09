import { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Allow animation to finish
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const icons = {
        success: <FaCheckCircle className="text-accent" />,
        error: <FaExclamationCircle className="text-danger" />,
        info: <FaInfoCircle className="text-info" />,
        warning: <FaExclamationCircle className="text-warning" />
    };

    const bgColors = {
        success: 'bg-white border-l-4 border-accent',
        error: 'bg-white border-l-4 border-danger',
        info: 'bg-white border-l-4 border-info',
        warning: 'bg-white border-l-4 border-warning'
    };

    return (
        <div className={`fixed top-4 right-4 z-50 animate-fade-in shadow-lg rounded-md p-4 flex items-start space-x-3 min-w-[300px] ${bgColors[type]}`}>
            <div className="mt-0.5 text-xl">{icons[type]}</div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{message}</p>
            </div>
            <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
            </button>
        </div>
    );
};

export default Toast;
