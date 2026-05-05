import { createContext, useContext, useEffect, useState } from 'react';

type AuthContexType = {
    isAuth: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContexType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const savedAuth = localStorage.getItem('isAuth');
        if (savedAuth === 'true') {
            setIsAuth(true);
        }
    }, []);

    const login = () => {
        localStorage.setItem('isAuth', 'true');
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem('isAuth');
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
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
