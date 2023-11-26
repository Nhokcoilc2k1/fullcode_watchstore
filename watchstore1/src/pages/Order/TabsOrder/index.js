import classNames from "classnames/bind";
import styles from '../Order.module.scss'
import { useDispatch } from "react-redux";
import { deleteOrder } from "~/Redux/Reducers/OrderSlice";


const cx = classNames.bind(styles);
const formattedNumber = (price) => {
    return String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
} 

function TabsOrder({data}) {
    const dispatch = useDispatch();

    const handleDelete = (orderId) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng không?");
        if(confirmed){
            dispatch(deleteOrder(orderId));
            window.location.reload();
        }
    }

    return ( 
        <>
        {
            data.map((order) => (
                <div key={order._id} className={cx('order-item')}>
                    <h5>Mã đơn: <span className={cx('active-code')}>{order._id.slice(-6)}</span></h5>
                    {order.orderItems.map((product) => (
                        <div key={product._id} className={cx('pro-pay')}>
                            <div className={cx('pro-img')}>
                                <img
                                    src={product.image}
                                    alt="ảnh sản phẩm"
                                />
                                <span className={cx('name')}>{product.name} </span>
                            </div>
                            <div className={cx('quantt')}>x {product.quantity}</div>
                            <div className={cx('price')}>{formattedNumber(product.price*product.quantity)} đ</div>
                        </div>
                    ))}
                    <div className={cx('order-btn')}>
                        <div className={cx('box')}>
                            <p>Số tiền phải trả: <span  className={cx('active-total')}>{formattedNumber(order.totalPrice)} đ</span></p>
                            {
                                order.status === 'Chờ xác nhận' ? (
                                    <button onClick={() => handleDelete(order._id)}>Hủy đơn hàng</button>
                                    ):(
                                    <p></p>
                                )
                            }
                        </div>
                    </div>
                </div>

            ))
                  
        }
        {/* {
            showDialog && 
            <DialogDelOrder 
                isClose={setShowDialog}
                orderId={orderId}
            />
        } */}
        
        </>
     );
}

export default TabsOrder;