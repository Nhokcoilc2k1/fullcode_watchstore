import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import { useFormik} from 'formik';

import Button from '~/components/Button';
import OverLay from '~/pages/components/OverLay';
import { useCallback, useState } from 'react';
import FormRegister from './FormRegister';
import { useDispatch } from 'react-redux';
// import Error from '../LoadingError/Error';
// import Loading from '../LoadingError/Loading';
import { loginValidation } from './SignupValidation';
import { apiForgotPassword, apiLogin } from '~/apis/user';
import { login } from '~/Redux/user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);
function FormLogin({ isClose }) {
    const [showResgiter, setShowResgiter] = useState(false);
    const [isForgotPassword, setIsForgotPasswword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleIsClose = useCallback((value) => {
        isClose(value);
      }, [isClose]);

    const hanleShowRegister = () => {
        setShowResgiter(true);
    };

    const {values, errors, handleChange,handleSubmit, handleBlur, touched} = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidation,
        onSubmit : async() => {
           const response = await apiLogin(values);
        //    console.log(response);
           if(response.success){
            // dispatch(getCurrent());
            dispatch(login({isLoggedIn: true,  token: response.accessToken}))
            handleIsClose(false);
            navigate('/');
            window.location.reload();
        }else Swal.fire('Lỗi đăng nhập',response.message,'error')
        },
      });

      const onKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault();
          handleSubmit();
        }
      };

      const handleForgotPassword = async() => {
        const {email} = values;
        const response = await apiForgotPassword({email});
        if(response.success){
            setIsForgotPasswword(false)
            isClose(false);
            toast.success(response.message, {theme: 'colored'})
        }else toast.info(response.message, {theme: 'colored'})
      }

    return (
        <OverLay>
            {isForgotPassword && (
                <div className={cx('forgot-box')}>
                <div className={cx('fogot-item')}>
                    <button onClick={() => setIsForgotPasswword(false)} className={cx('btn-back')} >
                        <FontAwesomeIcon className={cx('icon-back')} icon={faChevronLeft} />
                        Quay lại
                    </button>
                    <div className={cx('form-group')}>
                        <label htmlFor='enteremail'>Nhập email của bạn</label>
                        <input 
                            type="text"
                            placeholder="Exp: email@gmail.com"
                            name="email"
                            id='enteremail'
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('forgot-btn')}>
                        <Button onClick={handleForgotPassword} primary>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </div>
            )}
            {showResgiter ? (
                <FormRegister isClose={setShowResgiter} isLogin={isClose} />
            ) : (
                <div className={cx('authen-form')}>
                    <form onSubmit={handleSubmit} onKeyDown={onKeyDown} className={cx('form-container')}>
                        <div className={cx('form-header')}>
                            <h3 className={cx('heading')}>Đăng nhập</h3>
                            <span className={cx('switch-btn')} onClick={hanleShowRegister}>
                                Đăng kí
                            </span>
                        </div>
                        
                        <div className={cx('form-content')}>
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
                        </div>
                        <div className={cx('forgot-pass')}>
                            <p onClick={() => setIsForgotPasswword(true)}>Quên mật khẩu ?</p>
                        </div>
                        <div className={cx('control')}>
                            <Button className={cx('control-btn', 'cancel')} onClick={() => isClose(false)}>
                                Trở lại
                            </Button>
                            <Button type="submit" primary className={cx('control-btn')}>
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </OverLay>
    );
}

export default FormLogin;
