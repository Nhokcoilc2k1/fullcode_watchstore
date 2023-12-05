import classNames from 'classnames/bind';
import styles from './SearchProductItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const formattedNumber = (price) => {
    return String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}


function SearchProductItem({data}) {
    return (
        <Link to={`${data?.category?.toLowerCase()}/${data._id}/${data?.name}`} className={cx('wrapper')}>
            <img className={cx('product-img')} src={data.thumbnail} alt={data.name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>{data.name}</h4>
                <span className={cx('sale-price')}>{formattedNumber(data.sale_price)} đ</span>
                <del className={cx('regular-price')}>{formattedNumber(data.price)} đ</del>
                <span className={cx('discount')}>{data.discount_value}%</span>
            </div>
        </Link>
    );
}

export default SearchProductItem;
