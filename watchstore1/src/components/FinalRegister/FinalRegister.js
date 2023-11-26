import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function FinalRegister() {
    const {status} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(status === 'failed') Swal.fire('Oop!', 'Đăng kí không thành công', 'error').then(() => {
            navigate('/');
        })
        if(status === 'success') Swal.fire('Congratuduiton', 'Đăng kí thành công. Vui lòng đăng nhập', 'success').then(() => {
            navigate('/');
        })
    }, [])
    return ( 
        <div>
        </div>
     );
}

export default FinalRegister;