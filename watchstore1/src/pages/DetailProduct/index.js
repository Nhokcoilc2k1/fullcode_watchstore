import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import RatingShow from '../components/Rating';
import Button from '~/components/Button';
import Specification from './components/Specification';
import ProductSlide from '../components/ProductSilde';
// import { products } from '~/assets/data/Product';
import WarrantyPolicy from './components/IntroduceInfoProduct/WarrantyPolicy';
import { useEffect, useState } from 'react';
import DescriptionProduct from './components/IntroduceInfoProduct/DescriptionProduct';
import IntroSelectSize from './components/IntroduceInfoProduct/IntroSelectSize';
import OverLay from '../components/OverLay';
import { Link, useParams } from 'react-router-dom';
import { Rating, Stack } from '@mui/material';
import { apiGetProduct, apiUpdateReview } from '~/apis/product';
import { formattedNumber } from '~/ultils/helpers';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from '~/Redux/user/asyncActions';
import Swal from 'sweetalert2';
import { apiUpdateCart } from '~/apis/user';
import Comment from './components/Comment';
import { apiGetBrand } from '~/apis/brand';
import BreadCrumb from '~/components/BreadCrumb';

const cx = classNames.bind(styles);

const urlImg = [
    {url: 'https://wscdn.vn/upload/image/OP990-45ADGS-GL-T-1-1131812509-1619214585.jpg?size=500x500&fomat=webp'},
    {url: 'https://wscdn.vn/upload/image/RA-AA0B02R19B-2081811590-287106387.jpg?size=500x500&fomat=webp'},
    {url: 'https://wscdn.vn/upload/image/OP990-45ADGS-GL-T-1-1131812509-1619214585.jpg?size=500x500&fomat=webp'},
    { url: 'https://wscdn.vn/upload/image/L2-1660492967-1835041053.jpg?size=800x800&fomat=webp'},
];

