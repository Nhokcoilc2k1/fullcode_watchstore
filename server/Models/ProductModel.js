import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: { type: String },
    star: { type: Number },
    comment: { type: String},
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    },
    {
    timestamps: true,
    }
  )

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        // unique: true,
        lowercase: true,
    },
    images: {
        type: Array,
    },
    thumbnail: {
        type: String,
    },
    description: {
        type: String,
    },
    reviews: [reviewSchema],
    quantity:{
        type: Number,
        require: true,
        default: 0,
    },
    price: {
        type: Number,
        require: true,
        default: 0,
    },
    totalRating: {
        type: Number,
        default: 0,
    },
    // numReviews: {
    //     type: Number,
    //     default: 0,
    // },
    sale_price: {
        type: Number,
        require: true,
    },
    discount_value: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    category: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Category',
        type: String,
        require: true
    },
    brand: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Brand',
        type: String,
        require: true
    },
},{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

export default Product;