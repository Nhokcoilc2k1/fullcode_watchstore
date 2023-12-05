import classNames from 'classnames/bind';
import styles from './Brand.module.scss';
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import path from '~/ultils/path';

const cx = classNames.bind(styles);

function Brand() {
    const {brands} = useSelector(state => state.brands)

    const data = brands.filter(el => el.status === true);
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const handleClick = (name) => {
        const queries= Object.fromEntries([...params])
        queries.brand = name
        navigate({
            pathname: `${path.PRODUCTS}`,
            search: createSearchParams(queries).toString()
        })
    }

    return (
        <div className={cx('wrapper')}>
            <h2>THƯƠNG HIỆU NỔI BẬT</h2>
            <p>WatchStore đang có sẵn hơn 10.000+ sản phẩm đến từ 60 thương hiệu nổi tiếng</p>
            <div className={cx('box')}>
                <div className={cx('row')}>
                    {data.map((item) => (
                        <div key={item._id} className={cx('col', 'l-2', 'item')}>
                            <div onClick={() => handleClick(item.name)} className={cx('btn')}>
                                <img src={item.image} alt={item.description} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Brand;
