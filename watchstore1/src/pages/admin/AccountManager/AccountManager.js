import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { apiDeleteUser, apiGetUsers } from '~/apis/user';
import { useDebounce } from '~/hooks';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SwitchAccount from './SwitchAccount';
import { Pagination } from '~/Layout/components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { handleCompareDate } from '~/ultils/helpers';

const cx = classNames.bind(styles);

function AccountManager() {
    const [reLoad, setReLoad] = useState(false);
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [queries, setQueries] = useState({
        q: ""
    })

    const [params] = useSearchParams();

    const fetchUsers = async(params) => {
        const response = await apiGetUsers({...params, limit:process.env.REACT_APP_LIMIT })
        if(response.success) {
            setUsers(response?.users)
            setTotalCount(response?.pagination?.counts)
        }
    }

    const queriesDebounced = useDebounce(queries.q, 800);

    useEffect(() => {
        const queries = Object.fromEntries([...params])
        if(queriesDebounced){
            queries.q = queriesDebounced
             delete queries.page 
        }
         fetchUsers(queries)
    },[queriesDebounced, params])



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
                    setReLoad(!reLoad)
                }else toast.error(response.message)
            }
        })
        
    }

    const handleInputSearch = (e) => {
        setQueries({...queries, q: e.target.value})
    }

    const render = useCallback(() => {
        setReLoad(!reLoad);
   },[reLoad]);

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
                                <td className={cx('cus-col1')}><p className={cx('status')}><SwitchAccount uid={user._id} render={render}  /></p></td>
                                <td className={cx('cus-col2')}><p className={cx('date')}>{moment(user.createdAt).format("DD/MM/YYYY")}</p></td>
                                <td className={cx('cus-col2')}><p className={cx('date')}>{handleCompareDate(user.updatedAt, user.createdAt)}</p></td>
                                <td className={cx('cus-col4')}>
                                    <div className={cx('action')}>
                                        <span onClick={() => handleDelete(user?._id, user?.name)} className={cx( 'icon-acc')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <Pagination totalCount={totalCount}/>
            </div>
        </div>
     );
}

export default AccountManager;