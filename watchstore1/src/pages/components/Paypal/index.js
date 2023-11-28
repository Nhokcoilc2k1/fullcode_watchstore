import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiCreateOrder } from "~/apis/product";

// This value is from the props in the UI
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, payload, setIsSuccess, setShowPaypal }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options, currency: currency
            }
        })
    }, [currency, showSpinner])

    const handleCreateOrder = async() => {
        const response = await apiCreateOrder({...payload, status: 'Đã xác nhận', paymentMethod: 'Thanh toán bằng PayPal', isPaid: 'Đã thanh toán'})
        console.log(response);
        if(response.success){
            setIsSuccess(true)
            setShowPaypal(false)
            setTimeout(() => {
                Swal.fire('Chúc mừng!','Bạn đã đặt hàng thành công!', 'success').then(() => {
                    navigate('/don-hang')
                }, 3000)
            })
        }
    }

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                        purchase_units: [
                            {amount : {currency_code: currency, value : amount}}
                        ]
                }).then(orderId => orderId) }
                
                onApprove={(data, actions) => actions.order.capture().then(
                    async(response) => {
                        if(response.status === 'COMPLETED'){
                            handleCreateOrder();
                            console.log(payload);
                        }
                    }
                )}
            />
        </>
    );
}

export default function Paypal({amount, payload, setIsSuccess, setShowPaypal}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper setIsSuccess={setIsSuccess} setShowPaypal={setShowPaypal} payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}