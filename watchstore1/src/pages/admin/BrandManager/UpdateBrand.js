import classNames from "classnames/bind";
import styles from './BrandManager.module.scss';

import { useFormik } from "formik";
import Button from "~/components/Button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getBase64 } from "~/ultils/helpers";
import { apiUpdateBrand } from "~/apis/brand";

const cx = classNames.bind(styles)

function UpdateBrand({editBrand, setEditBrand, render}) {
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
            name: '',
            description: '',
            status: true,
        },
        // validationSchema: ,
        
        onSubmit : async() => {
            const data =  {...values, image}
            const formData = new FormData()
            for(let i of Object.entries(data)) formData.append(i[0], i[1])
            if(data.image) formData.append('image', data.image.length  === 0 ? image : data.image[0])

            const response = await apiUpdateBrand(editBrand._id,formData);
            if(response.success){
                toast.success(response.message);
                setEditBrand(null)
                render();
            }else toast.error(response.message)
        },
      });

      useEffect(() => {
        if(editBrand){
            setValues({
                name: editBrand.name,
                description: editBrand.description,
                status: editBrand.status,
            })
            setPreview({
                image: editBrand?.image || '',
            })
            setImage(editBrand?.image)
      }
      }, [editBrand])

    const active = [
        {title: 'active', value: true},
        {title: 'inactive', value: false},
    ]
    return ( 
        <div className={cx('wrapper', 'update-page')}>
            <div className={cx('inner')}>
                <div className={cx('box-header')}>
                    <h2 className={cx('header-name')}>Cập nhật danh mục</h2>
                    <Button onClick={() => setEditBrand(null)} className={cx('header-btn')}>Quay lại</Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('box-input')}>
                        <div className={cx('form-group')}>
                            <label>Tên danh mục</label>
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
                            Cập nhật
                        </Button>
                    </div>
                </form>
            </div>
        </div>
     );
}

export default UpdateBrand;