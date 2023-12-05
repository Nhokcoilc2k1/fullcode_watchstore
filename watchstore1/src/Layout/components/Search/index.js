import Tippy from '@tippyjs/react/headless';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchProductItem from '~/components/SearchProductItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '~/hooks';
import { apiGetProducts } from '~/apis/product';
import {  createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import path from '~/ultils/path';

const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [keyword, setKeyWord] = useState('');
    const [queries, setQueries] = useState({q:''})

    const [params] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const queriesDebounced = useDebounce(queries.q, 800);
    const fetchProduct = async(params) => {
        const response = await apiGetProducts({...params, limit : process.env.REACT_APP_LIMIT })
        if(queries.q && response.success){
            setSearchResult(response.products)
        }
    }


    useEffect(() => {
        const queries= Object.fromEntries([...params])
         if(queriesDebounced){
            queries.q = queriesDebounced
        } else delete queries.q
        // navigate({
        //     pathname: location.pathname,
        //     search: createSearchParams(queries).toString()
        // })
       fetchProduct(queries)
    },[queriesDebounced, params])

    const handleKeySearch = async(e) => {
        if(e.keyCode === 13){
            if(queriesDebounced){
                queries.q = queriesDebounced
            } else delete queries.q
            if(location.pathname === '/:category'){
                navigate({
                    pathname: location.pathname,
                    search: createSearchParams(queries).toString()
                })
            } else {
                navigate({
                    pathname: `${path.PRODUCTS}`,
                    search: createSearchParams(queries).toString()
                })
            }
        }
    }

    


    return (
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <Tippy
                interactive={true}
                visible={showResult && searchResult.length > 0}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Gợi ý sản phẩm</h4>
                            {searchResult.map((el) => (
                                <SearchProductItem key={el._id} data={el}/>
                            ))}
                            <a href={'/'} className={cx('more-search')}>
                                Xem thêm 
                            </a>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => setShowResult(false)}
            >
                <form className={cx('search')}>
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input
                        value={queries.q}
                        placeholder="Tìm kiếm đồng hồ theo tên, hãng"
                        onChange={e => setQueries({...queries, q: e.target.value})}
                        onFocus={() => setShowResult(true)}
                        onKeyDown={handleKeySearch}
                    />
                </form>
            </Tippy>
        </div>
    );
}

export default Search;
