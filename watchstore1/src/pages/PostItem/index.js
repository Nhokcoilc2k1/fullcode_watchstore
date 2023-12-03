import classNames from "classnames/bind";
import styles from './PostItem.module.scss';
import BreadCrumb from "~/components/BreadCrumb";
import { memo, useEffect, useState } from "react";
import { apiGetPost } from "~/apis/post";
import { useParams } from "react-router-dom";
import moment from "moment";

const cx = classNames.bind(styles)

function PostItem() {
    const [postItem, setPostItem] = useState({});
    const {poid} = useParams();

    const fetchPostItem = async() => {
        const response = await apiGetPost(poid);
        if(response.success){
            setPostItem(response.post);
        }
    }

    useEffect(() => {
        fetchPostItem()
    },[])

    const routes = [
        { path: "/", breadcrumb: "Trang chủ" },
        { path: "/post", breadcrumb: 'Tin tức' },
        { path: "/:poid/:title", breadcrumb: postItem.title },
      ];

    return ( 
        <div className={cx('wrapper')}>
            <BreadCrumb routes={routes} />
            <div className={cx('box-content')}>
                <h5 className={cx('title')}>{postItem.title}</h5>
                <p className={cx('date')}>{moment(postItem.createdAt).format('MMM DD, YYYY')}</p>
                <img src={postItem.image} alt='ảnh'/>
                <p className={cx('content')}>{postItem.content}</p>
            </div>
        </div>
     );
}

export default memo(PostItem);
