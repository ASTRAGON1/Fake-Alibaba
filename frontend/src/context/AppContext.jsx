import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // TODO: Create login function
    const login = (userData) => {
        // Your code here
    };

    // TODO: Create logout function
    const logout = () => {
        // Your code here
        // Remember to clear localStorage token
    };

    // TODO: Create addToCart function
    const addToCart = (product) => {
        // Your code here
    };

    // TODO: Create removeFromCart function
    const removeFromCart = (productId) => {
        // Your code here
    };

    const value = {
        user,
        cart,
        login,
        logout,
        addToCart,
        removeFromCart,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};