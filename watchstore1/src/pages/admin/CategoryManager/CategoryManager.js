import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import SwitchCategory from './SwitchCategory';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { apiDeleteCategory, apiGetCategory } from '~/apis';
import UpdateCategory from './UpdateCategory';
import { Pagination } from '~/Layout/components/Pagination';
import { handleCompareDate } from '~/ultils/helpers';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function CategoryManager() {
    const [categoryData, setCategoryData] = useState([]);
    const [reLoad, setReLoad] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [queries, setQueries] = useState({
        q: ""
    })

    const [params] = useSearchParams();

    const fetchCateggory = async(params) => {
        const response = await apiGetCategory({...params, limit : process.env.REACT_APP_LIMIT })
        console.log(response);
        if(response.success) setCategoryData(response)
    }

    const queriesDebounced = useDebounce(queries.q, 800);

    useEffect(() => {
        const queries= Object.fromEntries([...params])
         if(queriesDebounced) {
            queries.q = queriesDebounced
            delete queries.page
         }
        fetchCateggory(queries);
    },[queriesDebounced, params, reLoad])

    const handleInputSearch = (e) => {
        setQueries({...queries, q: e.target.value})
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
             { editCategory && (
                    <div className={cx('update')}>
                        <UpdateCategory editCategory={editCategory} setEditCategory={setEditCategory} render={render} />
                    </div>
                )
            }
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách danh mục</h2>
                <div className={cx('header')}>
                    <div className={cx('search')}>
                        <input  placeholder="Tìm kiếm danh mục theo tên..." value={queries.q} onChange={handleInputSearch} />
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
                    {categoryData?.categorys?.map((category, index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col')}>
                                    <div className={cx('action')}>
                                        <span onClick={() => setEditCategory(category)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
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
                <Pagination totalCount={categoryData?.pagination?.counts} />
            </div>
        </div>
     );
}

export default CategoryManager;