import classNames from "classnames/bind";
import styles from './PostManager.module.scss'
import { useEffect, useState } from "react";
import { getBase64 } from "~/ultils/helpers";
import Button from "~/components/Button";
import { useFormik } from "formik";
import { apiUpdatePost } from "~/apis/post";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function CreatePost({editPost, setEditPost, render}) {
    const [image, setImage] = useState();
    const [preview, setPreview] = useState({
        image: null,
    })

    const handlePriviewThumd = async(file) => {
        const base64Image = await getBase64(file)
        setPreview(prev => ({...prev, image: base64Image}))
    }

    useEffect(() => {
        if(!image) return;
        if(typeof image === 'string') return;
        handlePriviewThumd(image[0])
    },[image])

    const {values ,setValues, errors, handleChange,handleSubmit, handleBlur, touched} = useFormik({
        initialValues: {
            title: '',
            description: '',
            content: '',
            status: true,
        },
        // validationSchema: ,
        
        onSubmit : async() => {
            const data =  {...values, image}
            const formData = new FormData()
            for(let i of Object.entries(data)) formData.append(i[0], i[1])
            if(data.image) formData.append('image', data.image.length  === 0 ? image : data.image[0])

            const response = await apiUpdatePost(editPost._id,formData);
            console.log(response);
            if(response.success){
                toast.success(response.message);
                setEditPost(null)
                setPreview({
                    image: null,
                })
                render();
            }else toast.error(response.message)
        },
      });

      useEffect(() => {
        if(editPost){
            setValues({
                title: editPost.title,
                description: editPost.description,
                status: editPost.status,
                content: editPost.content,
            })
            setPreview({
                image: editPost?.image || '',
            })
            setImage(editPost?.image)
      }
      }, [editPost])

    const active = [
        {title: 'active', value: true},
        {title: 'inactive', value: false},
    ]
    return ( 
        <div className={cx('wrapper', 'update-page')}>
        <div className={cx('inner')}>
            <div className={cx('box-header')}>
                <h2 className={cx('header-name')}>Chỉnh sửa bài viết</h2>
                <Button onClick={() => setEditPost(null)} className={cx('header-btn')}>Quay lại</Button>
            </div>
            <form onSubmit={handleSubmit}>

                <div className={cx('form-group')}>
                    <label>Tiêu đề bài viết</label>
                    <input 
                        type="text"
                        placeholder="Tên danh mục mới"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={cx(errors.title && touched.title ? 'input-error':'')}
                    />
                    {errors.title && touched.title && <span>{errors.title}</span>}
                </div>
                <div className={cx('form-select')}>
                    <label htmlFor="status">Trạng thái</label>
                    <select 
                        id="status" 
                        value={values.status} 
                        name="status"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        {/* <option value="">--CHOOSE--</option> */}
                        {
                            active?.map((el, index) => (
                                <option key={index} value={el.value}>{el.title}</option>
                            ))
                        }
                    </select>
                    {errors.status && touched.status && <span>{errors.status}</span>}
                </div> 
                <div className={cx('form-textarea')}>
                    <label>Nội dung</label>
                    <textarea 
                        type="text"
                        placeholder="Nội dung "
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={cx(errors.content && touched.content ? 'input-error':'', 'description', 'content')}
                    />
                    {errors.content && touched.content && <span>{errors.content}</span>}
                </div>
                <div className={cx('form-textarea')}>
                    <label>Mô tả</label>
                    <textarea 
                        type="text"
                        placeholder="Mô tả"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={cx(errors.description && touched.description ? 'input-error':'', 'description')}
                    />
                    {errors.description && touched.description && <span>{errors.description}</span>}
                </div>
                <div className={cx('upload')}>
                    <label htmlFor="thumb">Tải lên hình ảnh thu nhỏ</label>
                    <input 
                        id="thumb" 
                        type="file" 
                        onChange={e => setImage(e.target.files)}
                    />
                    {/* {errors.thumbnail && touched.thumbnail && <span>{errors.thumbnail}</span>}       */}
                </div>
                  {preview.image && <div className={cx('thumb')}>
                        <img src={preview.image} alt="thumbnail" className={cx('thumb-img')} />
                    </div>}
                    
                <div className={cx('ctrl-create')}>
                    <Button type="submit" className={cx('control-btn')}>
                        Cập nhật
                    </Button>
                </div>
            </form>
        </div>
    </div>
     );
}

export default CreatePost;