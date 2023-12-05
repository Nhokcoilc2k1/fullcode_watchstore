import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch, } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { apiGetOrder } from '~/apis/product';
import UpdateOrder from './UpdateOrder';
import { Pagination } from '~/Layout/components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { handleCompareDate } from '~/ultils/helpers';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function OrderManager() {
    const [dataOrder, setDataOrder] = useState();
    const [reLoad, setReLoad] = useState(false);
    const [editOrder, setEditOrder] = useState(null);
    const [queries, setQueries] = useState({
        q: ""
    })

    const [params] = useSearchParams();
    const fetchOrder = async(params) => {
        const response = await apiGetOrder({...params, limit:process.env.REACT_APP_LIMIT })
        if(response.success) setDataOrder(response)
     }

    const queriesDebounced = useDebounce(queries.q, 800);

    useEffect(() => {
         const queries= Object.fromEntries([...params])
         if(queriesDebounced){
            queries.q = queriesDebounced
             delete queries.page 
         }
         fetchOrder(queries);
    },[queriesDebounced, params, reLoad])

    const handleInputSearch = (e) => {
        setQueries({...queries, q: e.target.value})
    }

    const render = useCallback(() => {
        setReLoad(!reLoad);
   },[reLoad]);

    return ( 
        <div className={cx('wrapper')}>
            { editOrder && (
            <div className={cx('update')}>
                <UpdateOrder editOrder={editOrder} setEditOrder={setEditOrder} render={render} />
            </div>
            )
            }
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách đơn hàng</h2>
                <div className={cx('header')}>
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm đơn hàng theo tên và số điện thoại" value={queries.q} onChange={handleInputSearch}/>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
                <table className={cx('table')}>
                    <thead className={cx('t-header')}>
                        <tr>
                        <th>
                                <p className={cx('title')}>STT</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Mã đơn hàng</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Tên khách hàng</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Số điện thoại</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Trạng thái</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Sản phẩm</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Thanh toán</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Ngày tạo</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Ngày sửa</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Thao tác</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataOrder?.orders?.length !== 0 ? 
                            dataOrder?.orders?.map((order,index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col4')}><p className={cx('code')}>{index + 1}</p></td>
                                <td className={cx('cus-col4')}><p className={cx('code')}>{order._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{order.name}</p></td>
                                <td className={cx('cus-col2')}><p className={cx('code')}>{order.phone}</p></td>
                                <td className={cx('cus-col1', 'custom-col')}>
                                    <p 
                                        onClick={() => setEditOrder(order)} 
                                        className={cx('status', 'order', order.status === 'Đã giao hàng' ? 'payed' : '', order.status === 'Đã hủy' ? 'cancel-o' : '')}
                                    >{order.status}</p>
                                </td>
                                <td>
                                    {order.products.map((item, index) => (
                                        <p key={index} className={cx('name')}>{item.name}</p>
                                    ))}
                                </td>
                                <td className={cx('cus-col1', 'custom-col')}><p className={cx('pay','status', order.isPaid === 'Đã thanh toán' ? 'payed' : '')}>{order.isPaid}</p></td>
                                <td className={cx('cus-col2')}><p className={cx('date')}>{moment(order.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col3')}><p className={cx('date')}>{handleCompareDate(order.updatedAt, order.createdAt)}</p></td>
                                <td className={cx('cus-col4')}>
                                    <div className={cx('action')}>
                                        <span onClick={() => setEditOrder(order)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                    </div>
                                </td>
                            </tr>
                            ))
                            :(<></>)
                        }
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <Pagination totalCount={dataOrder?.pagination?.counts} />
            </div>
        </div>
     );
}

export default OrderManager;