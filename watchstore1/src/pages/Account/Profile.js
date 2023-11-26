import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiUpdateCurrent } from '~/apis/user';
import Swal from 'sweetalert2';
import { getCurrent } from '~/Redux/user/asyncActions';
import { accountValidation } from '~/components/Form/SignupValidation';
import { useFormik } from 'formik';

const cx = classNames.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const {current} = useSelector((state) => state.user);

    const {values, setValues, errors, handleChange ,handleSubmit, handleBlur, touched} = useFormik({
        initialValues: {
            name: '',
            phone:'',
            address:'' ,
            email: '',
        },    
        validationSchema: accountValidation,
        onSubmit : async() => {
            const response = await apiUpdateCurrent(values);
            if(response.success){
                Swal.fire({title: 'Cập nhật tài khoản thành công!', icon: "success",})
                dispatch(getCurrent());
            }
            else return;
        }  
      });

      useEffect(() => {
        if(current){
            setValues({
                name: current.name,
                phone: current.phone,
                address: current.address,
                email: current.email
            })
        }
      },[current])

    return ( 
        <div className={cx('info-user')}>
            <h4>Thông tin tài khoản</h4>
            <div className={cx('wrapper-form')}>
                <form className={cx('form-info')} onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label>Họ tên</label>
                        <input 
                            type="text"
                            placeholder="Họ và tên"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cx(errors.name && touched.name ? 'input-error':'')}
                        /> 
                    </div>
                        {errors.name && touched.name && <span className={cx('invalid')}>{errors.name}</span>}
                    <div className={cx('form-group')}>
                        <label>Số điện thoại</label>
                        <div>
                            <input 
                                type="text"
                                placeholder="Số điện thoại"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.phone && touched.phone ? 'input-error':'')}
                            /> 
                            {errors.phone && touched.phone && <span className={cx('invalid')}>{errors.phone}</span>}
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label>Email</label>
                        <input 
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cx(errors.email && touched.email ? 'input-error':'')}
                        /> 
                        {errors.email && touched.email && <span className={cx('invalid')}>{errors.email}</span>}
                    </div>
                    <div className={cx('form-group')}>
                        <label>Địa chỉ</label>
                        <textarea 
                            placeholder="Địa chỉ nhận hàng"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // className={cx(errors.address && touched.address ? 'input-error':'')}
                            /> 
                        {/* {errors.address && touched.address && <span>{errors.address}</span>} */}
                    </div>
                    <div className={cx('btn')}>
                        <Button type="submit" primary className={cx('btn-acc')}>
                            Cập nhật
                        </Button>
                    </div>
                </form>
            </div>
        </div>
     );
}

export default Profile;