import DefaultLayout from "../../components/Layouts/DefaultLayout";
import styles from './AccessDenied.module.scss';
import { Link } from 'react-router-dom';

function AccessDenied() {
    return (
        <DefaultLayout>
            <div className={styles.accessDeniedContainer}>
                <h1 className={styles.title}>403</h1>
                <h2 className={styles.subtitle}>Không có quyền truy cập</h2>
                <p className={styles.message}>
                    Xin lỗi, bạn không có quyền truy cập vào trang này.
                </p>
                <Link to="/" className={styles.homeLink}>Quay về trang chủ</Link>
            </div>
        </DefaultLayout>
     );
}

export default AccessDenied;