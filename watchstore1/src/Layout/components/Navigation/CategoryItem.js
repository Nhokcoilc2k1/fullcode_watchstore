import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';
import { createSlug } from '~/ultils/helpers';

const cx = classNames.bind(styles);

function CategoryItem({ data }) {

    return (
        <div className={cx('cate-list')}>
            {/* <h5>{title}</h5> */}
            <div>
                {data.map((el, index) => (
                    <a  
                        key={createSlug(el.name)} 
                        href={`${el.name}`}
                        className={cx('cate-item')}
                    >
                        {el.name}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default CategoryItem;
