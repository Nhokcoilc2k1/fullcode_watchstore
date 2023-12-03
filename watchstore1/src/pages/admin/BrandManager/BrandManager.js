import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';
import SwitchBrand from './SwitchBrand';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { apiDeleteBrand, apiGetBrand } from '~/apis/brand';
import UpdateBrand from './UpdateBrand';
import { handleCompareDate } from '~/ultils/helpers';
import { Pagination } from '~/Layout/components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function BrandManager() {
    const [brandResult, setBrandResult] = useState([]);
    const [reload, setReLoad] = useState(false);
    const [editBrand, setEditBrand] = useState(null);
    const [queries, setQueries] = useState({
        q: ""
    })

    const [params] = useSearchParams();
    const queriesDebounced = useDebounce(queries.q, 800);
 
    const fetchBrand= async(params) => {
        const response = await apiGetBrand({...params, limit : process.env.REACT_APP_LIMIT })
        if(response.success) setBrandResult(response)
    }

    useEffect(() => {
        const queries= Object.fromEntries([...params])
         if(queriesDebounced){
             queries.q = queriesDebounced
             delete queries.page     
         }
        fetchBrand(queries);
    }, [queriesDebounced, params ]);


    const handleDelete = async(cid, name) => {
        Swal.fire({
            title: 'Xóa nhãn hiệu',
            text: `Bạn chắc chắn muốn xóa nhãn hiệu ${name}`, 
            icon: 'warning',
            showCancelButton: true,
        }).then(async(rs) => {
            if(rs.isConfirmed){
                const response = await apiDeleteBrand(cid);
                if(response.success){
                    toast.success(response.message)
                    setReLoad(!reload)
                }
                else toast.error(response.message);
            }
        })       
    }

    const handleInputSearch = (e) => {
        setQueries({...queries, q: e.target.value})
    }


    const render = useCallback(() => {
        setReLoad(!reload);
   },[reload]);


    return (
        <div className={cx('wrapper')}>
             { editBrand && (
                    <div className={cx('update')}>
                        <UpdateBrand editBrand={editBrand} setEditBrand={setEditBrand} render={render} />
                    </div>
                )
            }
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách nhãn hiệu</h2>
                <div className={cx('header')}>
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm nhãn hiệu theo tên..." value={queries.q} onChange={handleInputSearch} />
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
                <table className={cx('table')}>
                    <thead className={cx('t-header')}>
                        <tr>
                            <th><p className={cx('title')}>Thao tác</p></th>
                            <th><p className={cx('title')}>Mã nhãn hiệu</p></th>
                            <th><p className={cx('title')}>Tên nhãn hiệu</p></th>
                            <th><p className={cx('title')}>Ảnh nhãn hiệu</p></th>
                            <th><p className={cx('title')}>Trạng thái</p></th>
                            <th><p className={cx('title')}>Ngày tạo</p></th>
                            <th><p className={cx('title')}>Ngày sửa</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {brandResult?.brands?.map((brand, index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col')}>
                                    <div className={cx('action')}>
                                        <span onClick={() => setEditBrand(brand)}  className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                        <span onClick={() => handleDelete(brand._id, brand.name)} className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                                <td className={cx('cus-col')}><p className={cx('code')}>{brand._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{brand.name}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('image')}><img src={brand.image} alt={brand.description} /></p></td>
                                <td className={cx('cus-col1')}><p className={cx('status')}><SwitchBrand data={brand} /></p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{moment(brand.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{handleCompareDate(brand.updatedAt, brand.createdAt)}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <Pagination totalCount={brandResult?.pagination?.counts} />
            </div>
        </div>
    );
            
}

export default BrandManager;
