import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useAuth } from "~/Authentication/AuthContext";

const cx = classNames.bind(styles);

function SideBar() {
  // const user = useAuth();



  return (
    <div className={cx("wrapper")}>

      <Sidebar className={cx("sidebar")} >

        {<Menu
          className={cx("menu")}
          menuItemStyles={{
            button: { height: "50px" },
          }}
        >
          <MenuItem icon={<i className={cx("fa-solid fa-house")}></i>}>Trang chủ</MenuItem>
          <SubMenu icon={<i className={cx("fa-regular fa-newspaper")}></i>} label="Bài viết">
            <MenuItem component={<Link to={"/posts"}></Link>}>Quản lý bài viết</MenuItem>
            <MenuItem component={<Link to={"/createPost"}></Link>}>Tạo bài viết</MenuItem>
          </SubMenu>
          <SubMenu icon={<i className={cx("fa-solid fa-calendar-day")}></i>} label="Sự kiện">
            <MenuItem component={<Link to={"/events"}></Link>}>Quản lý sự kiện</MenuItem>
            <MenuItem>Đăng ký sự kiện</MenuItem>
          </SubMenu>
          <SubMenu icon={<i className={cx("fa-solid fa-graduation-cap")}></i>} label="Đào tạo">
            <MenuItem>Chương trình học</MenuItem>
            <MenuItem component={<Link to={"/coursedocument"}></Link>}>Tài liệu môn học</MenuItem>
          </SubMenu>
          <MenuItem icon={<i className={cx("fa-solid fa-briefcase")}></i>}>Quản lý phòng ban</MenuItem>
          <SubMenu icon={<i className={cx("fa-solid fa-users")}></i>} label="Quản lý người dùng">
            <MenuItem component={<Link to={"/employeemanagement"}></Link>}>Nhân viên</MenuItem>
            <MenuItem component={<Link to={"/studentmanagement"}></Link>}>Sinh viên</MenuItem>
          </SubMenu>
          <SubMenu icon={<i className={cx("fa-solid fa-layer-group")}></i>} label="Forum">
            <MenuItem component={<Link to={"/kmaforum"}></Link>}>KMA Forum</MenuItem>
            <MenuItem component={<Link to={"/createDisscussion"}></Link>}>Tạo thảo luận</MenuItem>
            <MenuItem component={<Link to={"/createDisscussion"}></Link>}>Bài viết chờ duyệt</MenuItem>
          </SubMenu>
        </Menu>}
      </Sidebar>
    </div>
  );
}

export default SideBar;
