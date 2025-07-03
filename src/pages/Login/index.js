import React, { useState } from 'react';
import { jwtDecode as decode } from 'jwt-decode';
import classNames from 'classnames/bind';
import styles from './Login.module.scss'
import Notification from '~/components/Notification';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [notif, setNotif] = useState({ visible: false, type: 'success', message: '' });
    const cx = classNames.bind(styles)
    const formData = {};
    const api = process.env.REACT_APP_API_URL;

    // Xử lý form đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();
        formData.userName = username;
        formData.password = password;
        try {
            const response = await fetch(api + "/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            const token = data.result;
            localStorage.setItem("auth_token", token);
            const decodedToken = decode(token);
            localStorage.setItem("user", JSON.stringify(decodedToken));
            setNotif({ visible: true, type: 'success', message: 'Đăng nhập thành công!' });
            setTimeout(() => {
                if (decodedToken.roles[0].includes("ROLE_ADMIN")) {
                    window.location.replace("/admin");
                } else if (decodedToken.roles[0].includes("ROLE_EMPLOYEE")) {
                    window.location.replace("/employee");
                } else {
                    window.location.replace("/student");
                }
            }, 1200);
        } catch (err) {
            setNotif({ visible: true, type: 'error', message: 'Sai tài khoản hoặc mật khẩu!' });
        }
    };

    const handleCloseNotif = () => {
        setNotif({ ...notif, visible: false });
    };

    return (
        <div className={cx("wrapper")}>  
            <Notification
                type={notif.type}
                message={notif.message}
                visible={notif.visible}
                onClose={handleCloseNotif}
            />
            <div className={cx("login-container")}> 
                <img
                    src="https://actvn.edu.vn/Images/actvn_big_icon.png"
                    alt="Logo"
                ></img>
                <h3>ĐĂNG NHẬP</h3>
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Đăng Nhập</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
