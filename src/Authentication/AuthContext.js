import React, { createContext, useState, useEffect, useContext } from 'react';

// Khởi tạo Context cho Auth
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Kiểm tra xem có token trong localStorage không khi ứng dụng khởi động
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            setUser(JSON.parse(token)); // Đọc user từ token lưu trong localStorage
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('auth_token', JSON.stringify(userData)); // Lưu thông tin user vào localStorage
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('auth_token'); // Xóa token trong localStorage khi logout
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};