import classNames from 'classnames/bind';
import styles from '../admin.module.scss';

import OverLay from '../../components/OverLay';
import { deleteBrandById } from './BrandServer';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function BrandDelete({setShowDelete,showToast, brandID, setReLoad}) {

    const handleDelete = async() => {
        
        try {
            const result  = await deleteBrandById(brandID);
            if(result){
                showToast((prev) => !prev)
            }
            setReLoad((prev) => !prev);
            setShowDelete(false);
        } catch (error) {
            console.log(error);
        }
  
    }

    return ( 
        <OverLay>
            <div className={cx('form-delete')}>
                <h2>Xóa nhãn hiệu</h2>
                <p>Bạn có muốn xóa nhãn hiệu này không</p>
                <div className={cx('btn-form')}>
                    <Button onClick={() => setShowDelete(false)} className={cx('cancel')} >Không</Button>
                    <Button onClick={handleDelete} className={cx('save')}>Đồng ý</Button>
                </div>
            </div>
        </OverLay>
     );
}

export default BrandDelete;