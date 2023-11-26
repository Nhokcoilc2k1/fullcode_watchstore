import classNames from 'classnames/bind';
import styles from './Form.module.scss';

import Button from '~/components/Button';
import { useCallback } from 'react';
import Error from '../LoadingError/Error';
import { useNavigate } from 'react-router-dom';
import { useFormik} from 'formik';
import { registerValidation } from './SignupValidation';
import Loading from '../LoadingError/Loading';
import { apiRegister } from '~/apis/user';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function FormRegister({ isClose, isLogin }) {
    const navigate = useNavigate();

    const handleIsClose = useCallback((value) => {
        isClose(value);
      }, [isClose]);

      const handleIsCloseLogin = useCallback((value) => {
            isLogin(value);
      }, [isLogin]);

    const {values, errors, handleChange,handleSubmit, handleBlur, touched} = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerValidation,
        onSubmit : async() => {
            const {confirmPassword, ...data} = values;
            const response = await apiRegister(data)
            if(response.success){
                handleIsClose(false);
                handleIsCloseLogin(false);
                Swal.fire('Đã đăng kí thành công', response.message, 'success').then(() => {
                    navigate(`/`);
                })
            }else{
                Swal.fire("Đã xảy ra lỗi!", response.message, 'error')
            }
        }
      });
      
      const onKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault();
          handleSubmit();
        }
      };

    return (
        <div className={cx('authen-form')}>
                <form onSubmit={handleSubmit} onKeyDown={onKeyDown} autoComplete='off' className={cx('form-container')}>               
                    <div className={cx('form-header')}>
                        <h3 className={cx('heading')}>Đăng kí</h3>
                        <span
                            className={cx('switch-btn')}
                            onClick={() => {
                                isClose(false);
                                isLogin(true);
                            }}
                        >
                            Đăng nhập
                        </span>
                    </div>
                    <div className={cx('form-content')}>
                    <div className={cx('form-group')}>
                            <label>Họ và tên</label>
                            <input 
                                type="text"
                                placeholder="Họ và tên"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.name && touched.name ? 'input-error':'')}
                            /> 
                            {errors.name && touched.name && <span>{errors.name}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Số điện thoại</label>
                            <input 
                                type="text"
                                placeholder="Số điện thoại"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.phone && touched.phone ? 'input-error':'')}
                            /> 
                            {errors.phone && touched.phone && <span>{errors.phone}</span>}
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
                            {errors.email && touched.email && <span>{errors.email}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Mật khẩu</label>
                            <input 
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.password && touched.password ? 'input-error':'')}

                            />
                        {errors.password && touched.password && <span>{errors.password}</span>}
                        </div> 
                        <div className={cx('form-group')}>
                            <label>Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.confirmPassword && touched.confirmPassword ? 'input-error':'')}
                            />
                            {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                        </div>   
                    </div>
                    <div className={cx('control')}>
                        <Button
                            className={cx('control-btn', 'cancel')}
                            onClick={() => {
                                isClose(false);
                                isLogin(false);
                            }}
                        >
                            Trở lại
                        </Button>
                        <Button type="submit" primary className={cx('control-btn')}>
                            Đăng kí
                        </Button>
                    </div>
                </form>
        </div>
    );
}

export default FormRegister;
