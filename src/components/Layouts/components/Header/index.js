import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "~/Authentication/AuthContext";
import { useContext } from "react";
import Tippy from '@tippyjs/react/headless';


function Header() {
  const cx = classNames.bind(styles);
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.replace(`/`);
  }
  console.log(user)
  return (
    <header className={cx("wrapper")}>
      {/* LOGO */}
      <Link to={(user == null) ? '/' : `/${user.role}`} className={cx("logo")}>
        <img
          src="https://actvn.edu.vn/Images/actvn_big_icon.png"
          alt="Logo"
        ></img>
        <div className={cx("text-logo")}>
          <h3>KHOA CÔNG NGHỆ THÔNG TIN</h3>
          <h4>Học viện Kỹ thuật Mật Mã</h4>
        </div>
      </Link>
      {/* SEARCH BAR */}
      <div className={cx("search-bar")}>
        <input placeholder="Nhập để tìm kiếm"></input>
      </div>


      {!user && (
        <Link className={cx('login-button')} to={"/login"}>
          Login
        </Link>
      )
      }

      {/* {user && user.role === 'admin' && <p>Đây là trang dành cho Admin!</p>}
      {user && user.role === 'student' && <p>Đây là trang dành cho Học Sinh!</p>}
      {user && user.role === 'staff' && <p>Đây là trang dành cho Nhân Viên!</p>} */}


      {user && <div className={cx("options")}>
        <i className="fa-regular fa-bell"></i>
        <i className="fa-regular fa-comment"></i>
        <Tippy
          interactive
          trigger="click"
          placement="bottom-end"
          render={attrs => (
            <div className="box" tabIndex="-1" {...attrs}>
              <div className={cx('user-menu')} tabIndex="-1" {...attrs}>
                <button className={cx('menu-item')}>Profile</button>
                <button className={cx('menu-item')}>Change Password</button>
                <button className={cx('menu-item')}>Setting</button>
                <button className={cx('menu-item')}>Feedback</button>
                <button className={cx('menu-item')} onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          )}
        >

          <div className={cx("avatar")}>
            <img alt="" src=""></img>
          </div>
        </Tippy>
      </div>}
    </header>
  );
}

export default Header;
