import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '~/pages/components/Pagination';
import { apiDeletePromotion } from '~/apis/promotion';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import SwitchPromo from './SwitchPromo';
import UpdatePromotion from './UpdatePromotion';

const cx = classNames.bind(styles);

function PromotionManager() {
    const [promoData, setPromoData] = useState([]);
    const [reLoad, setReload] = useState(true);
    const [pagination, setPagination] = useState({});
    const [editPromotion, setEditPromotion] = useState(null);

    const [filters, setFilters] = useState({
        limit: 5,
        page: 1,
    })

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const paramString = queryString.stringify(filters);
                const requestUrl = `http://localhost:5000/api/promotions?${paramString}`;
                const response = await fetch(requestUrl);
                const responseJson = await response.json();
                const {promotions , pagination} = responseJson;
                setPromoData(promotions)
                setPagination(pagination);
            } catch (error) {
                console.log(error);
            }
        }
         fetchApi();
    },[reLoad, filters])

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        })
    }

    const handleDelete = async(proid, name) => {
        Swal.fire({
            title: 'Xóa khuyến mãi',
            text: `Bạn chắc chắn muốn xóa khuyến mãi ${name}`, 
            icon: 'warning',
            showCancelButton: true,
        }).then(async(rs) => {
            if(rs.isConfirmed){
                const response = await apiDeletePromotion(proid);
                if(response.success){
                    toast.success(response.message)
                    setReload(prev => !prev)
                }
                else toast.error(response.message);
            }
        })       
    }

    const handleCompareDate = (updatedAt, createdAt) => {
        const update = createdAt === updatedAt ? '' : moment(updatedAt).format("DD/MM/YYYY h:mm a");
        return update;
    }

   const render = useCallback(() => {
        setReload(!reLoad);
   },[]);

    return ( 
        <div className={cx('wrapper')}>
            { editPromotion && (
            <div className={cx('update')}>
                <UpdatePromotion editPromotion={editPromotion} setEditPromotion={setEditPromotion} render={render} />
            </div>
            )
            }
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách khuyến mãi</h2>
                <div className={cx('header')}>
                    {/* <Button onClick={() => setShowDialog(true)} className={cx('btn')}>Thêm mới</Button> */}
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
                                <p className={cx('title')}>Thao tác</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Mã khuyến mãi</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Tên Khuyến mãi</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Mã giảm giá</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Giá trị giảm</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Ngày hết hạn</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Trạng thái</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Ngày tạo</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Ngày sửa</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {promoData.map((promo, index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col')}>
                                    <div className={cx('action')}>
                                        <span onClick={() => setEditPromotion(promo)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                        <span onClick={() => handleDelete(promo._id, promo.name)} className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                                <td className={cx('cus-col1')}><p className={cx('code')}>{promo._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{promo.name}</p></td>
                                <td className={cx('cus-col')}><p className={cx('name')}>{promo.coupon_code}</p></td>
                                <td className={cx('cus-col')}><p className={cx('name')}>{promo.discount_value}%</p></td>
                                <td className={cx('cus-col')}><p className={cx('name')}>{moment(promo.expired).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('status')}><SwitchPromo proid={promo._id} status={promo.status} render={render} /></p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{moment(promo.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{handleCompareDate(promo.updatedAt, promo.createdAt)}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </div>
        </div>
     );
}

export default PromotionManager;