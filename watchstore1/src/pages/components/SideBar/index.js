import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import CheckboxItem from './CheckBoxItem';
import { brands } from '~/assets/data/Brand';

const cx = classNames.bind(styles);

const filterPrice = [
    {
        id: 1,
        desc: 'dưới 3 triệu',
    },
    {
        id: 2,
        desc: '3 - 6 triệu',
    },
    {
        id: 3,
        desc: '6 - 12 triệu',
    },
    {
        id: 4,
        desc: '12 - 35 triệu',
    },
    {
        id: 5,
        desc: '35 - 100 triệu',
    },
];

const used = [
    {
        id: 1,
        desc: 'Nam',
    },
    {
        id: 2,
        desc: 'Nữ',
    },
];

function SideBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box')}>
                <h4 className={cx('title')}>Đối tượng sử dụng</h4>
                <CheckboxItem data={used} />
            </div>
            <div className={cx('box')}>
                <h4 className={cx('title')}>Giá</h4>
                <CheckboxItem data={filterPrice} />
            </div>
            <div className={cx('box')}>
                <h4 className={cx('title')}>Thương hiệu</h4>
                <CheckboxItem data={brands} />
            </div>
        </div>
    );
}

export default SideBar;
