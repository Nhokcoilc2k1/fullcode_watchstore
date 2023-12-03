import express from 'express';
import asyncHandler from 'express-async-handler';
import protect, { isAdmin, verifyAccessToken } from '../Middleware/AuthMiddleware.js';
import Order from '../Models/OrderModel.js';
import User from '../Models/UserModel.js';
import Promotion from '../Models/PromotionModel.js';

const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
    "/",
    verifyAccessToken,
    asyncHandler(async (req, res) => {
        const {_id} = req.user
        const {products, totalPrice, name, address, phone, note, status, paymentMethod, isPaid} = req.body
        // if(address){
        //     await User.findByIdAndUpdate(_id, {cart: []})
        // }
        const data = {products, totalPrice, name, address, phone, note, orderBy: _id }
        if(status) data.status = status
        if(paymentMethod) data.paymentMethod = paymentMethod
        if(isPaid) data.isPaid = isPaid
        const rs = await Order.create(data);
        if(rs){
            await User.findByIdAndUpdate(_id, {cart: []})
        }
        return res.json({
            success: rs ? true : false,
            rs: rs ? rs : 'Đã xảy ra lỗi'
        })
        
        
}))

// Update By Admin
orderRouter.put(
    "/status/:oid",
    verifyAccessToken,
    isAdmin,
    asyncHandler(async (req, res) => {
        const {oid} = req.params
        const {status , isPaid} = req.body
        if(!status) throw new Error('Missing status');
        const response = await Order.findByIdAndUpdate(oid, {status: status, isPaid: isPaid},{new : true})
        
        return res.json({
            success: response ? true : false,
            message: response ? "Cập nhật trạng thái đơn hàng thành công!" : 'Đã xảy ra lỗi!'
        })
            
}))

// Get Order By User
orderRouter.get(
    "/",
    verifyAccessToken,
    asyncHandler(async (req, res) => {
        const { _id } = req.user
        const response = await Order.find({orderBy: _id});
        return res.json({
            success: response ? true : false,
            orders: response ? response : 'Đã xảy ra lỗi'
        })
        
}))

// GET ALL ORDER
orderRouter.get(
    '/admin',
    verifyAccessToken,
    isAdmin,
    asyncHandler(async(req, res) => {
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
                {phone : {$regex: req.query.q, $options: 'i'}}
            ]
        }

        let queryCommand = Order.find(formatedQueries);


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
            const counts = await Order.find(formatedQueries).countDocuments();
            return res.status(200).json({
              success: response ? true : false,
              orders: response ? response : 'Cannot get orders',
              pagination: {
                  counts,
                  page,
                  limit,
              }
            });
          } catch (err) {
            throw new Error(err.message);
          }
        // const orders = await Order.find({});
        // if(orders){
        //     res.status(200).json(orders)
        // }else{
        //     res.status(400).json("Không có đơn hàng nào")
        // }
    })
)

// ORDER DELETE
orderRouter.delete(
    '/:oid',
    verifyAccessToken,
    asyncHandler(async(req, res) => {
        const { oid } = req.params;
        const response = await Order.findByIdAndDelete(oid, {new: true});
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'Hủy đơn hàng thành công!' : 'Đã xảy ra lỗi!'
        })
    })
)

// UPDATE ORDER
// orderRouter.put(
//     '/:id',
//     verifyAccessToken,
//     isAdmin,
//     asyncHandler(async(req, res) => {
//         const {status} = req.body;
//         const order = await Order.findById(req.params.id)
//         if(order){
//             order.status = status
//             const updateOrder = await order.save();
//             res.json(updateOrder);
//         }else{
//             res.status(400);
//             throw new Error("update unsucess");
//         }
//     })
// )

// GET ORDER ID
// orderRouter.get(
//     "/by/:id",
//     asyncHandler(async (req, res) => {
//         const order = await Order.findById(req.params.id);
//         if(order){
//             res.json(order);
//         }else{
//             res.status(404);
//             throw new Error('order is not Found');
//         }
//     })
// )

export default orderRouter;