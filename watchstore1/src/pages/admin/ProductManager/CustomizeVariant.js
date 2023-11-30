import { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from './ProductManager.module.scss';
import Button from "~/components/Button";
import { useFormik } from "formik";
import { apiCreateAttribute, apiGetAttribute, apiUpdateAttribute } from "~/apis/attribute";
import { toast } from "react-toastify";

const cx = classNames.bind(styles)

function CustomizeVarriant({customizeVarriant, setCustomVarriant}) {
    const [editAtt, setEditAtt] = useState(null);

    const fetchAtt = async() => {
        const response  = await apiGetAttribute(customizeVarriant);
        if(response.success){
            setEditAtt(response.attribute);
        }else return;
    }

    useEffect(() => {
        fetchAtt();
    },[customizeVarriant])

    const {values ,setValues, errors, handleChange,handleSubmit, handleBlur, touched} = useFormik({
        initialValues: {
            machineSeri: '',
            wireMaterial: '',
            glassMaterial: '',
            waterResistant: '',
            faceSize: '',
            shellMaterial: '',
            shape: '',
            shellColor: '',
            faceColor: '',
            feature: '',
        },
        // validationSchema: ,
        
        onSubmit : async() => {
            if(!editAtt){
                const response = await apiCreateAttribute({...values, product: customizeVarriant});
                if(response.success){
                    toast.success(response.message);
                    setCustomVarriant(null);
                }else toast.error(response.message);
            }else{
                const response = await apiUpdateAttribute(editAtt._id, {...values, product: customizeVarriant})
                console.log(response);
                if(response.success){
                    toast.success(response.message);
                    setCustomVarriant(null);
                }else toast.error(response.message);
            }

        },
      });

      useEffect(() => {
        if(editAtt){
            setValues({
                machineSeri: editAtt.machineSeri,
                wireMaterial: editAtt.wireMaterial,
                glassMaterial: editAtt.glassMaterial ,
                waterResistant: editAtt.waterResistant,
                faceSize: editAtt.faceSize,
                shellMaterial: editAtt.shellMaterial,
                shape: editAtt.shape,
                shellColor: editAtt.shellColor,
                faceColor: editAtt.faceColor,
                feature: editAtt.feature,
            })
        }
      },[editAtt])

    return ( 
        <div className={cx('wrapper', 'update-page')}>
            <div className={cx('inner')}>
                <div className={cx('box-header')}>
                    <h2 className={cx('header-name')}>Thêm thông số sản phẩm</h2>
                    <Button onClick={() => setCustomVarriant(null)} className={cx('header-btn')}>Quay lại</Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('box-input')}>
                        <div className={cx('form-group')}>
                            <label>Dòng máy</label>
                            <input 
                                type="text"
                                placeholder="Dòng máy"
                                name="machineSeri"
                                value={values.machineSeri}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.machineSeri && touched.machineSeri ? 'input-error':'')}
                            />
                            {errors.machineSeri && touched.machineSeri && <span>{errors.machineSeri}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Chất liệu dây</label>
                            <input 
                                type="text"
                                placeholder="Chất liệu dây"
                                name="wireMaterial"
                                value={values.wireMaterial}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.wireMaterial && touched.wireMaterial ? 'input-error':'')}
                            />
                            {errors.wireMaterial && touched.wireMaterial && <span>{errors.wireMaterial}</span>}
                        </div>
                    </div>
                    <div className={cx('box-input')}>
                        <div className={cx('form-group')}>
                            <label>Kháng nước</label>
                            <input 
                                type="text"
                                placeholder="Kháng nước"
                                name="waterResistant"
                                value={values.waterResistant}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.waterResistant && touched.waterResistant ? 'input-error':'')}
                            />
                            {errors.waterResistant && touched.waterResistant && <span>{errors.waterResistant}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Size mặt</label>
                            <input 
                                type="text"
                                placeholder="Size mặt"
                                name="faceSize"
                                value={values.faceSize}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.faceSize && touched.faceSize ? 'input-error':'')}
                            />
                            {errors.faceSize && touched.faceSize && <span>{errors.faceSize}</span>}
                        </div>
                    </div>
                    <div className={cx('box-input')}>
                        <div className={cx('form-group')}>
                            <label>Chất liệu vỏ</label>
                            <input 
                                type="text"
                                placeholder="Chất liệu vỏ"
                                name="shellMaterial"
                                value={values.shellMaterial}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.shellMaterial && touched.shellMaterial ? 'input-error':'')}
                            />
                            {errors.shellMaterial && touched.shellMaterial && <span>{errors.shellMaterial}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Hình dạng</label>
                            <input 
                                type="text"
                                placeholder="Hình dạng"
                                name="shape"
                                value={values.shape}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.shape && touched.shape ? 'input-error':'')}
                            />
                            {errors.shape && touched.shape && <span>{errors.shape}</span>}
                        </div>
                    </div>
                    <div className={cx('box-input')}>
                        <div className={cx('form-group')}>
                            <label>Màu vỏ</label>
                            <input 
                                type="text"
                                placeholder="Màu vỏ"
                                name="shellColor"
                                value={values.shellColor}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.shellColor && touched.shellColor ? 'input-error':'')}
                            />
                            {errors.shellColor && touched.shellColor && <span>{errors.shellColor}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Tính năng</label>
                            <input 
                                type="text"
                                placeholder="Tính năng"
                                name="feature"
                                value={values.feature}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.feature && touched.feature ? 'input-error':'')}
                            />
                            {errors.feature && touched.feature && <span>{errors.feature}</span>}
                        </div>
                    </div>
                    <div className={cx('box-input')}>
                        <div className={cx('form-group')}>
                            <label>Màu mặt</label>
                            <input 
                                type="text"
                                placeholder="Màu mặt"
                                name="faceColor"
                                value={values.faceColor}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.faceColor && touched.faceColor ? 'input-error':'')}
                            />
                            {errors.faceColor && touched.faceColor && <span>{errors.faceColor}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Loại kính</label>
                            <input 
                                type="text"
                                placeholder="Loại kính"
                                name="glassMaterial"
                                value={values.glassMaterial}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.glassMaterial && touched.glassMaterial ? 'input-error':'')}
                            />
                            {errors.glassMaterial && touched.glassMaterial && <span>{errors.glassMaterial}</span>}
                        </div>
                    </div>
                    <div className={cx('ctrl-create', 'update')}>
                        <Button type="submit" className={cx('control-btn', 'update-btn')}>
                            Thêm thông số sản phẩm
                        </Button>
                    </div>
                </form>
            </div>
        </div>
     );
}

export default memo(CustomizeVarriant);