// import classNames from "classnames/bind";
// import styles from '../Order.module.scss'
// import Button from "~/components/Button";
// import OverLay from "~/pages/components/OverLay";
// import { deleteOrder } from "~/Redux/Reducers/OrderSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { memo } from "react";

// const cx = classNames.bind(styles);

// function DialogDelOrder({isClose, orderId}) {
//     const dispatch = useDispatch();

//     const  orderDelete = useSelector((state) => state.orderDelete);
//     const {success} = orderDelete;

//     const handleDelete = () => {
//         dispatch(deleteOrder(orderId));
//         if(success){
//             isClose(false);
//         }
//     }

//     return ( 
//         <OverLay>
//             <div className={cx('box-del')}>
//                 <p>Bạn có muốn xóa đơn hàng này không</p>
//                 <div className={cx('btn-del')}>
//                     <Button onClick={() => isClose(false)} className={cx('btn-cancel')}>Hủy</Button>
//                     <Button onClick={handleDelete} className={cx('btn-agree')}>Đồng ý</Button>
//                 </div>
//             </div>
//         </OverLay>

//      );
// }

// export default memo(DialogDelOrder);