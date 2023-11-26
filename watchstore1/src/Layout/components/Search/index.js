import Tippy from '@tippyjs/react/headless';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchProductItem from '~/components/SearchProductItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    // const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        limit: 5,
        page: 1,
    })

    const debounced = useDebounce(searchValue, 800);

    useEffect(() => {
        const fetchApi = async() => {
            try {
                const paramString = queryString.stringify(filters);
                const response = await axios.get(`http://localhost:5000/api/products?name=${encodeURIComponent(debounced)}&${paramString}`);
                const result = response.data;
                const {products} = result
                setSearchResult(products)
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    }, [debounced, filters]);

    const handleKeySearch = (e) => {
        if(e.keycode === 13 && !e.shiftKey){
            // e.preventDefault();
            setFilters({
                limit: 17,
                page: 1,
            })
            
        }
    }


    const handleHideResult = () => {
        setShowResult(false);
    };
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
                onClickOutside={handleHideResult}
            >
                <form className={cx('search')}>
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input
                        value={searchValue}
                        placeholder="Tìm kiếm đồng hồ theo tên, hãng"
                        onChange={(e) => {
                            e.target.value = e.target.value.trimStart();
                            setSearchValue(e.target.value);
                        }}
                        onFocus={() => setShowResult(true)}
                        onKeyDown={handleKeySearch}
                    />
                </form>
            </Tippy>
        </div>
    );
}

export default Search;
