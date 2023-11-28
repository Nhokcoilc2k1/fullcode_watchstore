import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Status from '../components/Status';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '~/pages/components/Pagination';
import { apiDeleteUser, apiGetUsers, apiUpdateUserByAdmin } from '~/apis/user';
import { useDebounce } from '~/hooks';
import { render } from '@testing-library/react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function AccountManager() {
    const [reLoad, setReLoad] = useState(false);
    const [pagination, setPagination] = useState({});
    const [users, setUsers] = useState([]);
    const [queries, setQueries] = useState({
        q: ""
    })

    const [filters, setFilters] = useState({
        limit: 2,
        page: 1,
    })

    const fetchUsers = async(params) => {
        const response = await apiGetUsers(params)
        if(response.success) setUsers(response.users)
    }

    const debounced = useDebounce(queries.q, 800);

    useEffect(() => {
        // const fetchApi = async () => {
        //     try {
        //         const paramString = queryString.stringify(filters);
        //         const requestUrl = `http://localhost:5000/api/users?${paramString}`;
        //         const response = await fetch(requestUrl);
        //         const responseJson = await response.json();
        //         const {users,pagination} = responseJson;
        //         setUserData(users);
        //         setPagination(pagination);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        const params = {}
        if(debounced) params.q = debounced
         fetchUsers(params)
    },[debounced, reLoad])

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        })
    }

    const handleDelete = (uid, name) => {
        Swal.fire({
            title: 'Xóa người dùng',
            text: `Bạn chắc chắn muốn xóa người dùng ${name}?`,
            showCancelButton: true
        }).then(async(result) => {
            if(result.isConfirmed){
                const response = await apiDeleteUser(uid)
                if(response.success){
                    render();
                    toast.success(response.message)
                    setReLoad(prev => !prev)
                }else toast.error(response.message)
            }
        })
        
    }

    const handleCompareDate = (updatedAt, createdAt) => {
        const update = createdAt === updatedAt ? '' : moment(updatedAt).format("DD/MM/YYYY");
        return update;
    }

    const handleInputSearch = (e) => {
        setQueries({...queries, q: e.target.value})
    }

    // const handleUpdate = async(e) => {
    //     const response = await apiUpdateUserByAdmin()
    // }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách tài khoản</h2>
                <div className={cx('header')}>
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm người dùng hoặc email" name='q' value={queries.q} onChange={handleInputSearch} />
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
                                <p className={cx('title')}>Tên khách hàng</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Số điện thoại</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Email</p>
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
                            <th>
                                <p className={cx('title')}>Thao tác</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col4')}><p className={cx('code')}>{index + 1}</p></td>
                                <td><p className={cx('name')}>{user.name}</p></td>
                                <td className={cx('cus-col2')}><p className={cx('code')}>{user.phone}</p></td>
                                <td><p className={cx('name')}>{user.email}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('status')}><Status data={user} /></p></td>
                                <td className={cx('cus-col2')}><p className={cx('date')}>{moment(user.createdAt).format("DD/MM/YYYY")}</p></td>
                                <td className={cx('cus-col2')}><p className={cx('date')}>{handleCompareDate(user.updatedAt, user.createdAt)}</p></td>
                                <td className={cx('cus-col4')}>
                                    <div className={cx('action')}>
                                        <span onClick={() => handleDelete(user._id, user.name)} className={cx( 'icon-acc')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
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

export default AccountManager;