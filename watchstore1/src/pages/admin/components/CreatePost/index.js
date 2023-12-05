import classNames from "classnames/bind";
import styles from './CreatePost.module.scss'
import { useEffect, useState } from "react";
import { getBase64 } from "~/ultils/helpers";
import Button from "~/components/Button";
import { useFormik } from "formik";
import { apiCreatePost } from "~/apis/post";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function CreatePost() {
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
        handlePriviewThumd(image[0])
    },[image])


    const {values ,resetForm, errors, handleChange,handleSubmit, handleBlur, touched} = useFormik({
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
            if(data.image) formData.append('image', data.image[0])
            console.log(data);
            const response = await apiCreatePost(formData);
            console.log(response);
            if(response.success){
                toast.success(response.message);
                resetForm();
                setPreview({
                    image: null,
                })
            }else toast.error(response.message)
        },
      });

    const active = [
        {title: 'active', value: true},
        {title: 'inactive', value: false},
    ]
    return ( 
        <div className={cx('wrapper', 'update-page')}>
        <div className={cx('inner')}>
            <div className={cx('box-header')}>
                <h2 className={cx('header-name')}>Thêm bài viết mới</h2>
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
                        Tạo bài viết mới
                    </Button>
                </div>
            </form>
        </div>
    </div>
     );
}

export default CreatePost;