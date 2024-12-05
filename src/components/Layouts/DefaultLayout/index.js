import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router';

function DefaultLayout() {
  return (
    // <div>
    //   <Header />
    //   <div className={cx("container")} style={{paddingTop: '65px'}}>
    //     <Sidebar />
    //     <div className={cx('contents')}>{children}</div>
    //   </div>
    // </div>
    <DashboardLayout>
      <Outlet></Outlet>
    </DashboardLayout>
  );
}

export default DefaultLayout;
