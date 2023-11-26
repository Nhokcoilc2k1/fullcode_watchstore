import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import {getBrandById, updateBrand } from './BrandServer';
import BrandDialog from './BrandDialog';
import BrandDelete from './BrandDelete';
import Status from '../components/Status';
import ToastMessage from '~/components/ToastMessage';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '~/pages/components/Pagination';

const cx = classNames.bind(styles);

function BrandManager() {
    const [brandResult, setBrandResult] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [reload, setReLoad] = useState(false);
    const [brandById, setBrandById] = useState({});
    const [id, setId] = useState();

    const [searchValue, setSearchValue] = useState('');
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
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

    const handleCreate = () => {
        setShowDialog(true);
        setBrandById({});
    }

    const handleEdit = async(id) => {
            try {
                const edit = await getBrandById(id);
                setBrandById(edit?.data);
            } catch (error) {
                console.log(error);
            }
        setShowDialog(true);
    }
    
    const handleDelete = (brandID) => {
        setShowDelete(true);
        setId(brandID);
    }

    const handleCompareDate = (updatedAt, createdAt) => {
        const update = createdAt === updatedAt ? '' : moment(updatedAt).format("DD/MM/YYYY h:mm a");
        return update;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách nhãn hiệu</h2>
                <div className={cx('header')}>
                    <Button onClick={handleCreate} className={cx('btn')}>Thêm mới</Button>
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
                                        <span onClick={() => handleEdit(brand._id)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                        <span onClick={() => handleDelete(brand._id)} className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                                <td className={cx('cus-col')}><p className={cx('code')}>{brand._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{brand.name}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('image')}><img src={brand.image} alt={brand.description} /></p></td>
                                <td className={cx('cus-col1')}><p className={cx('status')}><Status data={brand} update={updateBrand} /></p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{moment(brand.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{handleCompareDate(brand.updatedAt, brand.createdAt)}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showDialog && (
                    <BrandDialog 
                        data={brandById}
                        setReLoad={setReLoad} 
                        isClose={setShowDialog}
                        isOpen={showDialog}
                        setBrand={setBrandById}
                        showToast={setShowToast1} />
                )}

                {showDelete && (
                    <BrandDelete
                        setShowDelete={setShowDelete}
                        brandID={id}
                        setReLoad={setReLoad}
                        showToast={setShowToast2}
                    />
                )}
            </div>
            <div className={cx('pagination')}>
                <Pagination pagination={pagination} onPageChange={handlePageChange}/>
            </div>
            {showToast1 && 
                <ToastMessage tittle={"Thành công!"} message={"Thêm nhãn hiệu thành công."} type={"success"} duration={5000} />
            }
            {showToast2 && 
                <ToastMessage tittle={"Thành công!"} message={"Xóa nhãn hiệu thành công."} type={"success"} duration={5000} />
            }
        </div>
    );
            
}

export default BrandManager;
