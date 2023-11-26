import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import ListProduct from '../components/ListProduct';
import Button from '~/components/Button';
import Pagination from '../components/Pagination';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { apiGetProducts } from '~/apis/product';

const cx = classNames.bind(styles);
const filterPrice = [
    {id: 1,desc: 'dưới 3 triệu'},
    {id: 2,desc: '3 - 6 triệu'},
    {id: 3,desc: '6 - 12 triệu'},
    {id: 4,desc: '12 - 35 triệu'},
    {id: 5,desc: '35 - 100 triệu'},
];

const used = [
    {id: 'Nam',desc: 'Nam'},
    {id: "Nữ",desc: 'Nữ'},
];

function Products() {
    // window.scrollTo(0,0);
    const [sortOrder, setSortOrder] = useState(null);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [checked, setChecked] = useState([]);
    const [checkeUsed, setCheckedUsed] = useState([]);

    const [filters, setFilters] = useState({
        limit: 11,
        page: 1,
    })

    const localtion = useLocation();
    const searchParams = new URLSearchParams(localtion.search);
    const category = searchParams.get('category');
    const nameCategory = searchParams.get('name');
    const brandParam = searchParams.get('brand');
    const nameBrand = searchParams.get('namebrand');

    useEffect(() => {
        const fetchApi = async() => {
            try {
                const paramString = queryString.stringify(filters);
                const response = await axios.get(`http://localhost:5000/api/products?${paramString}`);
                const brandResult = await axios.get('http://localhost:5000/api/brands');
                const results = response.data;
                const {products, pagination} = results;
                setBrands(brandResult.data.brands);
                setProducts(products);
                setPagination(pagination);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    }, [filters , checked, category])

    const handleSort = (sort) => {
        setSortOrder(sort);
    }

    const getButtonContent = () => {
        if (sortOrder === 'asc') {
          return 'Giá thấp đến cao';
        } else if (sortOrder === 'desc') {
          return 'Giá cao đến thấp';
        } else if(sortOrder === 'appreciate') {
          return 'Đánh giá cao';
        }else{
            return 'Mặc định';
        }
      };

    const filterProducts = category 
    ? products.filter(el => el.category === category) 
    : brandParam ? products.filter(el => el.brand === brandParam) 
    : products;

    const sortedProducts = sortOrder
    ? filterProducts.slice().sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else if(sortOrder === 'desc') {
          return b.price - a.price;
        }else if(sortOrder === 'appreciate'){
            return b.totalRating - a.totalRating;
        } else {
            return filterProducts;
        }
      })
    : filterProducts;

    const handleCheck = (id) => {
        setChecked((prev) => {
            const isChecked = checked.includes(id);

            if (isChecked) {
                return checked.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };
    
    const handleCheckUsed = (id) => {
        setCheckedUsed((prev) => {
            const isChecked = checkeUsed.includes(id);

            if (isChecked) {
                return checkeUsed.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    }


    // const check1Product = sortedProducts.filter(el => checkeUsed.includes(el.name))
    
    const checkProducts = checked.length === 0 ? sortedProducts : sortedProducts.filter(el => checked.includes(el.brand) ) ;
    
    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        })
    };

    
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>Sản phẩm</h4>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-2-8')}>
                        <div className={cx('box')}>
                            {
                                category ? 
                                (<span>{filterProducts.length} sản phẩm được tìm thấy theo '{nameCategory}' </span>)
                                : brandParam ?(<span>{filterProducts.length} sản phẩm được tìm thấy theo '{nameBrand}' </span>) 
                                : (<span>Tất cả sản phẩm hiện có</span>)
                            }
                            <div className={cx('sort')}>
                                <h4>Sắp xếp theo</h4>
                                {/*  // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. */}
                                <div>
                                    <Tippy
                                        hideOnClick
                                        trigger="click"
                                        interactive={true}
                                        placement="bottom-start"
                                        render={(attrs) => (
                                            <div className={cx('select-list')} tabIndex="-1" {...attrs}>
                                                <PopperWrapper className={cx('select-popper')}>
                                                    <Button onClick={() => handleSort('default')} className={cx('select-item')}>Mặc định</Button>
                                                    <Button onClick={() => handleSort('asc')} className={cx('select-item')}>Giá thấp đến cao</Button>
                                                    <Button onClick={() => handleSort('desc')} className={cx('select-item')}>Giá cao đến thấp</Button>
                                                    <Button onClick={() => handleSort('appreciate')} className={cx('select-item')}>Đánh giá cao</Button>
                                                </PopperWrapper>
                                            </div>
                                        )}
                                    >
                                        <span>
                                            <Button
                                                className={cx('select')}
                                                rightIcon={<FontAwesomeIcon icon={faCaretDown} />}
                                            >
                                                {getButtonContent()}
                                            </Button>
                                        </span>
                                    </Tippy>
                                </div>
                            </div>
                        </div>

                        <ListProduct data={checkProducts} className={cx('l-3')} />
                        <Pagination pagination={pagination} onPageChange={handlePageChange} />
                    </div>
                    <div className={cx('col', 'l-2-4')}>
                        <div className={cx('box-check')}>
                            <div className={cx('box-check-item')}>
                                <h4 className={cx('title-check')}>Đối tượng sử dụng</h4>
                                {used.map((item) => (
                                    <div key={item.id} className={cx('group')}>
                                        <input type="checkbox" checked={checkeUsed.includes(item.id)} onChange={() =>handleCheckUsed(item.id)}/>
                                        <label>{item.desc}</label>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('box-check-item')}>
                                <h4 className={cx('title-check')}>Giá</h4>
                                {filterPrice.map((item) => (
                                    <div key={item.id} className={cx('group')}>
                                        <input type="checkbox" />
                                        <label>{item.desc}</label>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('box-check-item')}>
                                <h4 className={cx('title-check')}>Thương hiệu</h4>
                                {brands.map((item) => (
                                    <div key={item._id} className={cx('group')}>
                                        <input type="checkbox" checked={checked.includes(item._id)} onChange={() => handleCheck(item._id)} />
                                        <label>{item.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Products;
