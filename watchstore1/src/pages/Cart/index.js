import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import {  useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { formattedNumber } from '~/ultils/helpers';
import { toast } from 'react-toastify';
import { apiRemoveCart, apiUpdateCart } from '~/apis/user';
import { getCurrent } from '~/Redux/user/asyncActions';
import path from '~/ultils/path';
import BreadCrumb from '~/components/BreadCrumb';

const cx = classNames.bind(styles);

function Cart() {
    const dispatch = useDispatch();
    const { current } = useSelector((state) => state.user);

    const handlePrivision = (price, quantity) => {
        const privision = price*quantity;
        return formattedNumber(privision)
    }

    const totals = current?.cart?.reduce((acum, el) => {
        return acum + el?.product?.sale_price * el?.quantity;
    },0)

    const handleRemoveCart = async(pid) => {
        const response = await apiRemoveCart(pid);
        console.log(response);
        console.log(pid);
        if(response.success){      
            dispatch(getCurrent());
        }
        else toast.error(response.message);
    }

    const handleDiscreaseQuantity = async(pid) => {
        const response = await apiUpdateCart({ pid, action: 'decrease'})
        if(response.success){      
            dispatch(getCurrent());
        }
        else return;
    }

    const handleIncreaseQuantity = async(pid) => {
        const response = await apiUpdateCart({ pid, action: 'increase'})
        if(response.success){      
            dispatch(getCurrent());
        }
        else return;
    }

    const routes = [
        { path: "/", breadcrumb: "Trang chủ" },
        { path: "/cart", breadcrumb: 'Giỏ hàng' },
      ];
    
    return (
        <div className={cx('wrapper')}>
            <BreadCrumb routes={routes} />
            <div className={cx('box-content')}>
                <h2 className={cx('name-pages')}>Giỏ hàng</h2>
                {
                    current?.cart?.length === 0 ? (
                    <div className={cx('no-cart')}>
                        <img src="https://shop.30shine.com/images/empty%20cart.svg" alt="ảnh giỏ hàng trống" />
                        <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                        <Button className={cx('btn-cart')} to={'/'} primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                            Tiếp tục mua sắm
                        </Button>
                    </div> 
                    )
                    : 
                    (
                    <div className={cx('cart')}>
                        <div className={cx('row')}>
                            <div className={cx('col', 'l-9')}>
                                <table className={cx('table')}>
                                    <thead className={cx('t-header')}>
                                        <tr>
                                            <th>
                                                <p className={cx('title')}></p>
                                            </th>
                                            <th>
                                                <p className={cx('title')}>Sản phẩm</p>
                                            </th>
                                            <th>
                                                <p className={cx('title')}>Đơn giá</p>
                                            </th>
                                            <th>
                                                <p className={cx('title')}>Số lượng</p>
                                            </th>
                                            <th>
                                                <p className={cx('title')}>Tạm tính</p>
                                            </th>
                                            <th>
                                                <p className={cx('title')}></p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {current?.cart?.length !== 0 ? current?.cart?.map((el) => (
                                            <tr className={cx('row-product')} key={el._id}>
                                                <td className={cx('td-checkbox')}></td>
                                                <td>
                                                    <div className={cx('product')}>
                                                        <Link to={`/products/${el.product?._id}`}><img src={el.product?.thumbnail} alt="ảnh đồng hồ" /></Link>
                                                        <Link to={`/products/${el.product?._id}`}><span>{el.product?.name}</span></Link>
                                                    </div>
                                                </td>
                                                <td className={cx('single-price')}>
                                                    <div>{formattedNumber(el.product?.sale_price)} đ</div>
                                                </td>
                                                <td className={cx('calcul-btn')}>
                                                    <div className={cx('box-btn')}>
                                                    <button className={cx('btn')} onClick={() => handleDiscreaseQuantity(el.product?._id)}  >
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <div className={cx('quantity')}>{el.quantity}</div>
                                                    <button className={cx('btn')}  >
                                                        <FontAwesomeIcon icon={faPlus} onClick={() => handleIncreaseQuantity(el.product?._id)} />
                                                    </button>
                                                </div>
                                                </td>
                                                <td className={cx('price-temporary')}>
                                                    <div>{handlePrivision(el.product.sale_price, el.quantity)} đ</div>
                                                </td>
                                                <td className={cx('col-6')}>
                                                    <div className={cx('delete')}  onClick={() => handleRemoveCart(el.product?._id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (<></>)}
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('col', 'l-3')}>
                                <div className={cx('info-order')}>
                                    <div className={cx('info-head')}>
                                        <h4>Thông tin đơn hàng</h4>
                                        <div className={cx('info-item')}>
                                            <span className={cx('info')}>
                                                Tổng : <span>{`${current?.cart?.length} sản phẩm`}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('total-price')}>
                                        <span className={cx('total')}>Tổng tiền</span>
                                        <span className={cx('total')}>{formattedNumber(totals)} đ</span>
                                    </div>
                                </div>
                                {
                                    current?.cart?.length === 0 ? (
                                        <Button disable primary className={cx('btn-cart')}>
                                            Tiến hành đặt hàng
                                            <span className={cx('sub-text')}>Không ưng đổi ngay trong 7 ngày</span>
                                        </Button> 
                                    )
                                    : (    
                                        <Button primary to={path.PAYMENT} className={cx('btn-cart')}>
                                            Tiến hành đặt hàng
                                            <span className={cx('sub-text')}>Không ưng đổi ngay trong 7 ngày</span>
                                        </Button> 
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
}

export default Cart;
