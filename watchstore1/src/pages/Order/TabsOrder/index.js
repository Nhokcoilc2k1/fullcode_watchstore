import classNames from "classnames/bind";
import styles from '../Order.module.scss'
import { formattedNumber } from "~/ultils/helpers";
import { memo } from "react";
import Swal from "sweetalert2";
import { apiCancelOrderUser } from "~/apis/product";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function TabsOrder({data, setRender }) {
    
    const handleDelete = (oid) => {
        Swal.fire({
            title: 'Hủy đơn hàng',
            text: 'Bạn chắc chắn muốn hủy đơn hàng này',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý"
        }).then(async(result) => {
            if(result.isConfirmed){
                const response = await apiCancelOrderUser(oid, {status: 'Đã hủy'});
                if(response.success){
                    setRender(prev => !prev)
                    toast.success(response.message)
                    window.scrollTo(0, 0);
                } 
                else toast.error(response.message)  
            }
        })
    }

    return ( 
        <>
        { 
            data ? (
                data?.map((order) => (
                    <div key={order._id} className={cx('order-item')}>
                        <h5>Mã đơn: <span className={cx('active-code')}>{order._id.slice(-6)}</span></h5>
                        {order?.products?.map((product) => (
                            <div key={product._id} className={cx('pro-pay')}>
                                <div className={cx('pro-img')}>
                                    <img
                                        src={product.thumbnail}
                                        alt="ảnh sản phẩm"
                                    />
                                    <span className={cx('name')}>{product.name} </span>
                                </div>
                                <div className={cx('quantt')}>x {product.quantity}</div>
                                <div className={cx('price')}>{formattedNumber(product.sale_price*product.quantity)} đ</div>
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
            ) : <> </>
             
            }
        </>
     );
}

export default memo(TabsOrder);