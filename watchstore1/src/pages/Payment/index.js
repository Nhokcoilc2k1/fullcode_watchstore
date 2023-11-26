import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetail } from '~/Redux/Reducers/UserSlice';
import ShippingAddress from './ShippingAddress';


const cx = classNames.bind(styles);

function Payment() {

    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getUserDetail("profile"));
    },[dispatch]);

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('name-pages')}>Thanh toán</h4>
            <ShippingAddress />
        </div>
        
    );
}

export default Payment;
