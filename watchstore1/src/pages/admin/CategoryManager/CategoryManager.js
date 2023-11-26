import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import {updateCategory } from './CategoryServer';
import CategoryDialog from './CategoryDialog';
import CategoryDelete from './CategoryDelete';
import Status from '../components/Status';
import ToastMessage from '~/components/ToastMessage';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '~/pages/components/Pagination';

const cx = classNames.bind(styles);

function CategoryManager() {
    const [categoryData, setCategoryData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [cateById, setCateById] = useState({});
    const [deleteId, setDeleteId] = useState()
    const [reLoad, setReLoad] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
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
        setCateById(data);
        setShowDialog(true);
    }

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    }

    const handleCompareDate = (updatedAt, createdAt) => {
        const update = createdAt === updatedAt ? '' : moment(updatedAt).format("DD/MM/YYYY h:mm a");
        return update;
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách danh mục</h2>
                <div className={cx('header')}>
                    <Button onClick={() => setShowDialog(true)} className={cx('btn')}>Thêm mới</Button>
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
                                        <span onClick={() => handleDelete(category._id)} className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                                <td className={cx('cus-col1')}><p className={cx('code')}>{category._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{category.name}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('image-cate')}><img src={category.image} alt={category.description} /></p></td>
                                <td className={cx('cus-col1')}><p className={cx('status')}><Status data={category} update={updateCategory} /></p></td>
                                <td className={cx('cus-col1')}><p className={cx('date')}>{moment(category.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('date')}>{handleCompareDate(category.updatedAt, category.createdAt)}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showDialog && 
                    <CategoryDialog 
                        isOpen={showDialog}
                        isClose={setShowDialog}
                        data={cateById}
                        setData={setCateById}
                        reLoad={setReLoad}
                        showToast={setShowToast1}
                    />}

                {showDelete && 
                    <CategoryDelete 
                        isOpen={showDelete}
                        isClose={setShowDelete}
                        data={deleteId}
                        reLoad={setReLoad}
                        showToast={setShowToast2}
                    />
                    }
            </div>
            <div className={cx('pagination')}>
                <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </div>
            {showToast1 && 
                <ToastMessage tittle={"Thành công!"} message={"Thêm danh mục thành công."} type={"success"} duration={5000} />
            }
            {showToast2 && 
                <ToastMessage tittle={"Thành công!"} message={"Xóa danh mục thành công."} type={"success"} duration={5000} />
            }
        </div>
     );
}

export default CategoryManager;