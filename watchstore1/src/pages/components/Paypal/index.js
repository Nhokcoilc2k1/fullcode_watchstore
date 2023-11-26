import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, orderCreateReset } from "~/Redux/Reducers/OrderSlice";

// This value is from the props in the UI
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, payload }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const dispatchorder = useDispatch();
    const navigate = useNavigate();
    const orderCreate = useSelector((state) => state.orderCreate);
    const { success, order} = orderCreate;

    useEffect(() => {
        if(success){
            navigate(`/don-hang`);
            window.location.reload();
            dispatchorder(orderCreateReset());
        }
    },[navigate, dispatchorder, success , order]);

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options, currency: currency
            }
        })
    }, [currency, showSpinner])

    const handleCreateOrder = () => {
        dispatchorder(createOrder({...payload, isPaid: true }))
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

export default function Paypal({amount, payload}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}