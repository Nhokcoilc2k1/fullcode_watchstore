import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import ListProduct from '../components/ListProduct';
import Button from '~/components/Button';
import {  useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { apiGetProducts } from '~/apis/product';
import BreadCrumb from '~/components/BreadCrumb';
import { Pagination } from '~/Layout/components/Pagination';
import SearchItem from '../components/SearchItm';
import { useSelector } from 'react-redux';
import { sorts, used } from '~/ultils/contants';

const cx = classNames.bind(styles);

function Products() {
    const [products, setProducts] = useState(null);
    const [totalCount, setTotalCount] = useState();
    const [sort, setSort] = useState('');

    const {brands} = useSelector(state => state.brands)
    const [params] = useSearchParams();
    const fetchProductByCategory = async(queries) => {
        const response = await apiGetProducts(queries);
        console.log(response);
        if(response.success) {
            setProducts(response.products)
            setTotalCount(response.pagination.counts)
        };
    }


    useEffect(() => {
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {limit: 10}
        for(let i of params) queries[i[0]] = i[1]
        console.log(queries);
        fetchProductByCategory(queries);
        window.scrollTo(0,0)
    },[params])

    const {category} = useParams();


    // const getButtonContent = () => {
    //     if (sortOrder === 'asc') {
    //       return 'Giá thấp đến cao';
    //     } else if (sortOrder === 'desc') {
    //       return 'Giá cao đến thấp';
    //     } else if(sortOrder === 'appreciate') {
    //       return 'Đánh giá cao';
    //     }else{
    //         return 'Mặc định';
    //     }
    //   };


    const routes = [
        { path: "/", breadcrumb: "Trang chủ" },
        { path: "/:category", breadcrumb: category },
      ];
    
    return (
        <div className={cx('wrapper')}>
            <BreadCrumb routes={routes} />
            <div className={cx('box-content')}>
                <h4 className={cx('title')}>Sản phẩm</h4>
                    <div className={cx('row')}>
                        <div className={cx('col', 'l-2-8')}>
                            <div className={cx('box')}>
                                {
                                    (<span>Tất cả sản phẩm hiện có</span>)
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
                                                        {/* <Button onClick={() => handleSort('default')} className={cx('select-item')}>Mặc định</Button>
                                                        <Button onClick={() => handleSort('appreciate')} className={cx('select-item')}>Đánh giá cao</Button> */}
                                                        {sorts.map(el => (
                                                            <Button onClick={() => setSort('asc')}  className={cx('select-item')}>{el.name}</Button>
                                                        ))}
                                                    </PopperWrapper>
                                                </div>
                                            )}
                                        >
                                            <span>
                                                <Button
                                                    className={cx('select')}
                                                    rightIcon={<FontAwesomeIcon icon={faCaretDown} />}
                                                >
                                                
                                                    {/* {getButtonContent()} */}
                                                </Button>
                                            </span>
                                        </Tippy>
                                    </div>
                                </div>
                            </div>
    
                            <ListProduct data={products} className={cx('l-3')} />
                            <Pagination totalCount={totalCount} />
                        </div>
                        <div className={cx('col', 'l-2-4')}>
                            <div className={cx('box-check')}>
                                <div className={cx('box-check-item')}>
                                    <h4 className={cx('title-check')}>Đối tượng sử dụng</h4>
                                    {/* {used.map((item) => (
                                        <div key={item.id} className={cx('group')}>
                                            <input type="checkbox"  />
                                            <label>{item.desc}</label>
                                        </div>
                                    ))} */}
                                    <SearchItem dataCategory={used} type='category' />
                                </div>
                                <div className={cx('box-check-item')}>
                                    <h4 className={cx('title-check')}>Giá</h4>
                                    {/* {filterPrice.map((item) => (
                                        <div key={item._id} className={cx('group')}>
                                            <input type="checkbox" />
                                            <label>{item.name}</label>
                                        </div>
                                    ))} */}
                                    {/* <SearchItem  dataCategory='price' /> */}
                                </div>
                                <div className={cx('box-check-item')}>
                                    <h4 className={cx('title-check')}>Thương hiệu</h4>
                                    <SearchItem dataBrand={brands} type='brand'  />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Products;