function DetailProduct() {
    const [review, setReview] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [image, setImage] = useState('');
    const [star, setStar] = useState(0);
    const [comment, setComment] = useState('');
    const [product, setProduct] = useState({});
    const [brands, setBrands] = useState([]);

    const {pid} = useParams();
    const dispatch = useDispatch();
    const {current} = useSelector(state => state.user);

    const fetchProductData = async() => {
        const response = await apiGetProduct(pid);
        setProduct(response.productData);
    }

    useEffect(() => {
       if(pid) fetchProductData();
    }, [pid]);

    const fetchBrand = async() => {
        const rs = await apiGetBrand();
        setBrands(rs.brands);
    }

    useEffect(() => {
        fetchBrand();
    },[])

    const addToCartHandle = async() => {
        const response = await apiUpdateCart({ pid, action: 'increase', name: product.name, sale_price: product.sale_price, thumbnail: product.thumbnail})
        if(!current) return Swal.fire({
            title: "Cảnh báo",
            text: "Vui lòng đăng nhập trước", 
        })
        if(response.success){      
            toast.success(response.message)
            dispatch(getCurrent());
        }
        else toast.error(response.message);
    }

    const handleWriteReview = () => {
        if(!current) {
            return Swal.fire({
                title: "Cảnh báo",
                text: "Vui lòng đăng nhập trước", 
            })
        }else{
            setReview(true);
        }
    }

    const submitComment = async(e) => {
        e.preventDefault();
        const response = await apiUpdateReview({pid, star, comment});
        if(response.status) {
            toast.success('Bình luận thành công');
            setReview(false);
        }
        else toast.error('Đã xảy ra lỗi');
    }

    const handleConvertBrand = (bid) => {
        //  const brand = brands?.find(el => el._id === bid).name
        //  return brand;
    }

    const config = [
        {name: 'Thông tin sản phẩm', component: <DescriptionProduct /> },
        {name: 'Chính sách bảo hành', component:  <IntroSelectSize /> },
        {name: 'Hướng dẫn chọn size', component: <WarrantyPolicy /> },
    ]

    const routes = [
        { path: "/:category", breadcrumb: product?.category },
        { path: "/", breadcrumb: "Trang chủ" },
        { path: "/:category/:pid/:title", breadcrumb: product?.name },
      ];

    return (
        <div className={cx('wrapper')}>
            <BreadCrumb routes={routes} />

         <div className={cx('box-content')}>
                <div className={cx('head')}>
                    <h2 className={cx('product-name')}>{product.name}</h2>
                    <RatingShow value={product.totalRating}  />
                    <span className={cx('number-com')}>{product?.reviews?.length} đánh giá</span>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('box')}>
                            <img src={product.thumbnail} alt={product.name} />
                            <div className={cx('picture')}>
                                {urlImg.map((img, index) => (
                                    <img key={index} src={img.url} onClick={() => setImage(img.url)} alt="anh" />
                                ))}
                            </div>
                        </div>
                        <div className={cx('introducce')}>
                            {config.map((el, index) => (
                                <Button key={index} outline onClick={() => setActiveTab(index)} className={cx('intro-btn', activeTab === index  ? 'visited' : '')}>
                                    {el.name}
                                </Button>
                            ))}
                        </div>
                        <div className={cx('content-intro')}>
                            {config[activeTab].component}
                        </div>
                        <div className={cx('comment')}>
                            <h4>{`Đánh giá review ${product.name}`}</h4>
                            <div className={cx('com-content')}>
                                <span className={cx('number')}>5</span>
                                <RatingShow value={5} className={cx('custom-star')} />
                                <Button primary className={cx('comment-btn')} onClick={handleWriteReview}>
                                    Viết đánh giá
                                </Button>
                            </div>
                           <p className={cx('com-head')}> Cam kết 100% đánh giá đều đến từ khách đã mua hàng</p>
                        </div>
                        <Comment reviews={product.reviews} totalRating={product.totalRating}/>
                    </div>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('info')}>
                            <div className={cx('box-price')}>
                                <span className={cx('sale-price')}>{formattedNumber(product.price)} đ</span>
                                <span className={cx('regular-price')}>{formattedNumber(product.sale_price)} đ</span>
                                <span className={cx('discount')}>{product.discount_value}%</span>
                            </div>
                            <span className={cx('brand')}>Thương hiệu: {handleConvertBrand(product?.brand)}</span>
                            <div className={cx('box-promo')}>
                                <h5>Khuyến mãi áp dụng từ 10/09/2023 đến 20/09/2023</h5>
                                <div className={cx('pro-content')}>
                                    <p className={cx('content')}>
                                        Nhập mã <span>SWT9200</span>
                                        {`đơn >= 8 triệu giảm 200k`}
                                    </p>
                                    <p className={cx('content')}>
                                        Nhập mã <span>SWT9150</span>
                                        {`đơn >= 8 triệu giảm 200k`}
                                    </p>
                                    <p className={cx('content')}>
                                        Nhập mã <span>SWT9100</span>
                                        {`đơn >= 8 triệu giảm 200k`}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('control')}>
                                {product.quantity === 0 ? (
                                    <>
                                        <Button disable outline leftIcon={<FontAwesomeIcon icon={faCartPlus} />} className={cx('custom-btn')}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button disable primary className={cx('custom-btn')}>
                                        Mua ngay- Freeship
                                        <span className={cx('insert-text')}>Kiểm tra hàng trước khi thanh toán</span>
                                    </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button outline leftIcon={<FontAwesomeIcon icon={faCartPlus} />} className={cx('custom-btn')}
                                            onClick={addToCartHandle}
                                        >
                                            Thêm vào giỏ hàng
                                        </Button>
                                        <Button primary className={cx('custom-btn')}>
                                            Mua ngay- Freeship
                                            <span className={cx('insert-text')}>Kiểm tra hàng trước khi thanh toán</span>
                                        </Button>
                                    </>
                                )}
                            </div>
                            <div className={cx('box-policy')}>
                                <h5>Chính sách mua hàng tại WatchStore.vn</h5>
                                <div className={cx('pol-content')}>
                                    <div className={cx('pol-item')}>
                                        <img src="https://www.watchstore.vn/public/assets/images/Package.svg" alt="anh" />
                                        <span>FreeShip toàn quốc</span>
                                    </div>
                                    <div className={cx('pol-item')}>
                                        <img src="https://www.watchstore.vn/public/assets/images/doitra.svg" alt="anh" />
                                        <span>Đổi trả hàng trong 7 ngày</span>
                                    </div>
                                </div>
                                <div className={cx('pol-content')}>
                                    <div className={cx('pol-item')}>
                                        <img src="https://www.watchstore.vn/public/assets/images/camket.svg" alt="anh" />
                                        <span>Cam kết hàng chính hãng</span>
                                    </div>
                                    <div className={cx('pol-item')}>
                                        <img src="https://www.watchstore.vn/public/assets/images/baohanh.svg" alt="anh" />
                                        <span>Chế độ bảo hành 5 năm</span>
                                    </div>
                                </div>
                            </div>
                            <Specification data />
                        </div>
                    </div>
                </div>
                <div className={cx('footer-page')}>
                    {/* <h4>Có thể bạn cũng thích</h4> */}
                    {/* <ProductSlide data={products} /> */}
                </div>
                {
                    review &&
                    <OverLay>
                        <div className={cx('form-review')}>
                            <form className={cx('review')}>
                                <h5>Viết đánh giá</h5>
                                <p>Đánh giá của bạn</p>
                                {/* <Rating value={0} className={cx('review-star')} /> */}
                                <Stack spacing={10} className={cx('review-star')}>
                                    <Rating value={star} onChange={e => setStar(+e.target.value)} size="large"></Rating>
                                </Stack>
                                <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Viết đánh giá của bạn" />
                                <div className={cx('control')}>
                                    <Button outline className={cx('btn-cancel')} onClick={() => setReview(false)}>
                                        Hủy
                                    </Button>
                                    <Button onClick={submitComment} className={cx('btn-submit')}>Gửi đánh giá</Button>
                                </div>
                            </form>
                        </div>
                    </OverLay>
                }
         </div>
        </div>
    );
}

export default DetailProduct;

