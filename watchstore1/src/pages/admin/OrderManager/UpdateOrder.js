import classNames from "classnames/bind";
import styles from '../CreateProduct/CreateProduct.module.scss';
import { memo } from "react";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function UpdateOrder({editOrder, setEditOrder}) {

    const handleSubmit  = () => {

    }

    return ( 
        <div className={cx('wrapper', 'update-page')}>
        <div className={cx('inner')}>
            <div className={cx('box-header')}>
                <h2 className={cx('header-name')}>Cập nhật đơn hàng</h2>
                <Button onClick={() => setEditOrder(null)} className={cx('header-btn')}>Quay lại</Button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    
                   
                    <div className={cx('ctrl-create', 'update')}>
                        <Button type="submit" className={cx('control-btn', 'update-btn')}>
                            Cập nhật sản phẩm
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div> );
}

export default memo(UpdateOrder);