import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCartPlus, faSignOut, faTableList } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Button';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Search from '../Search';
import FormLogin from '~/components/Form/FormLogin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { clearMessage, logout } from '~/Redux/user/userSlice';
import { getCurrent } from '~/Redux/user/asyncActions';
import Swal from 'sweetalert2';
import path from '~/ultils/path';

const cx = classNames.bind(styles);

function Header() {
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoggedIn, current, message} = useSelector(state => state.user)

    useEffect(() => {
        if(isLoggedIn) dispatch(getCurrent());
    },[dispatch, isLoggedIn])

    const hanleShowForm = () => {
        setShowForm(true);
    };

    const logoutHandle = () => {
        dispatch(logout());
        navigate('/');
    }

    useEffect(() => {
        if(message) Swal.fire("Oops!", message, 'info').then((rs) => {
            if(rs.isConfirmed){
                dispatch(clearMessage)
            }
        })
    }, [])


    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={path.HOME} className={cx('box-logo')}>
                    <img className={cx('logo')} src={images.logo} alt="Logo watchstore" />
                </Link>

                <Search />

                <div className={cx('action')}>
                    {isLoggedIn && current ? (
                        <div>
                            <Tippy
                                hideOnClick
                                trigger="click"
                                interactive={true}
                                placement="bottom-start"
                                render={(attrs) => (
                                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                                        <PopperWrapper className={cx('menu-popper')}>
                                            <Button className={cx('menu-item')} leftIcon={<FontAwesomeIcon icon={faUser} />}  to={path.ACCOUNT}>Tài khoản của tôi</Button>
                                            <Button className={cx('menu-item')} leftIcon={<FontAwesomeIcon icon={faTableList} />} to={path.ORDER}>Đơn hàng</Button>
                                            <Button className={cx('menu-item')} leftIcon={<FontAwesomeIcon icon={faSignOut} />} onClick={logoutHandle} >Đăng xuất</Button>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                            <div className={cx('btn-header')}>
                                <Button
                                    primary
                                    className={cx('custom-btn')}
                                    rightIcon={<FontAwesomeIcon icon={faCaretDown} />}
                                >
                                    {current?.name}
                                </Button>
                            </div>
                            </Tippy>
                        </div>
                    ) : (
                        <>
                            <Button primary className={cx('custom-btn')} onClick={hanleShowForm}>
                                Đăng nhập
                            </Button>
                        </>
                    )}

                    <Link className={cx('cart')} to={path.CART}>
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span className={cx('number-item')}>{current?.cart?.length || 0}</span>
                    </Link>
                </div>
            </div>
            {showForm && <FormLogin isClose={setShowForm}/>}
        </header>
    );
}

export default Header;
