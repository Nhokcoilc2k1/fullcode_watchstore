import classNames from "classnames/bind";
import styles from './Post.module.scss'
import BreadCrumb from "~/components/BreadCrumb";
import { apiGetPosts } from "~/apis/post";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const cx = classNames.bind(styles)

function Post() {
    const [post, setPost] = useState([]);

    const fetchPost = async() => {
        const response = await apiGetPosts();
        if(response.success){
            setPost(response.posts)
        }
    }

    useEffect(() => {
        fetchPost();
    },[])

    const routes = [
        { path: "/", breadcrumb: "Trang chủ" },
        { path: "/post", breadcrumb: 'Tin tức' },
      ];

    return ( 
        <div className={cx('wrapper')}>
            <BreadCrumb routes={routes} />
            <div className={cx('box-content')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-9')}>
                        {post?.filter(el => el.status === true).map(el => (
                            <div key={el._id} className={cx('item-post')}>
                                <Link to={`/post/${el._id}/${el.title.toLowerCase()}`}>
                                    <img className={cx('img')} src={el.image} alt={el.description} />
                                </Link>
                                <div className={cx('content')}>
                                    <Link to={`/post/${el._id}/${el.title.toLowerCase()}`}>
                                        <h5 className={cx('title')}>{el.title}</h5>
                                    </Link>
                                        <p className={cx('date')}>{moment(el.createdAt).format('MMM DD, YYYY')}</p>
                                        <p className={cx('description')}>{el.content}</p>
    
                                        <Link  to={`/post/${el._id}/${el.title.toLowerCase()}`}>
                                            <p className={cx('control')}>{`Read more ->`}</p>
                                        </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('col', 'l-3')}>
                        <div className={cx('sidebar')}>
                            <h5 className={cx('list')}>Các bài viết gần đây</h5>
                            <div className={cx('list-post')}>
                                {post?.map(el => (
                                    <div key={el._id} className={cx('list-item')}>
                                        <p className={cx('item-title')}>{el.title}</p>
                                        <p className={cx('item-date')}>{moment(el.createdAt).format('MMM DD, YYYY')}</p>
                                    </div>
                                ))}
                            </div>
                            <img className={cx('list-img')} src="https://vitranet24.com/cong%20nghe-min%20(1).jpg" alt="anh" />  
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default memo(Post);