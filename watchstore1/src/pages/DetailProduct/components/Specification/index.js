import classNames from 'classnames/bind';
import styles from './Specification.module.scss';
import { apiGetAttribute } from '~/apis/product';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const specification = {
    id: 1,
    machineline: 'Cơ/Automatic',
    materialwire: 'Dây cao su',
    materialglass: 'Kính Sapphire',
    waterresistance: '5atm',
    facesize: '42mm',
    materialsell: 'Vỏ thép không gỉ',
    shape: 'Mặt tròn',
    colorsell: 'Bạc',
    colorface: 'Mặt xanh',
    feature: 'Lịch thứ, Lịch ngày, Giờ, phút, giây',
};

function Specification({ pid , name}) {
    const [attribute, setAttribute] = useState([]);
    const RowTable = ({ data, children }) => {
        return (
            <div className={cx('row')}>
                <div className={cx('specname')} >{children}</div>
                <div className={cx('specvalue')}>{data}</div>
            </div>
        );
    };

    const fetchApi = async() => {
        const response = await apiGetAttribute(pid);
        if(response.success){
            setAttribute(response.attribute);
        }else return;
    }

    useEffect(() => {
        fetchApi();
    },[pid])

    return (
        <div className={cx('wrapper')}>
            <h4>{`Thông số ${name}`}</h4>
            <div className={cx('parameter-list')}>
                <RowTable data={attribute.machineSeri}>Dòng máy</RowTable>
                <RowTable data={attribute.wireMaterial}>Chất liệu dây</RowTable>
                <RowTable data={attribute.glassMaterial}>Chất liệu kính</RowTable>
                <RowTable data={attribute.waterResistant}>Kháng nước</RowTable>
                <RowTable data={attribute.faceSize}>Size mặt</RowTable>
                <RowTable data={attribute.shellMaterial}>Chất liệu vỏ</RowTable>
                <RowTable data={attribute.shape}>Hình dạng</RowTable>
                <RowTable data={attribute.shellColor}>Màu vỏ</RowTable>
                <RowTable data={attribute.feature}>Tính năng</RowTable>
                <RowTable data={attribute.faceColor}>Màu mặt</RowTable>
            </div>
            <input className={cx('more-btn')} type='checkbox' />
        </div>
    );
}

export default Specification;
