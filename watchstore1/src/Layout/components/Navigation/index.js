import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import CategoryItem from './CategoryItem';
import { memo, useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import path from '~/ultils/path';

const cx = classNames.bind(styles);

function Navigation() {
    const [category, setCategory] = useState([]);

    const {categories} = useSelector(state => state.app);
    useEffect(() => {
        setCategory(categories);
    }, [categories])
   
    const data = category.filter(el => el.status === true);

    return (
        <div className={cx('wrapper')}>
            <nav className={cx('inner')}>
                <div>
                    <Tippy
                        hideOnClick={false}
                        trigger="mouseenter"
                        interactive={true}
                        placement="bottom-start"
                        render={(attrs) => (
                            <div className={cx('category')} tabIndex="-1" {...attrs}>
                                <PopperWrapper className={cx('cate-popper')}>
                                    <CategoryItem data={data} />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <span>
                            <Button className={cx('custom')} primary rightIcon={<FontAwesomeIcon icon={faCaretDown} />}>
                                Danh mục
                            </Button>
                        </span>
                    </Tippy>
                </div>

                <Button className={cx('custom', 'space')} to={path.PRODUCTS} primary>
                    Sản phẩm
                </Button>
                <Button className={cx('custom')} primary>
                    Sản phẩm mới
                </Button>
                {/* <Button className={cx('custom')} primary>
                    Giới thiệu
                </Button> */}
                <Button className={cx('custom')} primary>
                    Tin tức
                </Button>
                <Button to={path.CONNTACT} className={cx('custom')} primary>
                    Liên hệ
                </Button>
            </nav>
        </div>
    );
}

export default memo(Navigation);
