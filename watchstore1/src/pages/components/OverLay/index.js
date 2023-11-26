import classNames from 'classnames/bind';
import styles from './OverLay.module.scss';

const cx = classNames.bind(styles);

function OverLay({ children }) {
    return (
        <div className={cx('modal')}>
            <div className={cx('modal-overlay')}></div>
            <div className={cx('modal-body')}>{children}</div>
        </div>
    );
}

export default OverLay;
