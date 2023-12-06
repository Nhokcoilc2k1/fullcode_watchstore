import classNames from "classnames/bind";
import styles from './OrderManager.module.scss';
import { memo, useState } from "react";
import Button from "~/components/Button";
import { formattedNumber } from "~/ultils/helpers";
import { apiUpdateOrderByAdmin } from "~/apis/product";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function UpdateOrder({editOrder, setEditOrder, render}) {
    const [status, setStatus] = useState(editOrder.status);
    const [isPaid, setIsPaid] = useState(editOrder.isPaid)

    const handleSubmit  = async(e) => {
        e.preventDefault();
        const oid = editOrder._id
        const response = await apiUpdateOrderByAdmin(oid, {status, isPaid})
        if(response.success){
            toast.success(response.message)
            render();
            setEditOrder(null);
            // if(status === 'Đã xác nhận'){
            //     editOrder.products.map(async(el) => {
            //        const response =  await apiUpdateQuantitySoldProduct(el.product, {qnt: el.quantity})
            //        if(response.success){
            //             console.log(response.message);
            //        }
            //     })
            // }
        } else toast.error(response.message)
    }

    const handlePrivision = (price, quantity) => {
        const privision = price*quantity;
        return formattedNumber(privision)
    };
    // ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng','Đã giao hàng', 'Đã hủy']
    const statusOfOrder = [
        {name: 'Chờ xác nhận', value: 'Chờ xác nhận' },
        {name: 'Đã xác nhận', value: 'Đã xác nhận'},
        {name:'Đang giao hàng', value: 'Đang giao hàng' },
        {name:'Đã giao hàng', value: 'Đã giao hàng' },
        {name: 'Đã hủy', value: 'Đã hủy'}
    ]

    const isPaidOfOrder = [
        {name: 'Chưa thanh toán', value: 'Chưa thanh toán'},
        {name: 'Đã thanh toán', value: 'Đã thanh toán'}
    ]

    return ( 
        <div className={cx('wrapper', 'update-page')}>
        <div className={cx('inner')}>
            <div className={cx('box-header')}>
                <h2 className={cx('header-name')}>Chi tiết đơn hàng</h2>
                <Button onClick={() => setEditOrder(null)} className={cx('header-btn')}>Quay lại</Button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('info-order')}>
                        <div>
                            <span className={cx('info-user')}>Tên người nhận: {editOrder.name}</span> 
                            <span className={cx('info-user')}>Số điện thoại: {editOrder.phone}</span>
                            <p className={cx('info-user')}>Địa chỉ: {editOrder.address}</p>
                            <p className={cx('info-user')}>Ghi chú đơn hàng: {editOrder.note}</p> 
                        </div>
                        {editOrder?.products?.map((el) => (
                        <div key={el.product?._id} className={cx('pro-pay')}>
                            <div className={cx('pro-img')}>
                                <img
                                    src={el.thumbnail}
                                    alt="ảnh sản phẩm"
                                />
                                <span>{el.name}</span>
                            </div>
                            <div className={cx('single-price')}>{formattedNumber(el.sale_price)} đ</div>
                            <div className={cx('quantt')}>x{el.quantity}</div>
                            <div className={cx('price')}>{handlePrivision(el.sale_price, el.quantity)}đ</div>
                        </div> 
                    ))}
                    <div className={cx('box-item')}>
                        <p className={cx('total')}>Tổng đơn hàng</p>
                        <p className={cx('total')}>{formattedNumber(editOrder.totalPrice)} đ</p>
                    </div> 
                    <div>
                        <h4 className={cx('status-order')}>Cập nhật trạng thái đơn hàng</h4>
                    </div>
                    <div className={cx('box-input')}>
                        {/* {editOrder.status = 'Đã hủy' ? (
                            <div className={cx('ispaid')}>
                                <p  className={cx('ispaid-note')}>Trạng thái đơn hàng:</p>
                                <p className={cx('success')}>Đã hủy</p>
                            </div>
                        ) : ( */}
                            <div className={cx('form-select')}>
                                <label htmlFor="status">Trạng thái đơn hàng</label>
                                <select 
                                    id="status" 
                                    value={status} 
                                    name="status"
                                    onChange={e => setStatus(e.target.value)}
                                >
                                    {/* <option value="">--CHOOSE--</option> */}
                                    {
                                        statusOfOrder?.map((el, index)=> (
                                            <option key={index} value={el.value}>{el.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                        {/* )} */}
                        <div className={cx('form-select')}>
                            
                            {editOrder.isPaid === 'Đã thanh toán' ? (
                                <div className={cx('ispaid')}>
                                    <p  className={cx('ispaid-note')}>Trạng thái thanh toán:</p>
                                    <p className={cx('success')}>Đã thanh toán</p>
                                </div>
                            ) : (
                           <>
                                <label htmlFor="isPaid">Tình trạng thanh toán</label>
                                <select 
                                    id="isPaid" 
                                    value={isPaid} 
                                    name="isPaid"
                                    onChange={e => setIsPaid(e.target.value)}
                                >
                                    {/* <option value="">--CHOOSE--</option> */}
                                    {
                                        isPaidOfOrder?.map((el, index) => (
                                            <option key={index} value={el.value}>{el.name}</option>
                                        ))
                                    }
                                </select>
                           </>

                            )}
                        </div>
                    </div>
                    </div>
                    <div className={cx('ctrl-create', 'update')}>
                        <Button type="submit" className={cx('control-btn', 'update-btn')}>
                            Cập nhật đơn hàng
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div> );
}

export default memo(UpdateOrder);