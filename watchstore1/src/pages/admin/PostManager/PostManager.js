import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { handleCompareDate } from '~/ultils/helpers';
import { Pagination } from '~/Layout/components/Pagination';
import SwitchPost from './SwitchPost';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '~/hooks';
import { apiDeletePost, apiGetPosts } from '~/apis/post';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import UpdatePost from './UpdatePost';

const cx = classNames.bind(styles);

function PostManager() {
    const [postData, setPostData] = useState([]);
    const [reload, setReLoad] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const [queries, setQueries] = useState({
        q: ""
    })

    const [params] = useSearchParams();
    const queriesDebounced = useDebounce(queries.q, 800);
 
    const fetchBrand= async(params) => {
        const response = await apiGetPosts({...params, limit : process.env.REACT_APP_LIMIT })
        if(response.success) setPostData(response)
    }

    useEffect(() => {
        const queries= Object.fromEntries([...params])
         if(queriesDebounced){
            queries.q = queriesDebounced
             delete queries.page 
         }
        fetchBrand(queries);
    }, [queriesDebounced, params , reload]);


    const handleDelete = async(poid, name) => {
        Swal.fire({
            title: 'Xóa nhãn hiệu',
            text: `Bạn chắc chắn muốn xóa bài viết ${name}`, 
            icon: 'warning',
            showCancelButton: true,
        }).then(async(rs) => {
            if(rs.isConfirmed){
                const response = await apiDeletePost(poid);
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
    },[reload])

    return ( 
        <div className={cx('wrapper')}>
            { editPost && (
                    <div className={cx('update')}>
                        <UpdatePost editPost={editPost} setEditPost={setEditPost} render={render} />
                    </div>
                )
            }
            <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách bài viết</h2>
                <div className={cx('header')}>
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm bài viết..." value={queries.q} onChange={handleInputSearch} />
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
                                <p className={cx('title')}>Mã bài đăng</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Tên bài đăng</p>
                            </th>
                            <th>
                                <p className={cx('title')}>Hình ảnh</p>
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
                    {postData?.posts?.map((post, index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col')}>
                                    <div className={cx('action')}>
                                        <span onClick={() => setEditPost(post)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                        <span onClick={() => handleDelete(post._id, post.title)} className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                                <td className={cx('cus-col')}><p className={cx('code')}>{post._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{post.title}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('product-img')}><img src={post.image} alt={post.description} /></p></td>
                                <td className={cx('cus-col1')}><p className={cx('status')}><SwitchPost poid={post._id} render={render} /></p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{moment(post.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{handleCompareDate(post.updatedAt, post.createdAt)}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <Pagination totalCount={postData?.pagination?.counts} />
            </div>
        </div>
     );
}

export default PostManager;