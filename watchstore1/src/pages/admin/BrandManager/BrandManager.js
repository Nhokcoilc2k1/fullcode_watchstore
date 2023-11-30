import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';
import queryString from 'query-string';
import Pagination from '~/pages/components/Pagination';
import SwitchBrand from './SwitchBrand';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { apiDeleteBrand } from '~/apis/brand';

const cx = classNames.bind(styles);

function BrandManager() {
    const [brandResult, setBrandResult] = useState([]);
    const [reload, setReLoad] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [pagination, setPagination] = useState({});

    const [filters, setFilters] = useState({
        limit: 5,
        page: 1,
    })

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const paramString = queryString.stringify(filters);
                const requestUrl = `http://localhost:5000/api/brands?${paramString}`;
                const response = await fetch(requestUrl);
                const responseJson = await response.json();
                const {brands,pagination} = responseJson;
                setBrandResult(brands);
                setPagination(pagination);
            } catch (error) {
                console.log(error);
            }
        }
         fetchApi();
        
    }, [reload, filters]);

    useEffect(() => {
        if(!searchValue){
            setReLoad((prev) => !prev);
            return;
        }

        fetch(`http://localhost:5000/api/brands/search/${searchValue}`)
            .then(res => res.json())
            .then(res => setBrandResult(res))
    },[searchValue]);

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        })
    }
    
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

    const handleCompareDate = (updatedAt, createdAt) => {
        const update = createdAt === updatedAt ? '' : moment(updatedAt).format("DD/MM/YYYY h:mm a");
        return update;
    }

    const render = useCallback(() => {
        setReLoad(!reload);
   },[reload]);

   console.log(brandResult);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách nhãn hiệu</h2>
                <div className={cx('header')}>
                    {/* <Button onClick={handleCreate} className={cx('btn')}>Thêm mới</Button> */}
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
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
                        {brandResult.map((brand, index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col')}>
                                    <div className={cx('action')}>
                                        <span  className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                        <span onClick={() => handleDelete(brand._id, brand.name)} className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                                <td className={cx('cus-col')}><p className={cx('code')}>{brand._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{brand.name}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('image')}><img src={brand.image} alt={brand.description} /></p></td>
                                <td className={cx('cus-col1')}><p className={cx('status')}><SwitchBrand bid={brand._id} status={brand.status} render={render} /></p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{moment(brand.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{handleCompareDate(brand.updatedAt, brand.createdAt)}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <Pagination pagination={pagination} onPageChange={handlePageChange}/>
            </div>
        </div>
    );
            
}

export default BrandManager;
