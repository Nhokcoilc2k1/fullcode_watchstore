import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import ListProduct from '../components/ListProduct';
import Button from '~/components/Button';
import {  useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apiGetProducts } from '~/apis/product';
import BreadCrumb from '~/components/BreadCrumb';
import { Pagination } from '~/Layout/components/Pagination';
import SearchItem from '../components/SearchItm';
import { useSelector } from 'react-redux';
import {  sorts, used } from '~/ultils/contants';

const cx = classNames.bind(styles);

function Products() {
    const [products, setProducts] = useState(null);
    const [totalCount, setTotalCount] = useState();
    const [sort, setSort] = useState('');
    const [price, setPrice] = useState({
        from: '',
        to: ''
    });
    const [render, setRender] = useState(false);

    const navigate = useNavigate();
    const {brands} = useSelector(state => state.brands)
    const [params] = useSearchParams();
    const {category} = useParams();

    const fetchProductByCategory = async(queries) => {
        const response = await apiGetProducts(queries);
        if(response.success) {
            setProducts(response.products)
            setTotalCount(response.pagination.counts)
        };
    }

    
    useEffect(() => {
        let param = []
        for(let i of params.entries()) param.push(i)
        // const queries = {limit: 10, category: category}
        const queries = {}
        if(category !== ':category'){
            queries.limit = 10
            queries.category = category
        } else queries.limit = 10
        for(let i of params) queries[i[0]] = i[1]

        let priceQuery = {}
        if(queries.to && queries.from){
            priceQuery = { $and: [
                {sale_price: {gte: queries.from}},
                {sale_price: {lte: queries.to}}
            ]
            }
            delete queries.sale_price

        }
        if(queries.from) queries.sale_price = {gte: queries.from}
        if(queries.to) queries.sale_price = {lte: queries.to}
        delete queries.to
        delete queries.from

        const q = {...priceQuery, ...queries}
        // console.log(q);
        fetchProductByCategory(q);
        window.scrollTo(0,0)
    },[params])

    useEffect(() => {
        const queries= Object.fromEntries([...params])
        if(sort){
            queries.sort = sort
            navigate({
                pathname: `/${category}`,
                search: createSearchParams( queries).toString() 
            })
        }else delete queries.sort
    }, [sort])


    // const debouncePriceFrom = useDebounce(price.from, 500)
    // const debouncePriceTo = useDebounce(price.to, 500)
    // useEffect(() => {
    //     const data = {}
    //     if(Number(price.from)>0) data.from = price.from
    //     if(Number(price.to)>0) data.to = price.to
    //     navigate({
    //         pathname: `/${category}`,
    //         search: createSearchParams(data).toString()
    //     })

    // },[debouncePriceFrom, debouncePriceTo])

    const handleSortPrice = () => {
        const data = {}
        if(Number(price.from)>0) data.from = price.from
        if(Number(price.to)>0) data.to = price.to
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(data).toString()
        })
    }


    const getButtonContent = () => {
        if (sort === 'sale_price') {
          return 'Giá thấp đến cao';
        } else if (sort === '-sale_price') {
          return 'Giá cao đến thấp';
        } else if(sort === 'totalRating') {
          return 'Đánh giá cao';
        }else{
            return 'Mặc định';
        }
      };

      const handleCancelFilter = () => {
        const queries= Object.fromEntries([...params])
        if(Object.keys(queries) !== 0){
            Object.keys(queries).forEach(key => delete queries[key]);
            navigate({
                pathname: `/${category}`,
                search: createSearchParams(queries).toString()
            })
            // setRender(!render)
        }else return;
      }

    const routes = [
        { path: "/", breadcrumb: "Trang chủ" },
        { path: "/:category", breadcrumb: category !== ':category' ? category : 'sản phẩm' },
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
                                                        {sorts.map(el => (
                                                            <Button key={el.id} onClick={() => setSort(el.value)}  className={cx('select-item')}>{el.text}</Button>
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
                                                    {getButtonContent()}
                                                </Button>
                                            </span>
                                        </Tippy>
                                    </div>
                                </div>
                            </div>
    
                            <ListProduct data={products} className={cx('l-3')} />
                            <Pagination totalCount={totalCount} limit={10} />
                        </div>
                        <div className={cx('col', 'l-2-4')}>
                            <div className={cx('box-check')}>
                                <div className={cx('box-check-item')}>
                                    <h4 className={cx('title-check')}>Đối tượng sử dụng</h4>
                                    <SearchItem dataCategory={used} type='category' render={render} />
                                </div>
                                <div className={cx('box-check-item')}>
                                    <h4 className={cx('title-check')}>Giá</h4>
                                    {/* <SearchItem  dataPrice={filterPrice} />  */}
                                    <p>Từ</p>
                                    <div className={cx('box-price')}>
                                        <input 
                                            placeholder='Từ ' 
                                            value={price.from} 
                                            onChange={e => setPrice(prev => ({...prev, from: e.target.value}))}
                                        />
                                        <label></label>
                                    </div>
                                    <p>Đến</p>
                                    <div className={cx('box-price')}>
                                        <input 
                                            placeholder='đến ' 
                                            value={price.to} 
                                            onChange={e => setPrice(prev => ({...prev, to: e.target.value}))}
                                        />
                                        <label></label>
                                    </div>
                                    <button onClick={() => handleSortPrice()} className={cx('price-btn', price.from !== '' ? 'active-btn-price' : 'disable')}>Áp dụng</button>
                                    <p></p>
                                </div>
                                
                                <div className={cx('box-check-item')}>
                                    <h4 className={cx('title-check')}>Thương hiệu</h4>
                                    <SearchItem dataBrand={brands} type='brand' render={render} />
                                </div>
                                <div className={cx('box-cancel')}>
                                    <Button onClick={() => handleCancelFilter()} className={cx('cancel-filter')} rightIcon={<FontAwesomeIcon icon={faFilterCircleXmark} />}>Bỏ tất cả lọc</Button>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Products;
