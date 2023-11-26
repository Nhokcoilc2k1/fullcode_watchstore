import classNames from "classnames/bind";
import styles from './Toast.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ToastMessage({tittle = false, message, type, duration = 3000}) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('toast', `toast--${type}`)}>
                <div className={cx('toast-icon')}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <div className={cx('toast-body')}>
                    <h3 className={cx('toast-tittle')}>{tittle}</h3>
                    <p className={cx('toast-msg')}>{message}</p>
                </div>
                <div className={cx('toast-close')}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
        </div>
     );
}

export default ToastMessage;