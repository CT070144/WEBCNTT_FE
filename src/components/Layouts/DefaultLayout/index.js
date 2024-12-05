import Header from "~/components/Layouts/components/Header";
import Sidebar from "./Sidebar";
import styles from './DefaultLayout.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className={cx("container")} style={{ paddingTop: '65px' }}>
        <Sidebar />
        <div className={cx('contents')}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
