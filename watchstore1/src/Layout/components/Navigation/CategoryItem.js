import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CategoryItem({ data }) {

    return (
        <div className={cx('cate-list')}>
            {/* <h5>{title}</h5> */}
            <div>
                {data.map((item, index) => (
                    <Link to={`/products?category=${item._id}&name=${item.name}`}  key={index} className={cx('cate-item')}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CategoryItem;
