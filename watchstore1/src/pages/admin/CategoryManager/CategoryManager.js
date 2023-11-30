import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '~/pages/components/Pagination';
import SwitchCategory from './SwitchCategory';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { apiDeleteCategory } from '~/apis';

const cx = classNames.bind(styles);

function CategoryManager() {
    const [categoryData, setCategoryData] = useState([]);
    const [reLoad, setReLoad] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [pagination, setPagination] = useState({});

    const [filters, setFilters] = useState({
        limit: 4,
        page: 1,
    })

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const paramString = queryString.stringify(filters);
                const requestUrl = `http://localhost:5000/api/categorys?${paramString}`;
                const response = await fetch(requestUrl);
                const responseJson = await response.json();
                const {categorys , pagination} = responseJson;
                setCategoryData(categorys);
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

    useEffect(() => {
        if(!searchValue){
            setReLoad((prev) => !prev);
            return;
        }
        fetch(`http://localhost:5000/api/categorys/search/${searchValue}`)
            .then(res => res.json())
            .then(res => setCategoryData(res))
    },[searchValue])

    const handleEdit = (data) => {

    }

    const handleCompareDate = (updatedAt, createdAt) => {
        const update = createdAt === updatedAt ? '' : moment(updatedAt).format("DD/MM/YYYY h:mm a");
        return update;
    }

    const render = useCallback(() => {
        setReLoad(!reLoad);
    },[reLoad])

    const handleDelete = async(cid, name) => {
        Swal.fire({
            title: 'Xóa danh mục',
            text: `Bạn chắc chắn muốn xóa danh mục ${name}`, 
            icon: 'warning',
            showCancelButton: true,
        }).then(async(rs) => {
            if(rs.isConfirmed){
                const response = await apiDeleteCategory(cid);
                if(response.success){
                    toast.success(response.message)
                    setReLoad(!reLoad);
                }
                else toast.error(response.message);
            }
        })       
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách danh mục</h2>
                <div className={cx('header')}>
                    {/* <Button onClick={() => setShowDialog(true)} className={cx('btn')}>Thêm mới</Button> */}
                    <div className={cx('search')}>
                        <input value={searchValue} placeholder="Tìm kiếm" onChange={e => setSearchValue(e.target.value)}/>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
                <table className={cx('table')}>
                    <thead className={cx('t-header')}>
                        <tr>
                            <th><p className={cx('title')}>Thao tác</p></th>
                            <th><p className={cx('title')}>Mã danh mục</p></th>
                            <th><p className={cx('title')}>Tên danh mục</p></th>
                            <th><p className={cx('title')}>Ảnh danh mục</p></th>
                            <th><p className={cx('title')}>Trạng thái</p></th>
                            <th><p className={cx('title')}>Ngày tạo</p></th>
                            <th><p className={cx('title')}>Ngày sửa</p></th>
                        </tr>
                    </thead>
                    <tbody>
                    {categoryData.map((category, index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col')}>
                                    <div className={cx('action')}>
                                        <span onClick={() => handleEdit(category)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                        <span onClick={() => handleDelete(category._id, category.name)} className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                                <td className={cx('cus-col1')}><p className={cx('code')}>{category._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{category.name}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('image-cate')}><img src={category.image} alt={category.description} /></p></td>
                                <td className={cx('cus-col1')}><p className={cx('status')}><SwitchCategory cid={category._id} status={category.status} render={render} /></p></td>
                                <td className={cx('cus-col1')}><p className={cx('date')}>{moment(category.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('date')}>{handleCompareDate(category.updatedAt, category.createdAt)}</p></td>
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

export default CategoryManager;