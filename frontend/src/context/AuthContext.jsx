import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Implement persistent auth check (e.g., check local storage for token)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // TODO: Implement actual API login call
        console.log('TODO: Implement login logic', { email, password });

        // Placeholder login simulation
        const mockUser = {
            id: '1',
            name: 'John Doe',
            email: email,
            role: 'buyer', // Default role for testing, change as needed
            avatar: 'https://ui-avatars.com/api/?name=John+Doe'
        };

        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
    };

    const signup = async (userData) => {
        // TODO: Implement actual API signup call
        console.log('TODO: Implement signup logic', userData);

        // Placeholder signup simulation
        const mockUser = {
            id: '2',
            name: userData.name,
            email: userData.email,
            role: userData.role || 'buyer',
            avatar: `https://ui-avatars.com/api/?name=${userData.name}`
        };

        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
    };

    const logout = () => {
        // TODO: Implement logout logic (clear tokens, etc.)
        console.log('TODO: Implement logout logic');

        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const updateProfile = async (data) => {
        // TODO: Implement profile update logic
        console.log('TODO: Implement update profile logic', data);

        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
