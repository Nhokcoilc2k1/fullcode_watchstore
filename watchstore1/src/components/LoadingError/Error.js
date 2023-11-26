import classNames from 'classnames/bind';
import styles from './LoadingError.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Error({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <FontAwesomeIcon className={cx('icon')} icon={faCircleXmark} />
            <span>{children}</span>
        </div>
     );
}

export default Error;