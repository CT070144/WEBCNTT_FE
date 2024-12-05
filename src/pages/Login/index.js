import React, { useState, useContext } from 'react';
import { AuthContext } from '~/Authentication/AuthContext';
import classNames from 'classnames/bind';
import styles from './Login.module.scss'

const Login = () => {
    const { login } = useContext(AuthContext);
    const cx = classNames.bind(styles)

    // Tạo mảng tài khoản
    const accounts = [
        { username: 'admin', password: '123456', role: 'admin' },
        { username: 'student', password: '111111', role: 'student' },
        { username: 'staff', password: '888888', role: 'staff' },
    ];

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Xử lý form đăng nhập
    const handleLogin = (e) => {
        e.preventDefault();

        // Kiểm tra tài khoản
        const account = accounts.find(acc => acc.username === username && acc.password === password);

        if (account) {
            // Nếu tài khoản hợp lệ, lưu vào localStorage và chuyển hướng
            const userData = { username: account.username, role: account.role };
            login(userData); // Lưu vào Context và localStorage
            window.location.replace(`/${account.role}`); // Chuyển hướng đến trang dashboard (hoặc trang nào đó)
        } else {
            // Nếu tài khoản sai, hiển thị lỗi
            setErrorMessage('Tài khoản hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className={cx("login-container")}>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Tài Khoản</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit">Đăng Nhập</button>
            </form>
        </div>
    );
};

export default Login;
