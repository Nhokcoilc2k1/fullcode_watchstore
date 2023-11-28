import classNames from "classnames/bind";
import styles from './Order.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUser } from '@fortawesome/free-regular-svg-icons';
import { faSignOut, faTableList } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TabsOrder from "./TabsOrder";
import { logout } from "~/Redux/user/userSlice";
import { getOrderOfUser } from "~/Redux/orders/asyncActions";

const cx = classNames.bind(styles);

function Order() {
    const [activeTab, setActiveTab] = useState(0);
    const [render, setRender] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orderOfUser } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(getOrderOfUser());
    },[dispatch, render])

    const logoutHandle = () => {
        dispatch(logout());
        navigate('/');
    }

    // ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng','Đã giao hàng', 'Đã hủy']

    const pendingOrder = orderOfUser?.filter((order) => order.status === 'Chờ xác nhận');
    const confirmedOrder = orderOfUser?.filter((order) => order.status === 'Đã xác nhận');
    const deliveringOrder = orderOfUser?.filter((order) => order.status === 'Đang giao hàng');
    const deliveredOrder = orderOfUser?.filter((order) => order.status === 'Đã giao hàng');
    const canceledOrder = orderOfUser?.filter((order) => order.status === 'Đã hủy');
    

    const config = [
        {name: 'Tất cả', component: <TabsOrder data={orderOfUser} setRender={setRender}   />, number: orderOfUser.length},
        {name: 'Chờ xác nhận', component: <TabsOrder data={pendingOrder} setRender={setRender}  />, number: pendingOrder.length},
        {name: 'Chờ lấy hàng', component: <TabsOrder data={confirmedOrder} setRender={setRender}   />, number: confirmedOrder.length},
        {name: 'Đang giao', component: <TabsOrder data={deliveringOrder} setRender={setRender}   />, number: deliveringOrder.length},
        {name: 'Đã giao', component: <TabsOrder data={deliveredOrder}  setRender={setRender}  />, number: deliveredOrder.length},
        {name: 'Đã hủy', component: <TabsOrder data={canceledOrder} setRender={setRender}   />, number: canceledOrder.length},
    ]

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-3')}>
                    <aside className={cx('navigation')}>
                        <div className={cx('nav-header')}>
                            <FontAwesomeIcon icon={faCircleUser} className={cx('icon')} />
                            <div className={cx('info')}>
                                <p className={cx('username')}></p>
                                <p>Chưa có hạng thành viên</p>
                            </div>
                        </div>
                        <Link to={'/account'} className={cx('nav-item')}>
                            <FontAwesomeIcon icon={faUser} className={cx('icon-item')} />
                            <span>Thông tin tài khoản</span>
                        </Link>
                        <Link className={cx('nav-item', 'nav-active')}>
                            <FontAwesomeIcon icon={faTableList} className={cx('icon-item')} />
                            <span>Đơn hàng</span>
                        </Link>
                        <div onClick={logoutHandle} className={cx('nav-item')}>
                            <FontAwesomeIcon icon={faSignOut} className={cx('icon-item')} />
                            <span>Đăng xuất</span>
                        </div>
                    </aside>
                </div>
                <div className={cx('col', 'l-9')}>
                    <div className={cx('info-user')}>
                        <h4>Đơn hàng của tôi</h4>
                        <div className={cx('status')}>
                            {config.map((entry, index) => (
                                <button key={index} className={cx('item-status', activeTab === index ? 'active' : '')} onClick={() => setActiveTab(index)}>
                                    {entry.name}
                                    <span className={cx('number-order')}>({entry.number})</span>
                                </button>
                            ))}
                        </div>
                            {orderOfUser?.length === 0 ? (
                                <div className={cx('no-order')}>
                                    <p>Bạn chưa có đơn hàng nào</p>
                                </div> 
                            ):(
                                <div className={cx('content')}>
                                    {config[activeTab].component}
                                </div>

                            )
                        }    
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Order;