import mongoose from "mongoose";

const promotionSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    coupon_code: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        require: true,
        default: true
    },
    discount_value: {
        type: Number,
        require: true,
    },
    min_order_value: {
        type: Number,
        require: true,
    },
    max_discount_value: {
        type :Number,
        require: true,
    },
    expired: {
        type: Date,
        require: true,
    }
},{
    timestamps: true
})

const Promotion = mongoose.model("Promotion", promotionSchema)

export default Promotion;