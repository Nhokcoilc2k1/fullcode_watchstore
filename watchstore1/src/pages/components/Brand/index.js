import classNames from 'classnames/bind';
import styles from './Brand.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Brand() {
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        const fetchApi = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/api/brands`);
                const results = response?.data?.brands;
                setBrand(results);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    }, []);

    const data = brand.filter(el => el.status === true);
    return (
        <div className={cx('wrapper')}>
            <h2>THƯƠNG HIỆU NỔI BẬT</h2>
            <p>WatchStore đang có sẵn hơn 10.000+ sản phẩm đến từ 60 thương hiệu nổi tiếng</p>
            <div className={cx('box')}>
                <div className={cx('row')}>
                    {data.map((item) => (
                        <div key={item._id} className={cx('col', 'l-2', 'item')}>
                            <Link to={`/products?brand=${item._id}&namebrand=${item.name}`}>
                                <img src={item.image} alt={item.description} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Brand;
