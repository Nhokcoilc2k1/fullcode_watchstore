import express from 'express';
import asyncHandler from 'express-async-handler'
import Promotion from '../Models/PromotionModel.js';
import { isAdmin, verifyAccessToken } from '../Middleware/AuthMiddleware.js';

const promotionRoute = express.Router();

// GET ALL PROMO
promotionRoute.get(
    "/",
    asyncHandler( async(req, res) => {
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
        let queryCommand = Promotion.find(formatedQueries);

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
            const counts = await Promotion.find(formatedQueries).countDocuments();
            return res.status(200).json({
              success: response ? true : false,
              promotions: response ? response : 'Cannot get promotions',
              pagination: {
                  counts,
                  page,
                  limit,
              }
            });
          } catch (err) {
            throw new Error(err.message);
          }
    })
)

// GET SINGLE PROMO
promotionRoute.get(
    "/:proid", 
    asyncHandler(async (req, res) => {
        const {proid} = req.params;
    const promotion = await Promotion.findById(proid);
    res.status(200).json({
        success: promotion ? true : false,
        message: promotion ? promotion : 'Đã xảy ra lỗi!'
    })
}))

// POST PROMO
promotionRoute.post(
    "/", 
    verifyAccessToken,
    isAdmin,
    asyncHandler(async(req, res) => {
        // const {name, coupon_code, discount_value, max_discount_value, min_order_value, expired} = req.body;
        if(Object.keys(req.body).length === 0) throw new Error('Missing input');
        const couponExit = await Promotion.findOne({coupon_code: req.body.coupon_code});
        if(couponExit) throw new Error('Mã khuyến mãi đã tồn tại!');
        const newPromotion = await Promotion.create(req.body);
        res.status(200).json({
            success: newPromotion ? true : false,
            message: newPromotion ? 'Tạo mã khuyến mãi thành công!' : 'Đã xảy ra lỗi!'
        })
        
    }))
// UPDATE PROMO
promotionRoute.put(
    "/:proid",
    verifyAccessToken,
    isAdmin,
    asyncHandler(async (req, res) => {
       const {proid} = req.params;
       const updatePromo = await Promotion.findByIdAndUpdate(proid, {...req.body}, {new: true})
       res.status(200).json({
        success: updatePromo ? true : false,
        message: updatePromo ? 'Cập nhật khuyến mãi thành công!' : 'Đã xảy ra lỗi!'
       })
    })
)

// DELETE PROMO
promotionRoute.delete(
    "/:proid",
    asyncHandler(async (req, res) => {
        const {proid} = req.params;
        const deletePromo = await Promotion.findByIdAndDelete(proid, {new : true});
        res.status(200).json({
            success: deletePromo ? true : false,
            message: deletePromo ? 'Xóa khuyến mãi thành công' : 'Đã xảy ra lỗi!'
           })
    })
)

// SEARCH 
promotionRoute.get(
    "/search/:keyword",
    asyncHandler(async(req, res) => {
        let listOfPromo = Promotion.find({
            name: {$regex: new RegExp(req.params.keyword, 'i')},
            discount_type: {$regex: new RegExp(req.params.keyword, 'i')}
        });
        console.log(keyword);
        if(listOfPromo){
            res.status(200).json(listOfPromo);
        }else{
            res.status(400);
            throw new Error("Promo not find!")
        }
    })
)

    export default promotionRoute;