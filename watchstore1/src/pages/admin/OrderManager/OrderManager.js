import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch, } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getOrderById } from './OrderServer';
import moment from 'moment';
import OrderDialog from './OrderDialog';
import queryString from 'query-string';
import Pagination from '~/pages/components/Pagination';
import { apiGetOrder } from '~/apis/product';
import UpdateOrder from './UpdateOrder';


const cx = classNames.bind(styles);


function OrderManager() {
    const [dataOrder, setDataOrder] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [orderById, setOrderById] = useState({});
    const [reLoad, setReLoad] = useState(false);
    const [pagination, setPagination] = useState({});
    const [editOrder, setEditOrder] = useState(null);

    const [filters, setFilters] = useState({
        limit: 5,
        page: 1,
    })

    useEffect(() => {
         const fetchOrder = async() => {
            const response = await apiGetOrder(filters);
            const {orders, pagination} = response
            console.log(orders);
            setDataOrder(orders)
            setPagination(pagination);
         }
         fetchOrder();
    },[reLoad, filters])

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        })
    }

    const handleEdit = async(id) => {
        try {
            const edit = await getOrderById(id);
            setOrderById(edit?.data);
        } catch (error) {
            console.log(error);
        }
    setShowDialog(true);
}


    const handleCompareDate = (updatedAt, createdAt) => {
        const update = createdAt === updatedAt ? '' : moment(updatedAt).format("DD/MM/YYYY h:mm a");
        return update;
    }

    const handleEditOrder = (order) => {
        setEditOrder(order);
    }

    return ( 
        <div className={cx('wrapper')}>
            { editOrder && (
            <div className={cx('update')}>
                <UpdateOrder editOrder={editOrder} setEditOrder={setEditOrder} />
            </div>
            )
            }
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách đơn hàng</h2>
                <div className={cx('header')}>
                    {/* <Button className={cx('btn')}>Thêm mới</Button> */}
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm" />
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
                            dataOrder?.length !== 0 ? 
                            dataOrder?.map((order,index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col4')}><p className={cx('code')}>{index + 1}</p></td>
                                <td className={cx('cus-col4')}><p className={cx('code')}>{order._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{order.name}</p></td>
                                <td className={cx('cus-col2')}><p className={cx('code')}>{order.phone}</p></td>
                                <td className={cx('cus-col1', 'custom-col')}><p onClick={() => handleEditOrder(order)} className={cx('status', 'order')}>{order.status}</p></td>
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
                                        <span onClick={() => handleEdit(order._id)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                    </div>
                                </td>
                            </tr>
                            ))
                            :(<></>)
                        }
                    </tbody>
                </table>
                {
                    showDialog && 
                    <OrderDialog 
                    reLoad={setReLoad} 
                    isClose={setShowDialog}
                    isOpen={showDialog}
                    data={orderById}
                    setData={setOrderById}
                    />
                }
            </div>
            <div className={cx('pagination')}>
                <Pagination pagination={pagination} onPageChange={handlePageChange}/>
            </div>
        </div>
     );
}

export default OrderManager;