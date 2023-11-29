import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Header />
                <Navigation />
            </div>
            <div >{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
