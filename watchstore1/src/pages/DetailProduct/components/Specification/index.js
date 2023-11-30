import classNames from 'classnames/bind';
import styles from './Specification.module.scss';

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

function Specification({ data }) {
    const RowTable = ({ data, children }) => {
        return (
            <tr className={cx('row')}>
                <td className={cx('specname')}>{children}</td>
                <td className={cx('specvalue')}>{data}</td>
            </tr>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <h4>Thông số Olym Pianus OP990-45ADGS-GL-X</h4>
            <table className={cx('parameter-list')}>
                <tbody>
                    <RowTable data={specification.machineline}>Dòng máy</RowTable>
                    <RowTable data={specification.materialwire}>Chất liệu dây</RowTable>
                    <RowTable data={specification.materialglass}>Chất liệu kính</RowTable>
                    <RowTable data={specification.waterresistance}>Kháng nước</RowTable>
                    <RowTable data={specification.facesize}>Size mặt</RowTable>
                    <RowTable data={specification.materialsell}>Chất liệu vỏ</RowTable>
                    <RowTable data={specification.shape}>Hình dạng</RowTable>
                    <RowTable data={specification.colorsell}>Màu vỏ</RowTable>
                    <RowTable data={specification.feature}>Tính năng</RowTable>
                    <RowTable data={specification.colorface}>Màu mặt</RowTable>
                </tbody>
            </table>
        </div>
    );
}

export default Specification;
