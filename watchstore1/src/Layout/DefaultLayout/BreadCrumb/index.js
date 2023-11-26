import classNames from 'classnames/bind';
import styles from './BreadCrumb.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function BreadCrumb() {
    const location = useLocation();

    let currentLink = '';

    const crumbs = location.pathname.split('/').filter((crumb) => crumb !== '');
    return (
        <div className={cx('wrapper')}>
            <nav className={cx('box')}>
                <Link className={cx('link')} to="/">
                    Trang chủ{' '}
                </Link>
                {crumbs.map((crumb, index) => {
                    const last = index === crumbs.length - 1;
                    currentLink += `/${crumb}`;
                    return (
                        <div key={crumb} className={cx('breadcrumb')}>
                            {last ? (
                                <Fragment>
                                    <span>/</span>
                                    <span className={cx('sublink')}>{crumb}</span>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <span>/</span>
                                    <Link to={currentLink} className={cx('sublink', 'link')}>
                                        {crumb}
                                    </Link>
                                </Fragment>
                            )}
                        </div>

                        // <Link to={currentLink} key={crumb} className={cx('sublink')}>
                        //     {crumb}
                        // </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default BreadCrumb;
