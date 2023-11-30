import express from 'express';
import asyncHandler from 'express-async-handler';
import Attribute from '../Models/AttributeModel.js';
import { isAdmin, verifyAccessToken } from '../Middleware/AuthMiddleware.js';

const attributeRoute = express.Router();

attributeRoute.post(
    '/',
    verifyAccessToken,
    isAdmin,
    asyncHandler(async(req, res) => {
        if(Object.keys(req.body).length === 0) throw new Error('Missing input');
        const atrribute = await Attribute.create(req.body);
        res.status(200).json({
            success: atrribute ? true : false,
            message: atrribute ? 'Thêm thông số sản phẩm thành công!' : 'Đã xảy ra lỗi!'
        })
    })
)

attributeRoute.put(
    '/:aid',
    verifyAccessToken,
    isAdmin,
    asyncHandler(async(req, res) => {
        const {aid} = req.params;
        const updateAttr = await Attribute.findByIdAndUpdate(aid, {...req.body}, {new: true});
        res.status(200).json({
            success: updateAttr ? true : false,
            message: updateAttr ? 'Cập nhật thông số thành công!' : 'Đã xảy ra lỗi!'
        })

    })
)

attributeRoute.delete(
    '/:aid',
    verifyAccessToken,
    isAdmin,
    asyncHandler(async(req, res) => {
        const {aid} = req.params;
        const deleteAttr = await Attribute.findByIdAndDelete(aid, {new: true});
        res.status(200).json({
            success: deleteAttr ? true : false,
            deleteAttr: deleteAttr ? deleteAttr : 'Đã xảy ra lỗi!'
        })

    })
)

attributeRoute.get(
    '/:pid',
    asyncHandler(async(req, res) => {
        const {pid} = req.params;
        const attribute = await Attribute.findOne({product: pid});
        res.status(200).json({
            success: attribute ? true : false,
            attribute: attribute ? attribute : 'Đã xảy ra lỗi!'
        })

    })
)

export default attributeRoute;