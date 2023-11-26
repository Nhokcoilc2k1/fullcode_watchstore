import classNames from 'classnames/bind';
import styles from './TypeWatch.module.scss';
import { Link  } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function TypeWatch() {
    const {categories} = useSelector(state => state.app);
    const data = categories.filter(el => el.status === true);


    return (
        <div className={cx('wrapper')}>
            <h2>Chọn đồng hồ phù hợp</h2>
            <p>WatchStore cung cấp đa dạng mẫu đồng hồ theo nhiều phong cách khác nhau</p>
            <div className={cx('box')}>
                <div className={cx('row')}>
                    {data.map((item) => (
                        <div key={item._id} className={cx('col', 'l-2-4', 'item')}>
                            <Link to={`/products?category=${item._id}&name=${item.name}`}>
                                <img src={item.image} alt={item.description} />
                                <span>{item.name}</span>
                            </Link>
                        </div>
                        // <a key={item.id} href="/" className={cx('col', 'l-2-4', 'item')}>
                        //     <img src={item.img} alt={item.title} />
                        //     <span>{item.title}</span>
                        // </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TypeWatch;
