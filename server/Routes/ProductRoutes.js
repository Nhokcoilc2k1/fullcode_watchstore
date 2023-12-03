import express, { response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../Models/ProductModel.js';
import protect, { isAdmin, verifyAccessToken } from '../Middleware/AuthMiddleware.js';
import uploadCloud from '../config/cloudinaryConfig.js'
import slugify from 'slugify';
import User from '../Models/UserModel.js';

const productRoute = express.Router();

// GET ALL PRODUCT
productRoute.get(
    "/",
    asyncHandler(async (req, res) => {
        const queries = {...req.query};
        // tách các trường đặt biệt ra khỏi query
        const excludeFields = ['limit', 'sort', 'page', 'fields'];
        excludeFields.forEach(el => delete queries[el]);
        // Format lại các operators cho đúng cú pháp 
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`);
        const formatedQueries = JSON.parse(queryString);
        let brandQueryObject = {}
        let categoryQueryObject = {}

        //  Filtering
        if(queries?.name) formatedQueries.name = {$regex: queries.name, $options: 'i'}
        if(queries?.category) {
            delete formatedQueries.category
            const categoryArray = queries.category?.split(',')
            const categoryQuery = categoryArray.map(el => ({category: {$regex: el, $options: 'i'}}))
            categoryQueryObject = {$or: categoryQuery}
        }
        if(queries?.brand){
            delete formatedQueries.brand
            const brandArray = queries.brand?.split(',')
            const brandQuery = brandArray.map(el => ({brand: {$regex: el, $options: 'i'}}))
            brandQueryObject = {$or: brandQuery}
        }
        let queryObject = {}

        if(queries?.q){
            delete formatedQueries.q
            queryObject = { $or: [
                {name: {$regex: queries.q, $options: 'i'}},
                {brand: {$regex: queries.q, $options: 'i'}},
                {category: {$regex: queries.q, $options: 'i'}}
            ]

            }
        }
        const q = {...brandQueryObject,...categoryQueryObject,...queryObject, ...formatedQueries}
        let queryCommand = Product.find(q);
       
        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            queryCommand = queryCommand.sort(sortBy)
          } else {
            queryCommand = queryCommand.sort('-createdAt')
          }

        // Fields limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            queryCommand = queryCommand.select(fields);
        }else{
            queryCommand = queryCommand.select('-__v')
        }

        // Pagination
        // limit: số object lấy về 1 lần gọi api
        // skip: 2. bỏ qua 2 cái đầu
        const page = +req.query.page  || 1
        const limit = +req.query.limit  
        const skip = (page - 1) * limit
        queryCommand = queryCommand.skip(skip).limit(limit)

        // Execute query
        //  Số lượng sp thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi api
        try {
            const response = await queryCommand.exec();
            const counts = await Product.find(q).countDocuments();
            return res.status(200).json({
              success: response ? true : false,
              products: response ? response : 'Cannot get products',
              pagination: {
                  counts,
                  page,
                  limit,
              }
            });
          } catch (err) {
            throw new Error(err.message);
          }

}))


// POST PRODUCT
// productRoute.post(
//     "/",
//     protect,
//     isAdmin,
//     uploadCloud.fields([
//         {name: 'images', maxCount: 10},
//         {name: 'thumbnail', maxCount: 1}
//     ]),


// UPLOAD IMAGE PRODUCT
productRoute.put(
    "/uploadimage/:pid",
    verifyAccessToken,
    isAdmin,
    uploadCloud.single('images'),
    asyncHandler(async(req, res) => {
        console.log(req.file);
        return res.status(200).json('ok')
    })
   
)

// ĐOẠN 2
// CREATE PRODUCT
productRoute.post(
    '/',
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
        {name: 'images', maxCount: 10},
        {name: 'thumbnail', maxCount: 1}
    ]),
    asyncHandler(async(req, res) => {
        const {name, price, sale_price, quantity, brand, category, description} = req.body;
        if(!(name && price && sale_price && quantity)) throw new Error('Đầu vào không hợp lệ!');
        const thumbnail = req?.files?.thumbnail[0].path
        const images = req?.files?.images?.map(el => el.path)
        const slug = req.body.slug = slugify(name);
        if (!slug) throw new Error('Trường `slug` là bắt buộc!');
        const discount_value = Math.round(((price - sale_price) / price) * 100);
        const productExist = await Product.findOne({name});
        if(productExist) throw new Error('Sản phẩm đã tồn tại!');
        const product = new Product({
            name,
            price,
            slug,
            sale_price,
            quantity,
            thumbnail,
            images,
            description,
            discount_value,
            brand, 
            category,
        })
        const newProduct = await product.save();
        return res.status(200).json({
            success: newProduct ? true : false,
            message: newProduct ? 'Tạo sản phẩm thành công' : 'Không thể tạo được sản phẩm' 
        })
    })
)

productRoute.get(
    '/:pid',
    asyncHandler(async(req, res) => {
        const { pid } = req.params;
        const product = await Product.findById(pid)
        return res.status(200).json({
            success: product ? true : false,
            productData: product ? product : 'Không thể lấy sản phẩm '
        })
    })
)

// Review
productRoute.put(
    '/ratings',
    verifyAccessToken,
    asyncHandler(async(req, res) => {
        const { _id } = req.user;
        const {star, comment, pid} = req.body;
        if(!star || !pid) throw new Error('Mising input')
        const user = await User.findById(_id);
        const ratingProduct = await Product.findById(pid);
        const alreadyRating = ratingProduct?.reviews?.find((el) => el.postedBy.toString() === _id);
        if(alreadyRating){
            await Product.updateOne({
                reviews: {$elemMatch: alreadyRating}
            }, {
                $set: {"reviews.$.star": star, "reviews.$.comment": comment }
            }, {new : true})
        }else{
            await Product.findByIdAndUpdate(pid, {
                $push: {reviews: {star, comment, postedBy: _id, name: user.name}}
            }, {new : true})
        }
        const updateProduct = await Product.findById(pid);
        const ratingCount = updateProduct.reviews.length;
        const sumRatings = updateProduct.reviews.reduce((sum, el) => sum + +el.star, 0)
        updateProduct.totalRating = Math.round(sumRatings * 10 /ratingCount) / 10

        await updateProduct.save();

        return res.status(200).json({
            status: true,
            updateProduct,
        })
    })
)

productRoute.put(
    '/:pid',
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
        {name: 'images', maxCount: 10},
        {name: 'thumbnail', maxCount: 1}
    ]),
    asyncHandler(async(req, res) => {
        const { pid } = req.params;
        const files = req?.files
        if(files?.thumbnail) req.body.thumbnail = files?.thumbnail[0]?.path;
        if(files?.images) req.body.images = files?.images?.map(el => el.path);
        if(req.body && req.body.name) req.body.slug = slugify(req.body.name);
        const discount_value = Math.round(((req.body.price - req.body.sale_price) / req.body.price) * 100)
        const updatedProduct = await Product.findByIdAndUpdate(pid, {...req.body, discount_value}, {new: true})
        return res.status(200).json({
            success: updatedProduct ? true : false,
            message: updatedProduct ? 'Cập nhật sản phẩm thành công!' : 'Đã xảy ra lỗi!'
        })
    })
)

productRoute.delete(
    '/:pid',
    verifyAccessToken,
    isAdmin,
    asyncHandler(async(req, res) => {
        const { pid } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(pid, {new: true})
        return res.status(200).json({
            success: deletedProduct ? true : false,
            message: deletedProduct ? 'Xóa sản phẩm thành công!' : 'Đã xảy ra lỗi!'
        })
    })
)


//  SEARCH PRODUCT
productRoute.get(
    "/search",
    asyncHandler(async(req, res) => {
        const { name, type } = req.query;
        let query = {};

        if (type === "less") {
            query = { name: { $regex: name, $options: "i" } }.limit(5);
          } else if (type === "more") {
            query = { name: { $regex: name, $options: "i" } };
          }

          try {
            const products = await Product.find(query);
        
            res.json(products);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    })
)


export default productRoute;