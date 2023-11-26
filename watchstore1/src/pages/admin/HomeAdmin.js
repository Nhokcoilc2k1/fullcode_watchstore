import classNames from "classnames/bind";
import styles from './admin.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faElementor, faFirstOrder, faFirstOrderAlt, faProductHunt, faStumbleupon, faStumbleuponCircle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { faCircleRadiation, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function HomeAdmin() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('box-header')}>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'blue')}  icon={faProductHunt} />
                    <div className={cx('box-name')}>
                        <p>Tổng số sản phẩm</p>
                        <p className={cx('box-num')}>6</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'brown')}  icon={faElementor} />
                    <div className={cx('box-name')}>
                        <p>Tổng số nhãn hiệu</p>
                        <p className={cx('box-num')}>6</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'violet')}  icon={faStumbleuponCircle} />
                    <div className={cx('box-name')}>
                        <p>Tổng số bài viết</p>
                        <p className={cx('box-num')}>6</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
            </div>
            <div className={cx('box-header')}>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'green')}  icon={faFirstOrderAlt} />
                    <div className={cx('box-name')}>
                        <p>Tổng số đơn hàng</p>
                        <p className={cx('box-num')}>6</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'red')}  icon={faUserCircle} />
                    <div className={cx('box-name')}>
                        <p>Tổng số người dùng</p>
                        <p className={cx('box-num')}>6</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'orange')}  icon={faCircleRadiation} />
                    <div className={cx('box-name')}>
                        <p>Tổng số danh mục</p>
                        <p className={cx('box-num')}>6</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
            </div>
            <div>
                

            </div>
        </div>
     );
}

export default HomeAdmin;