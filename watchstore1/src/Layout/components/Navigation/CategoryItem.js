import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';
import { createSlug } from '~/ultils/helpers';

const cx = classNames.bind(styles);

function CategoryItem({ data }) {

    return (
        <div className={cx('cate-list')}>
            {/* <h5>{title}</h5> */}
            <div>
                {data.map((el, index) => (
                    // key={createSlug(el.title)}
                    // to={createSlug(el.title)}
                    <NavLink  
                        key={createSlug(el.name)} 
                        to={el.name}
                        className={cx('cate-item')}
                    >
                        {el.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default CategoryItem;
