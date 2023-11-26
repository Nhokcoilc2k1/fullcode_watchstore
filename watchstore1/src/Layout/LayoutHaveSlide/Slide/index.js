import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import slides from '~/assets/data/Slide';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperNavButton from './SwiperNavButton';

const cx = classNames.bind(styles);

function Slide() {
    return (
        <div className={cx('wrapper')}>
            <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{ clickable: true }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <img src={slide.url} alt={slide.title} />
                    </SwiperSlide>
                ))}
                <SwiperNavButton />
            </Swiper>
        </div>
    );
}

export default Slide;
