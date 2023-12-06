import classNames from 'classnames/bind';
import styles from './LayoutAdmin.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faCaretDown,
    faCaretRight,
    faChevronDown,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminSidebar } from '~/ultils/contants';
import { logout } from '~/Redux/user/userSlice';
import Tooltip from '@mui/material/Tooltip';
// import { apiLogout } from '~/apis/user';

const cx = classNames.bind(styles);

function LayoutAdmin({ children }) {
    const [showNavBar, setShowNavBar] = useState(true);
    const [activeButton, setActiveButton] = useState(null);
    const [actived, setActived] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        dispatch(logout());
        // await apiLogout();
        navigate('/');
    }

    const handleShowTabs = (tabID) => {
        if(actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
        else setActived(prev => [...prev, tabID] )
    }

    const handleButtonClick = (id) => {
        setActiveButton(id === activeButton ? null : id);
    }

    return (
        <div className={cx('container')}>
            {showNavBar && (
                <aside className={cx('nav-bar')}>
                    <div className={cx('box-logo')}>
                        <Link to={'/'}>
                            <img className={cx('logo')} src={images.logo} alt="Logo watchstore" />
                        </Link>
                    </div>
                    <div className={cx('box-nav')}>
                        <div className={cx('info-ad')}>
                            <img src={images.user} alt="anh" />
                            <p>Hưng Hoàng</p>
                            <p>admin</p>
                            <div>
                                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                                <Tooltip title='Đăng xuất' placement="bottom" >
                                    <span><FontAwesomeIcon onClick={handleLogout} icon={faSignOut} className={cx('icon')} /></span>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={cx('control')}>
                            {
                                adminSidebar.map(el => (
                                    <Fragment key={el.id}>
                                        { el.type === 'SINGLE' && 
                                            <Button 
                                                to={el.path} 
                                                leftIcon={el.icon} 
                                                className={cx('nav-btn', activeButton === el.id ? 'active' : '')}
                                                onClick={() => handleButtonClick(el.id)}
                                            >
                                                {el.text}
                                            </Button>
                                        }
                                        { el.type === 'PARENT' && <div onClick={() => handleShowTabs(el.id)}>
                                            <button className={cx('nav-btn')}>
                                                <span>{el.icon}</span>
                                                <span className={cx('name-btn')}>{el.text}</span>
                                                {actived.some(id => id === el.id)
                                                    ? <span  className={cx('icon-btn')} ><FontAwesomeIcon icon={faCaretRight}/></span>
                                                    : <span  className={cx('icon-btn')} ><FontAwesomeIcon icon={faCaretDown}/></span>
                                                }
                                            </button>
                                            {actived.some(id => id === el.id) && <div >
                                                    {el.submenu.map((item, index) => 
                                                        <Button 
                                                            key={item.text} 
                                                            to={item.path} 
                                                            onClick={e => {e.stopPropagation(); handleButtonClick(item.text)}}
                                                            className={cx('sub-btn', activeButton === item.text ? 'active' : '')}
                                                        >
                                                            {item.text}
                                                        </Button>
                                                    )}
                                                </div>
                                            }
                                        </div>
                                        }
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                </aside>
            )}
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div onClick={() => setShowNavBar(!showNavBar)} className={cx('icon-bar')}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <div className={cx('box-admin')}>
                        <img className={cx('admin')} src={images.user} alt="anh" />
                        <Button className={cx('email')} >
                        {/* rightIcon={<FontAwesomeIcon icon={faChevronDown} />} */}
                            hoanghung@gmail.com
                            <span className={cx('note')}>administrator</span>
                        </Button>
                    </div>
                </div>
                <div className={cx('inner')}>{children}</div>
            </div>
        </div>
    );
}

export default LayoutAdmin;
