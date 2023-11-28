import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import RatingShow from '~/pages/components/Rating';
import moment from 'moment/moment';

const cx = classNames.bind(styles);

function Comment({ reviews, totalRating }) {
    return (
        <div>
            {reviews?.length === 0 && (
                <div className={cx('wrapper')}>
                    <h5 className={cx('name-user')}>Không có đánh giá nào</h5>
                </div>
            )}
           {reviews?.map((review) => (
             <div key={review._id} className={cx('wrapper')}>
                <h5 className={cx('name-user')}>{review.name}</h5>
                {/* <span className={cx('address-user')}>Hồ Chí Minh- Quận Tân Phú</span> */}
                <RatingShow value={totalRating} className={cx('custom-star')} /> 
                <p className={cx('content-comment')}>{review.comment}</p>
                <span className={cx('address-user')}>{moment(review.createdAt).calendar()}</span>
            </div>
           ))}
        </div>
    );
}

export default Comment;
