import styles from './DefaultLayout.module.scss';
import classNames from "classnames/bind";
import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "antd/es/layout/layout";
import { Button, ConfigProvider, Dropdown, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "~/Authentication/AuthContext";
import { useEffect, useState } from 'react';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { DownOutlined, RightOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Footer from '~/pages/Home/components/Footer';

const cx = classNames.bind(styles)
const token = localStorage.getItem("auth_token");
const api = process.env.REACT_APP_API_URL;

const handleLogout = () => {
  localStorage.clear();
  fetch(api + "/user/logout", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  window.location.replace(`/`);
}

const avtitems = [
  {
    label: (
      <Link to={"/profile"}>Profile</Link>
    ),
    key: '1',
  },
  {
    label: (
      <Link to={"/changePassword"}>Change password</Link>
    ),
    key: '2',
  },
  {
    label: (
      <button style={{ all: 'unset', width: '100%', height: '100%' }} onClick={() => handleLogout()}>Sign Out</button>
    ),
    key: '3',
  }
]



function DefaultLayout({ children }) {
  const { user } = useAuth();
  const [route, setRoute] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [navItem, setNavItem] = useState([]);
  const url = api;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const fetchNavItem = async () => {
    try {
      const response = await fetch(url + "/api/public/menu_items", {
        method: "GET",
      })

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Cannot take navbar item from server")
      }
      setNavItem(data);

    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (user) {
      if (user.roles[0] === 'ROLE_ADMIN')
        setRoute("admin")
      else if (user.roles[0] === 'ROLE_EMPLOYEE')
        setRoute('employee')
      else if (user.roles[0] === 'ROLE_STUDENT')
        setRoute('student')
    }
    fetchNavItem();
  }, [user])
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true);
        setShowScrollTop(false);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // lăn xuống
      } 

      // Show scroll-to-top button when scrolled down more than 300px
      if (currentScrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      } 

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const transformApiItems = (apiItems) => {
    return apiItems.filter(item => !item.deleted).map(item => {
      const transformedItem = {
        key: item.slug,
        label: <Link style={{ color: "#fff" }} to={`/${item.slug}`}>{item.title}</Link>,
      };

      if (item.children && item.children.length > 0) {
        transformedItem.children = transformApiItems(item.children);
      }

      return transformedItem;
    });
  };

  const items = [
    {
      key: 'home',
      label: (
        <Link to={"/"}>Trang chủ</Link>
      )
    },
    {
      key: 'info',
      label: (
        <div>Giới thiệu <DownOutlined style={{ fontSize: "10px" }} /></div>
      ),
      children: [
        {
          key: 'main-info',
          label: (
            <Link to={"/gioi-thieu-chung"}>Giới thiệu chung</Link>
          ),
        },
        {
          key: 'staff-list',
          label: (
            <Link to={"/introEmployee"}>Danh sách cán bộ </Link>
          )
        }
      ]
    },
    {
      key: 'posts',
      label: (
        <Link to={"/posts"}>Bài viết</Link>
      )
    },
    {
      key: 'events',
      label: (
        <Link to={"/events"}>Sự kiện</Link>
      )
    },
    {
      key: 'training-program',
      label: (
        <Link to={"/training-program"}>Chương trình đào tạo</Link>
      )
    },
    {
      key: 'forum',
      label: (
        <Link to={user && user.roles && user.roles[0] === 'ROLE_STUDENT' ? "/student/kmaforum" : "/kmaforum"}>Diễn đàn</Link>
      )
    },
    ...transformApiItems(navItem)
  ]

  return (
    <ConfigProvider theme={{
      components: {
        Menu: {
          /* here is your component tokens */
          itemColor: "white",
          itemHoverBg: "rgba(255, 255, 255, 0.1)",
          popupBg: "#920000",
          itemHoverColor: "white",
          subMenuItemBg: "#920000",
          itemSelectedBg: "rgba(255, 255, 255, 0.2)",
          itemSelectedColor: "white"
        },
      },
    }}>
      <Layout className={cx('wrapper')}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 99,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "white"
          }}
        >
          <div className={cx('container')}>
            <Link to={(user == null) ? '/' : `/${route}`} className={cx("logo")}>
              <img
                src="https://actvn.edu.vn/Images/actvn_big_icon.png"
                alt="Logo"
              ></img>
              <div className={cx("text-logo")}>
                <h3>KHOA CÔNG NGHỆ THÔNG TIN</h3>
                <h4>Học viện Kỹ thuật Mật Mã</h4>
              </div>
            </Link>


          
            <div className={cx("login-button")}>
             {user == null && <Link className={cx("login-button-link")} to="/login">Đăng nhập</Link>}
             {user != null && <Link className={cx("login-button-link")} onClick={() => handleLogout()}>Đăng xuất</Link>}
            </div>
          



            {user &&isVisible&&
              (<div className={cx("options")}>
                <i className="fa-regular fa-bell"></i>
                <i className="fa-regular fa-comment"></i>
                <Dropdown
                  menu={{
                    items: avtitems,
                  }}
                  placement="bottomRight"
                >
                  <img className={cx("avatar")} src={user.avaFileCode !== "/downloadProfile/" ? (api + user.avaFileCode) : "https://gist.githubusercontent.com/vinhjaxt/fa4208fd6902dd8b2f4d944fa6e7f2af/raw/454f58aeac4fdeb459476eae7128dc6ff57df25f/logo-hvktmm.png"} alt=""></img>
                </Dropdown>

              </div>)
            }
          </div>
        </Header>

        <Content className={cx("content")}>
          <div style={{ background: "#bc2626" }} className={cx("navbar", { fixed: isFixed })}>
            <Menu
              selectedKeys={[currentPath]}
              mode="horizontal"
              className={cx("nav-menu")}
              items={items.map((item) => ({
                ...item,
                className: cx('custom-menu-item'),
                style: {
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                }
              }))}
              style={{
                minWidth: 0,
                background: "#bc2626",
                color: "red"
              }}
            >
            </Menu>
          </div>
          {children}
        </Content>
      </Layout>
      <Footer></Footer>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<ArrowUpOutlined />}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1000,
            backgroundColor: '#bc2626',
            borderColor: '#bc2626',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#920000';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#bc2626';
            e.target.style.transform = 'scale(1)';
          }}
        />
      )}
    </ConfigProvider>
  );
}

export default DefaultLayout;
