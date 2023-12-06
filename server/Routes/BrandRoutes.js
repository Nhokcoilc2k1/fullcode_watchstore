import express from 'express';
import asyncHandler from 'express-async-handler';
import Brand from '../Models/BrandModel.js';
import protect, { isAdmin, verifyAccessToken } from '../Middleware/AuthMiddleware.js';
import uploadCloud from '../config/cloudinaryConfig.js';

const brandRoute = express.Router();

// GET ALL BRAND
brandRoute.get(
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

        //  Filtering
        if(queries?.name) formatedQueries.name = {$regex: queries.name, $options: 'i'}

        if(req.query.q){
            delete formatedQueries.q;
            formatedQueries['$or'] = [
                {name : {$regex: req.query.q, $options: 'i'}},
                // {coupon_code : {$regex: req.query.q, $options: 'i'}}
            ]
        }
        let queryCommand = Brand.find(formatedQueries);

        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            queryCommand = queryCommand.select(fields);
        }else{
            queryCommand = queryCommand.select('-__v')
        }

        const page = +req.query.page  || 1
        const limit = +req.query.limit  
        const skip = (page - 1) * limit
        queryCommand.skip(skip).limit(limit)

        try {
            const response = await queryCommand.exec();
            const counts = await Brand.find(formatedQueries).countDocuments();
            return res.status(200).json({
              success: response ? true : false,
              brands: response ? response : 'Cannot get brands',
              pagination: {
                  counts,
                  page,
                  limit,
              }
            });
          } catch (err) {
            throw new Error(err.message);
          }

    // const brands = await Brand.find({});
    // res.json(brands);
}))

// GET SINGLE BRAND
brandRoute.get(
    "/:bid", 
    asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.bid);
    res.status(200).json({
        success: brand ? true : false,
        brand: brand ? brand : 'Đã xảy ra lỗi'
    })
}))

// POST BRAND
brandRoute.post(
    "/", 
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
        {name: 'image', maxCount: 1},
    ]),
    asyncHandler(async(req, res) => {
        const {name, status, description} = req.body;
        const brandExit = await Brand.findOne({name})
        if(brandExit) throw new Error("Mã danh mục đã tồn tại");
        if(!name) throw new Error("Đầu vào không hợp lệ");
        const image = req?.files?.image[0].path
        const brand = new Brand({
            name,
            status,
            description,
            image
        })
        const newBrand = await brand.save();
        res.status(200).json({
            success: newBrand ? true : false,
            message: newBrand ? 'Thêm nhãn hiệu thành công!' : 'Đã xảy ra lỗi!'
        })
    }))

// UPDATE BRAND
brandRoute.put(
    "/:bid",
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
        {name: 'image', maxCount: 1},
    ]),
    asyncHandler(async(req, res) => {
        const { bid } = req.params;
        const files = req?.files
        if(files?.image) req.body.image = files?.image[0]?.path;
        const updateBrand = await Brand.findByIdAndUpdate(bid, {...req.body}, {new: true})
        return res.status(200).json({
            success: updateBrand ? true : false,
            message: updateBrand ? updateBrand : 'Đã xảy ra lỗi!'
        })
    })
    )

// UPDATE STATUS Brand
brandRoute.put(
    "/status/:bid",
    verifyAccessToken,
    isAdmin,
    asyncHandler(async (req, res) => {
       const {bid} = req.params;
       const {status} = req.body;
        const updateBrand = await Brand.findByIdAndUpdate(bid, {status: status}, {new: true})
        res.status(200).json({
            success: updateBrand ? true : false,
            message: updateBrand ? updateBrand : 'Đã xảy ra lỗi!'
        })

    })
)


// DELETE BRAND
brandRoute.delete(
    "/:bid",
    verifyAccessToken,
    isAdmin,
    asyncHandler(async (req, res) => {
        const { bid } = req.params;
        const response = await Brand.findByIdAndDelete(bid, {new : true});
        res.status(200).json({
            success: response ? true : false,
            message: response ? 'Xóa nhãn hiệu thành công!' : 'Đã xảy ra lỗi!'
        })
    }))

// SEARCH
// brandRoute.get(
//     "/search/:keyword",
//     asyncHandler( async (req, res) => {
//         const listOfBrand = await Brand.find({
//             name: {
//                 $regex: req.params.keyword,
//                 $options: "i"
//             },
//         })
//         if(listOfBrand){
//             res.status(200).json(listOfBrand);
//         }else{
//             res.status(400);
//             throw new Error("not find brand");
//         }
//     })
// )
export default brandRoute;