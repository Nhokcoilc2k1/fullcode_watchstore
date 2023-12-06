import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUser } from '@fortawesome/free-regular-svg-icons';
import { faSignOut, faTableList } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Profile';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '~/Redux/user/userSlice';
import BreadCrumb from '~/components/BreadCrumb';
// import { apiLogout } from '~/apis/user';

const cx = classNames.bind(styles);

function Account() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {current} = useSelector(state => state.user)

    const handleLogout = async() => {
        dispatch(logout());
        // await apiLogout();
        navigate('/');
    }

    const routes = [
        { path: "/", breadcrumb: "Trang chủ" },
        { path: "/account", breadcrumb: 'Thông tin tài khoản' },
      ];

    return (
        <div className={cx('wrapper')}>
            <BreadCrumb routes={routes} />
            <div className={cx('box-content')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-3')}>
                        <aside className={cx('navigation')}>
                            <div className={cx('nav-header')}>
                                <FontAwesomeIcon icon={faCircleUser} className={cx('icon')} />
                                <div className={cx('info')}>
                                    <p className={cx('username')}>{current?.name}</p>
                                    <p>Chưa có hạng thành viên</p>
                                </div>
                            </div>
                            <Link className={cx('nav-item', 'nav-active')}>
                                <FontAwesomeIcon icon={faUser} className={cx('icon-item')} />
                                <span>Thông tin tài khoản</span>
                            </Link>
                            <Link to={'/don-hang'} className={cx('nav-item')}>
                                <FontAwesomeIcon icon={faTableList} className={cx('icon-item')} />
                                <span>Đơn hàng</span>
                            </Link>
                            <div onClick={handleLogout} className={cx('nav-item')}>
                                <FontAwesomeIcon icon={faSignOut} className={cx('icon-item')} />
                                <span>Đăng xuất</span>
                            </div>
                        </aside>
                    </div>
                    <div className={cx('col', 'l-9')}>
                        <Profile />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
