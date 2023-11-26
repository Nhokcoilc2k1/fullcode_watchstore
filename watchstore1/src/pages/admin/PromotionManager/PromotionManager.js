import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { deletePromoById } from './PromotionServer';
import PromotionDialog from './PromotionDialog';
import DialogDelete from '../components/DialogDelete';
import ToastMessage from '~/components/ToastMessage';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '~/pages/components/Pagination';

const cx = classNames.bind(styles);

function PromotionManager() {
    const [promoData, setPromoData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [reLoad, setReload] = useState(true);

    const [promoById, setPromoById] = useState({});
    const [deleteId, setDeleteId] = useState();
    const [pagination, setPagination] = useState({});

    const [filters, setFilters] = useState({
        limit: 2,
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

    const handleEdit = (promo) => {
        setShowDialog(true);
        setPromoById(promo)
    }

    const handleDelete = (promoId) => {
        setShowDelete(true);
        setDeleteId(promoId)
    }

    const handleCompareDate = (updatedAt, createdAt) => {
        const update = createdAt === updatedAt ? '' : moment(updatedAt).format("DD/MM/YYYY h:mm a");
        return update;
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách khuyến mãi</h2>
                <div className={cx('header')}>
                    <Button onClick={() => setShowDialog(true)} className={cx('btn')}>Thêm mới</Button>
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
                                        <span onClick={() => handleEdit(promo)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                        <span onClick={() => handleDelete(promo._id)} className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                                <td className={cx('cus-col1')}><p className={cx('code')}>{promo._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{promo.name}</p></td>
                                <td className={cx('cus-col')}><p className={cx('name')}>{promo.coupon_code}</p></td>
                                <td className={cx('cus-col')}><p className={cx('name')}>{promo.discount_value}</p></td>
                                <td className={cx('cus-col')}><p className={cx('name')}>{moment(promo.expired_at).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{moment(promo.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{handleCompareDate(promo.updatedAt, promo.createdAt)}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showDialog && 
                    <PromotionDialog 
                        isOpen={showDialog}
                        isClose={setShowDialog}
                        data={promoById}
                        setData={setPromoById}
                        reLoad={setReload}
                        showToast={setShowToast1}
                    />}
                {showDelete && 
                    <DialogDelete 
                        isOpen={showDelete}
                        isClose={setShowDelete}
                        data={deleteId}
                        reLoad={setReload}
                        fcDelete={deletePromoById}
                        showToast={setShowToast2}
                        tittle={"Xóa mã khuyến mãi"}
                        message={"Bạn có muốn xóa mã khuyến mãi này không?"}
                    />           
                }
            </div>
            <div className={cx('pagination')}>
                <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </div>
            {showToast1 && 
                <ToastMessage tittle={"Thành công!"} message={"Thêm mã khuyến mãi thành công."} type={"success"} duration={5000} />
            }
            {showToast2 && 
                <ToastMessage tittle={"Thành công!"} message={"Xóa mã khuyến mãi thành công."} type={"success"} duration={5000} />
            }
        </div>
     );
}

export default PromotionManager;