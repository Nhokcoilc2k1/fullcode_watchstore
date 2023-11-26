import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';
import ProductItem from '../ProductItem';

const cx = classNames.bind(styles);

function ListProduct({ data, className, children }) {
    const classes = cx('col', 'item', {
        [className]: className,
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                {data.map((item,index) => (
                    <div className={classes} key={index}>
                        <ProductItem product={item} />
                    </div>
                ))}
            </div>
            {children}
        </div>
    );
}

export default ListProduct;
