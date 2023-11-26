import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import Rating from '../Rating';
import { formattedNumber } from '~/ultils/helpers';

const cx = classNames.bind(styles);

function ProductItem({ product }) {

    return (
        <a href={`/products/${product._id}`} className={cx('wrapper')}>
            <img src={product.thumbnail} alt="anh" />
            <div className={cx('info')}>
                <h4 className={cx('name-product')}>{product.name}</h4>
                <p className={cx('sale-price')}>{formattedNumber(product.sale_price)} đ</p>
                <p className={cx('box')}>
                    <span className={cx('regular-price')}>{formattedNumber(product.price)} đ</span>
                    <span className={cx('discount')}>-{product.discount_value}%</span>
                </p>
                <Rating value={product.totalRating}  className={cx('item-rating')} />
            </div>
        </a>
    );
}

export default ProductItem;
