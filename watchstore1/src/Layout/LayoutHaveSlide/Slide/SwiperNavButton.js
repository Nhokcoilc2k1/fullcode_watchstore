import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSwiper } from 'swiper/react';

const cx = classNames.bind(styles);

function SwiperNavButton() {
    const swiper = useSwiper();
    return (
        <div className={cx('swiper-nav-btns')}>
            <div className={cx('prev-btn')} onClick={() => swiper.slidePrev()}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className={cx('next-btn')} onClick={() => swiper.slideNext()}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    );
}

export default SwiperNavButton;
