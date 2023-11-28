import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
            name: String,
            thumbnail: String,
            sale_price: Number,
        }
    ],
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    note: {type: String},
    totalPrice: {type: Number},
    status: {type: String, enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng','Đã giao hàng', 'Đã hủy'], default: 'Chờ xác nhận'},
    paymentMethod: {type: String, default: 'Thanh toán khi nhận hàng'},
    isPaid: {type: String, default: 'Chưa thanh toán'}
},{
    timestamp: true,
});
const Order = mongoose.model("Order", orderSchema);
export default Order;