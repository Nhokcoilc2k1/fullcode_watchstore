import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '~/pages/components/Pagination';
import { getPostById, updatePost } from './PostServer';
import Status from '../components/Status';
import PostDialog from './PostDialog';
import DialogDelete from '../components/DialogDelete';

const cx = classNames.bind(styles);

function PostManager() {
    const [postData, setPostData] = useState([]);
    const [reload, setReLoad] = useState(false);
    const [postById, setPostById] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [id, setId] = useState();
    const [pagination, setPagination] = useState({});

    const [filters, setFilters] = useState({
        limit: 5,
        page: 1,
    })

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const paramString = queryString.stringify(filters);
                const requestUrl = `http://localhost:5000/api/posts?${paramString}`;
                const response = await fetch(requestUrl);
                const responseJson = await response.json();
                const {posts,pagination} = responseJson;
                setPostData(posts);
                setPagination(pagination);
            } catch (error) {
                console.log(error);
            }
        }
         fetchApi();
        
    }, [reload, filters]);

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        })
    }

    const handleEdit = async(id) => {
        try {
            const edit = await getPostById(id);
            setPostById(edit?.data);
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
                <h2 className={cx('table-name')}>Danh sách bài viết</h2>
                <div className={cx('header')}>
                    <Button className={cx('btn')}>Thêm mới</Button>
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
                    {postData.map((post, index) => (
                            <tr className={cx('row')} key={index}>
                                <td className={cx('cus-col')}>
                                    <div className={cx('action')}>
                                        <span onClick={() => handleEdit(post._id)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                        <span onClick={() => handleDelete(post._id)} className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    </div>
                                </td>
                                <td className={cx('cus-col')}><p className={cx('code')}>{post._id.slice(-6)}</p></td>
                                <td><p className={cx('name')}>{post.title}</p></td>
                                <td className={cx('cus-col1')}><p className={cx('image')}><img src={post.image} alt={post.description} /></p></td>
                                <td className={cx('cus-col1')}><p className={cx('status')}><Status data={post} update={updatePost} /></p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{moment(post.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                                <td className={cx('cus-col')}><p className={cx('date')}>{handleCompareDate(post.updatedAt, post.createdAt)}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showDialog && 
                    <PostDialog 
                        isOpen={showDialog}
                        isClose={setShowDialog}
                        // data={productById}
                        // setData={setProductById}
                        // reLoad={setReLoad}
                        // showToast={setShowToast1}
                        // brands={branData}
                        // categorys={categoryData}
                    />
                }
                {showDelete && 
                    <DialogDelete 
                        isOpen={showDelete}
                        isClose={setShowDelete}
                        // data={deleteId}
                        // showToast={setShowToast2}
                        reLoad={setReLoad}
                        tittle={"Xóa bài viết"}
                        message={"Bạn muốn xóa bài viết này không?"}
                        // fcDelete={deleteProductById}
                    />
                }
            </div>
            <div className={cx('pagination')}>
                <Pagination pagination={pagination} onPageChange={handlePageChange}/>
            </div>
        </div>
     );
}

export default PostManager;