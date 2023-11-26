import { useState } from "react";
import classNames from 'classnames/bind';
import styles from './ResetPassword.module.scss'
import Button from "../Button";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "~/apis/user";
import {toast} from 'react-toastify'

const cx = classNames.bind(styles);

function ResetPassword() {
    const [password, setPassword] = useState('');
    const {token} = useParams();

    const handleResetPassword = async() => {
        const response= await apiResetPassword({password, token})
        console.log(response);
        if(response.success){
            toast.success(response.message, {theme: 'colored'})
        }else toast.info(response.message, {theme: 'colored'})
    }

    return ( 
        <div className={cx('forgot-box')}>
            <div className={cx('fogot-item')}>
                <div className={cx('form-group')}>
                    <label htmlFor='enteremail'>Hãy nhập mật khẩu mới</label>
                    <input 
                        type="text"
                        placeholder="Nhập mật khẩu mới"
                        name="password"
                        id='enteremail'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className={cx('forgot-btn')}>
                    <Button onClick={handleResetPassword} primary>
                        Xác nhận
                    </Button>
                </div>
            </div>
        </div>
     );
}

export default ResetPassword;