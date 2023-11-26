import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { useFormik} from 'formik';
import { shipAddressValidation } from '~/components/Form/SignupValidation';
import Paypal from '../components/Paypal';
import OverLay from '../components/OverLay';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formattedNumber } from '~/ultils/helpers';

const cx = classNames.bind(styles);

function ShippingAddress() {
    const [showPaypal, setShowPaypal] = useState(false);
    const {current} = useSelector((state)  => state.user);

    const {values, setValues, errors, handleChange,handleSubmit, handleBlur, touched} = useFormik({
        initialValues: {
            name: '',
            phone:'',
            address:'' ,
            note:'',
        },    
        validationSchema: shipAddressValidation,
        onSubmit : () => {
            const {name, phone, address, note} = values;
            setShowPaypal(true);
        }
        
      });

      useEffect(() => {
        if(current){
            setValues({
                name: current.name,
                phone: current.phone,
                address: current.address,
            })
        }
      },[current])

    const handlePrivision = (price, quantity) => {
        const privision = price*quantity;
        return formattedNumber(privision)
    };

    const provisional = current?.cart?.reduce((acum, el) => {
        return acum + el.product.sale_price * el.quantity;
    },0);
    const totalPrice = provisional;

    return ( 
        <form  onSubmit={handleSubmit}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-5')}>
                    <div className={cx('form-user')}>
                        <h5 className={cx('form-title')}>Thông tin nhận hàng</h5>
                        <div className={cx('from-group')}>
                            <p className={cx('require')}>Tên người nhận</p>
                            <input 
                                type="text"
                                placeholder="Họ và tên"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.name && touched.name ? 'input-error':'')}
                            /> 
                            {errors.name && touched.name && <span>{errors.name}</span>}
                        </div>
                        <div className={cx('from-group')}>
                            <p className={cx('require')}>Số điện thoại</p>
                            <input 
                                type="text"
                                placeholder="Số điện thoại"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.phone && touched.phone ? 'input-error':'')}
                            /> 
                            {errors.phone && touched.phone && <span>{errors.phone}</span>}
                        </div>
                        <div className={cx('from-group')}>
                            <p className={cx('require')}>Địa chỉ nhận hàng</p>
                            <textarea 
                                placeholder="Địa chỉ nhận hàng"
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.address && touched.address ? 'input-error':'')}
                             /> 
                              {errors.address && touched.address && <span>{errors.address}</span>}
                        </div>
                        <div className={cx('from-group')}>
                            <p>Ghi chú</p>
                            <textarea 
                                placeholder="Ghi chú"
                                name="note"
                                value={values.note }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.note && touched.note ? 'input-error':'')}
                             /> 
                        </div>
                    </div>
                </div>
                <div className={cx('col', 'l-7')}>
                <div className={cx('info-bill')}>
                    <h5>Đơn hàng</h5>
                    {current?.cart?.map((el) => (
                        <div key={el.product?._id} className={cx('pro-pay')}>
                            <div className={cx('pro-img')}>
                                <img
                                    src={el.product?.thumbnail}
                                    alt="ảnh sản phẩm"
                                />
                                <span>{el.product?.name}</span>
                            </div>
                            <div className={cx('single-price')}>{formattedNumber(el.product.sale_price)} đ</div>
                            <div className={cx('quantt')}>x{el.quantity}</div>
                            <div className={cx('price')}>{handlePrivision(el.product.sale_price, el.quantity)}đ</div>
                        </div>
                    ))}
                    <div className={cx('code-promo')}>
                        <input placeholder="Nhập mã khuyến mãi" />
                        <button>Áp dụng</button>
                    </div>
                    <div className={cx('box-item')}>
                        <p>Tạm tính</p>
                        <p className={cx('active')}>{formattedNumber(provisional)} đ</p>
                    </div>
                    <div className={cx('box-item')}>
                        <p>Khuyến mãi</p>
                        <p className={cx('active')}>0 đ</p>
                    </div>
                    <div className={cx('box-item')}>
                        <p className={cx('total')}>Tổng tiền</p>
                        <p className={cx('total')}>{formattedNumber(totalPrice)} đ</p>
                    </div>              
                    <Button type='submit' primary className={cx('btn-pay')}>
                        Đặt hàng <span className={cx('des-pay')}>Không ưng đổi ngay trong 7 ngày</span>
                    </Button>
                </div>
            </div>
        </div>
        {showPaypal && (
            <OverLay>
                <div className={cx('box-paypal')}>
                    <Button 
                        leftIcon={<FontAwesomeIcon icon={faAngleLeft}/>} 
                        className={cx('btn-back')}
                        onClick={() => setShowPaypal(false)}
                        >
                        Quay lại
                    </Button>
                        <div className={cx('paypal')}>
                            <Paypal 
                                payload={{
                                    // orderItems: cartItems,
                                    // name,
                                    // phone,
                                    // address,
                                    // note,
                                    // totalPrice,
                                }}
                                amount={Math.round(+totalPrice/23500)} 
                            />
                        </div>
                </div>
            </OverLay>
        )}
                        {/* <div className={cx('box-select')}>
                        <div className={cx('pay-method')}>
                            <input type='radio' />
                            <label>Thanh toán khi nhận hàng</label>
                        </div>
                        <div className={cx('pay-method')}>
                            <input type='radio' />
                            <label>Thanh toán qua cổng VN PAY</label>
                        </div>
                        
                    </div> */}
    </form>

     );
}

export default ShippingAddress;