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
import { formatPromo, formattedNumber } from '~/ultils/helpers';
import { apiUpdateCurrent } from '~/apis/user';
import Swal from 'sweetalert2';
import Congration from '../components/Congration';
import { apiCreateOrder, apiUpdateQuantitySoldProduct } from '~/apis/product';
import { useNavigate } from 'react-router-dom';
import { apiGetPromotion } from '~/apis/promotion';
import { toast } from 'react-toastify';
import { getCurrent } from '~/Redux/user/asyncActions';

const cx = classNames.bind(styles);
let totalPrice;
let discount;

function ShippingAddress() {
    const [showPaypal, setShowPaypal] = useState(false);
    const [checked, setChecked] = useState();
    const {current} = useSelector((state)  => state.user);
    const [isSuccess, setIsSuccess] = useState(false);
    const [promotion, setPromotion] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [render, setRender] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const fetchPromo = async() => {
        const response = await apiGetPromotion();
        if(response.success){
            setPromotion(response.promotions)
        }else return;
    }

    useEffect(() => {
        fetchPromo();
    },[])

    const provisional = current?.cart?.reduce((acum, el) => {
        return acum + el?.product?.sale_price * el?.quantity;
    },0);

    

    const handleCouponCode = () => {
        const code = promotion.find(el => el.coupon_code === couponCode);
        if(code){
            if(provisional >= code.min_order_value){
               totalPrice = +provisional - +code.discount_value;
               discount = code.discount_value;
               setRender(!render);
            }else toast.error('Không đủ điều kiện dùng mã giảm giá!')
        }else toast.error('Mã giảm giá không tồn tại!')
    }

    const fitPromo = promotion.filter(el => +provisional > +el.min_order_value)
    const promOfOder = fitPromo.filter(el => el.status === true)
    // console.log(totalPrice);

    // const totalPrice = provisional;



    const {values, setValues, errors, handleChange,handleSubmit, handleBlur, touched} = useFormik({
        initialValues: {
            name: '',
            phone:'',
            address:'' ,
            note:'',
        },    
        validationSchema: shipAddressValidation,
        onSubmit : async() => {
            const { address} = values;
            const data = { address}
            const response = await apiUpdateCurrent(data);
            if(checked && checked === 'Thanh toán sau'){
                const response = await apiCreateOrder({...values,products: current.cart, orderBy: current?._id, totalPrice})
                if(response.success){
                    setIsSuccess(true);
                    dispatch(getCurrent());
                    current.cart.map(async(el) => {
                         await apiUpdateQuantitySoldProduct(el?.product?._id, {qnt: el.quantity})
                    })
                    setTimeout(() => {
                        Swal.fire('Chúc mừng','Bạn đã đặt hàng thành công', 'success').then(() => {
                            navigate('/don-hang');
                            window.location.reload();
                        }, 3000)
                    })         
                }
            }else if(checked && checked === 'Thanh toán paypal'){
                setShowPaypal(true);
            }else{
                Swal.fire({
                    title: 'Vui lòng chọn phương thức thanh toán'
                })
            }
            
        }
        
      });

      const {name, phone, address, note} = values;

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

    console.log(current?.cart);


    const payment = [
        {value: 'Thanh toán sau', name: "Thanh toán khi nhận hàng"},
        {value: 'Thanh toán paypal', name: "Thanh toán bằng PayPal"}
    ]

    return ( 
        <form  onSubmit={handleSubmit}>
            { isSuccess && <Congration />}
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
                    <div className={cx('box-promo')}>
                        <p className={cx('header-pro')}>Khuyến mãi phù hợp với đơn hàng của bạn</p>
                        {promOfOder?.map((el, index) => (
                            <p key={index} className={cx('content')}>
                            Nhập mã <span>{el.coupon_code}</span>
                            {`đơn >= ${formatPromo(el.min_order_value)} giảm ${formatPromo(el.discount_value)}`}
                        </p>
                        ))}
                    </div>
                    <div className={cx('code-promo')}>
                        <input placeholder="Nhập mã khuyến mãi" onChange={e => setCouponCode(e.target.value)} />
                        <button type='button' onClick={handleCouponCode}>Áp dụng</button>
                    </div>
                    <div className={cx('box-item')}>
                        <p>Tạm tính</p>
                        <p className={cx('active')}>{formattedNumber(provisional)} đ</p>
                    </div>
                    <div className={cx('box-item')}>
                        <p>Khuyến mãi</p>
                        <p className={cx('active')}>{ discount ? formattedNumber(discount) : ''} đ</p>
                    </div>
                    <div className={cx('box-item')}>
                        <p className={cx('total')}>Tổng tiền</p>
                        <p className={cx('total')}>{formattedNumber(totalPrice ? totalPrice : totalPrice = provisional)} đ</p>
                    </div>    
                    <div className={cx('box-select')}>
                        {payment.map(el => (
                            <div key={el.value} className={cx('pay-method')}>
                                <input type='radio' checked = {checked === el.value} onChange={() => setChecked(el.value)} />
                                <label>{el.name}</label>
                            </div> 
                        ))}  
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
                                    products: current.cart,
                                    orderBy: current?._id,
                                    totalPrice,
                                    name,
                                    address,
                                    phone,
                                    note,
                                }}
                                setIsSuccess={setIsSuccess}
                                setShowPaypal={setShowPaypal}
                                amount={Math.round(+totalPrice/23500)} 
                            />
                        </div>
                </div>
            </OverLay>
        )}
    </form>

     );
}

export default ShippingAddress;