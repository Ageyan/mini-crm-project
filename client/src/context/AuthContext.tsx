import { createContext, useContext } from 'react';

type AuthContexType = {
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContexType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const login = () => {
        localStorage.getItem('token');
    };

    const logout = () => {
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
};
