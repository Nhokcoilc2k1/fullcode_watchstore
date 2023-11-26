import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CheckboxItem({ data }) {
    const [checked, setChecked] = useState([]);

    const handleCheck = (id) => {
        setChecked(() => {
            const isChecked = checked.includes(id);

            if (isChecked) {
                return checked.filter((item) => item !== id);
            } else {
                return [id];
            }
        });
    };

    return (
        <div>
            {data.map((item) => (
                <div key={item.id} className={cx('group')}>
                    <input type="checkbox" checked={checked.includes(item.id)} onChange={() => handleCheck(item.id)} />
                    <label>{item.desc}</label>
                </div>
            ))}
        </div>
    );
}

export default CheckboxItem;
