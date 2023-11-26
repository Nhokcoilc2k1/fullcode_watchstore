import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames/bind';
import styles from './LoadingError.module.scss';
const cx = classNames.bind(styles);

function Loading() {
    return ( 
        <div className={cx('box')}>
            <CircularProgress />
        </div>   
        
     );
}

export default Loading;