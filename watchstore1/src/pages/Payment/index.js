import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetail } from '~/Redux/Reducers/UserSlice';
import ShippingAddress from './ShippingAddress';
import BreadCrumb from '~/components/BreadCrumb';


const cx = classNames.bind(styles);

function Payment() {

    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getUserDetail("profile"));
    },[dispatch]);

    const routes = [
        { path: "/", breadcrumb: "Trang chủ" },
        { path: "/pay", breadcrumb: 'Thanh toán' },
      ];

    return (
        <div className={cx('wrapper')}>
            <BreadCrumb routes={routes} />
            <div className={cx('box-content')}>
                <h4 className={cx('name-pages')}>Thanh toán</h4>
                <ShippingAddress />
            </div>
        </div>
        
    );
}

export default Payment;
