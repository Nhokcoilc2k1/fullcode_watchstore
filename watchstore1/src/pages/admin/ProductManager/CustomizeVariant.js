import { memo } from "react";
import classNames from "classnames/bind";
import styles from './ProductManager.module.scss';
import Button from "~/components/Button";
import { useFormik } from "formik";

const cx = classNames.bind(styles)

function CustomizeVarriant({customizeVarriant, setCustomVarriant}) {

    const {values, setValues , errors, handleChange,handleSubmit, handleBlur, touched} = useFormik({
        initialValues: {
            name: '',
            price: '',
            sale_price: '',
            quantity: '',
            category: '',
            brand: '',
        },
        // validationSchema: ,
        
        onSubmit : async() => {
            // if(values.category) values.category = categoryData?.find(el => el._id === values.category)?.name
            // if(values.brand) values.brand = branData?.find(el => el._id === values.brand)?.name
            // console.log({...values,...payload, thumbnail, images});
            const formData = new FormData()
            // for(let i of Object.entries(finalPayload)) formData.append(i[0], i[1])

            // if(finalPayload.thumbnail) formData.append('thumbnail', finalPayload.thumbnail.length  === 0 ? thumbnail : finalPayload.thumbnail[0])
            // if(finalPayload.images){
            //     const images1 = finalPayload.images.length === 0 ? images : finalPayload.images
            //     for(let image of images1) formData.append('images', image)
            // }
            // console.log(finalPayload);
            // console.log(formData);

            // const response =  await apiUpdateProduct(formData, editProduct._id);
            // if(response.success){
            //     toast.success(response.message)
            //     setReLoad(prev => !prev)
            //     setEditProduct(null)
            // }else{
            //     toast.error(response.message)
            // }
        },
      });

    return ( 
        <div className={cx('wrapper', 'update-page')}>
            <div className={cx('inner')}>
                <div className={cx('box-header')}>
                    <h2 className={cx('header-name')}>Cập nhật thông số sản phẩm</h2>
                    <Button onClick={() => setCustomVarriant(null)} className={cx('header-btn')}>Quay lại</Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('box-input')}>
                        <div className={cx('form-group')}>
                            <label>Tên sản phẩm</label>
                            <input 
                                type="text"
                                placeholder="Tên sản của phẩm mới"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.name && touched.name ? 'input-error':'')}
                            />
                            {errors.name && touched.name && <span>{errors.name}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Tên sản phẩm</label>
                            <input 
                                type="text"
                                placeholder="Tên sản của phẩm mới"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.name && touched.name ? 'input-error':'')}
                            />
                            {errors.name && touched.name && <span>{errors.name}</span>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}

export default memo(CustomizeVarriant);