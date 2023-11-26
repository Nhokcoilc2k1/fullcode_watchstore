import classNames from 'classnames/bind';
import styles from '../DefaultLayout/DefaultLayout.module.scss';

import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Slide from './Slide';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '~/Redux/app/asyncActions';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
     }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <Navigation />
            <Slide />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
