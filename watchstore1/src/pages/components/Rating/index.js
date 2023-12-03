import classNames from 'classnames/bind';
import styles from './Rating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegurlar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const RatingShow = ({ value, text, className }) => {
    const classes = cx('wrapper', {
        [className]: className,
    });
    return (
        <div className={classes}>
            {value >= 1 ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={faStarRegurlar} />}

            {value >= 2 ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={faStarRegurlar} />}

            {value >= 3 ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={faStarRegurlar} />}

            {value >= 4 ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={faStarRegurlar} />}

            {value >= 5 ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={faStarRegurlar} />}

            <p className={cx('number-star')}>{text}</p>
        </div>
    );
};

export default RatingShow;
