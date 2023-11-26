import classNames from 'classnames/bind';
import styles from './IntroduceInfoProduct.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function IntroSelectSize() {
    return (
        <div className={cx('box-size')}>
            <p>
                Sở thích của mỗi người là khác nhau, có người tay nhỏ nhưng lại thích đeo đồng hồ size to, có người tay
                to nhưng lại thích đeo đồng hồ size nhỏ, nhưng để đeo 1 chiếc đồng hồ mang tính thẩm mỹ nhất thì bạn
                cũng nên tham khảo cách lựa size đồng hồ dưới đây nhé:
            </p>
            <p className={cx('title')}>
                <strong>Bước 1:</strong>Đo size cổ tay
            </p>
            <img className={cx('img1')} src={images.size1} alt="ảnh đo size 1" />
            <p className={cx('title')}>
                <strong>Bước 2:</strong>Tham chiếu size cổ tay của bạn để chọn size mặt đồng hồ phù hợp dưới đây
            </p>
            <img className={cx('img2')} src={images.size2} alt="ảnh đo size 2" />
        </div>
    );
}

export default IntroSelectSize;
