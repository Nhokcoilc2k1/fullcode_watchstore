import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slogan from '../components/Slogan';
import ProductSlide from '../components/ProductSilde';
import TypeWatch from '../components/TypeWatch';
import Brand from '../components/Brand';
import ListProduct from '../components/ListProduct';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { apiGetProducts } from '~/apis/product';
import { getNewProduct } from '~/Redux/products/asyncActions';

const cx = classNames.bind(styles);

function Home() {
    const [bestSellers, setBestSellers] = useState([]);
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const { newProducts} = useSelector(state => state.products);

    const fetchProducts = async() => {
        const response = await Promise.all([apiGetProducts({sort: '-sold'}), apiGetProducts({sort: '-totalRating', limit: 13})])
        if(response[0]?.success) setBestSellers(response[0].products);
        if(response[1].success) setProducts(response[1].products);
    }

    useEffect(() => {
        fetchProducts();
        dispatch(getNewProduct());
    }, [dispatch]);


    return (
        <div className={cx('wrapper')}>
            <Slogan />
            <section className={cx('section')}>
                <ProductSlide data={bestSellers}>
                    <h3 className={cx('header-slide')}>Top tìm kiếm</h3>
                    <span className={cx('swiper-pagination')}></span>
                </ProductSlide>
                <ProductSlide data={newProducts}>
                    <h3 className={cx('header-slide')}>Sản phẩm bán chạy</h3>
                    <span className={cx('swiper-pagination')}></span>
                </ProductSlide>
                <TypeWatch />
                <Brand />
                <h2 className={cx('title')}>Các sản phẩm liên quan</h2>
                <ListProduct data={products} className={cx('l-2-4')}>
                    <div className={cx('custom-btn')}>
                        <Button outline href="/products" rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                            Xem thêm
                        </Button>
                    </div>
                </ListProduct>
            </section>
        </div>
    );
}

export default Home;
