import classNames from "classnames/bind";
import styles from '../CreateCategory/CreateCategory.module.scss';
import { useFormik } from "formik";
import Button from "~/components/Button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getBase64 } from "~/ultils/helpers";
import { apiCreateBrand } from "~/apis/brand";

const cx = classNames.bind(styles)

function CreateBrand() {
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
            name: '',
            description: '',
            status: true,
        },
        // validationSchema: ,
        
        onSubmit : async() => {
            const data =  {...values, image}
            const formData = new FormData()
            for(let i of Object.entries(data)) formData.append(i[0], i[1])
            if(data.image) formData.append('image', data.image[0])
            const response = await apiCreateBrand(formData);
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
                    <h2 className={cx('header-name')}>Thêm nhãn hiệu mới</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('box-input')}>
                        <div className={cx('form-group')}>
                            <label>Tên nhãn hiệu</label>
                            <input 
                                type="text"
                                placeholder="Tên danh mục mới"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.name && touched.name ? 'input-error':'')}
                            />
                            {errors.name && touched.name && <span>{errors.name}</span>}
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
                            Tạo nhãn hiệu mới
                        </Button>
                    </div>
                </form>
            </div>
        </div>
     );
}

export default CreateBrand;