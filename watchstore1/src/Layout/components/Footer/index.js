import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-3')}>
                        <h4 className={cx('header')}>về cửa hàng</h4>
                        <h5 className={cx('title')}>Địa chỉ</h5>
                        <p>97 Trần Đại Nghĩa, P.Bách Khoa, HBT, Hà Nội</p>
                        <h5 className={cx('title')}>Số điện thoại</h5>
                        <p>093.189.2222</p>
                        <h5 className={cx('title')}>email</h5>
                        <p>hoanghungbhbylc@gmail.com</p>
                        <h5 className={cx('title')}>thời gian làm việc</h5>
                        <p>Thứ 2 - Chủ nhật/8.00AM-10.00PM</p>
                    </div>
                    <div className={cx('col', 'l-3')}>
                        <h4 className={cx('header')}>Thông tin</h4>
                        <a href="/" className={cx('link')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                            Trang chủ
                        </a>
                        <a href="/" className={cx('link')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                            Sản phẩm
                        </a>
                        <a href="/" className={cx('link')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                            Tin tức
                        </a>
                        <a href="/" className={cx('link')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                            Liên hệ
                        </a>
                    </div>
                    <div className={cx('col', 'l-3')}>
                        <h4 className={cx('header')}>hướng dẫn & chính sách</h4>
                        <a href="/" className={cx('link')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                            Hướng dẫn mua hàng
                        </a>
                        <a href="/" className={cx('link')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                            Chính sách đổi trả & hoàn tiền
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
