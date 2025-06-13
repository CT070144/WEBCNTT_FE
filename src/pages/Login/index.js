import React, { useState } from 'react';
import { jwtDecode as decode } from 'jwt-decode';
import classNames from 'classnames/bind';
import styles from './Login.module.scss'
import {toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const cx = classNames.bind(styles)
    const formData = {};
    const api = process.env.REACT_APP_API_URL;


    // Xử lý form đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();
        formData.userName = username;
        formData.password = password;

        // Kiểm tra tài khoản
        try {
            
            
            
            console.log(api);
            const response = await fetch(api + "/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(formData)
            });

        

           
          const data = await response.json();
          console.log(data.result);
            const token = data.result; // Giả sử API trả về token JWT

            // Lưu token vào localStorage
            localStorage.setItem("auth_token", token);

            // Giải mã token và lấy thông tin người dùng
            const decodedToken = decode(token);

            // Lưu thông tin người dùng vào localStorage hoặc context
            localStorage.setItem("user", JSON.stringify(decodedToken));

            // Điều hướng đến trang phù hợp dựa trên role


            if (decodedToken.roles[0].includes("ROLE_ADMIN")) {

               setTimeout(() => {
                window.location.replace("/admin");
               }, 1000);
            } else if (decodedToken.roles[0].includes("ROLE_EMPLOYEE")) {
                setTimeout(() => {
                    window.location.replace("/employee");
                }, 1000);
            } else {
                setTimeout(() => {
                    window.location.replace("/student");
                }, 1000);
            }
            toast.success("Đăng nhập thành công",{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } catch (err) {
           toast.error("Sai tài khoản hoặc mật khẩu");
        }
    };

    return (
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
    );
};

export default Login;
