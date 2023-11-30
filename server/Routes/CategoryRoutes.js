import express from 'express';
import asyncHandler from 'express-async-handler'
import Category from '../Models/CategoryModel.js';
import { isAdmin, verifyAccessToken } from '../Middleware/AuthMiddleware.js';
import uploadCloud from '../config/cloudinaryConfig.js';

const categoryRoutes = express.Router();

// GET ALL BRAND
categoryRoutes.get(
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
        let queryCommand = Category.find(formatedQueries);

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
            const counts = await Category.find(formatedQueries).countDocuments();
            return res.status(200).json({
              success: response ? true : false,
              categorys: response ? response : 'Cannot get categorys',
              pagination: {
                  counts,
                  page,
                  limit,
              }
            });
          } catch (err) {
            throw new Error(err.message);
          }
    // const categorys = await Category.find({});
    // res.json(categorys);
}))

// GET SINGLE BRAND
categoryRoutes.get(
    "/:id", 
    asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
        success: category ? true : false,
        message: category ? category : 'Đã xảy ra lỗi'
    })
}))

// POST BRAND
categoryRoutes.post(
    "/", 
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
        {name: 'image', maxCount: 1},
    ]),
    asyncHandler(async(req, res) => {
        const {name, status, description} = req.body;
        const categoryExit = await Category.findOne({name})
        if(categoryExit) throw new Error("Mã danh mục đã tồn tại");
        if(!name) throw new Error("Đầu vào không hợp lệ");
        const image = req?.files?.image[0].path
        const category = new Category({
            name,
            status,
            description,
            image
        })
        const newCategory = await category.save();
        res.status(200).json({
            success: newCategory ? true : false,
            message: newCategory ? 'Thêm danh mục thành công!' : 'Đã xảy ra lỗi'
        })
    }))

// UPDATE BRAND
categoryRoutes.put(
    "/:id",
    asyncHandler(async(req, res) => {
        const {name, status, description, image} = req.body;
        const category = await Category.findById(req.params.id);
         
        if(category){
            category.name = name;
            category.status = status;
            category.description = description;
            category.image = image;
            const updateProduct = await category.save();
            res.json(updateProduct);
        }else{
            res.status(404);
            throw new Error('category not found');
        }
    })
    )

categoryRoutes.put(
    '/status/:cid',
    verifyAccessToken,
    isAdmin,
    asyncHandler(async(req, res) => {
        const {cid} = req.params;
        const {status} = req.body;
        const updateCate = await Category.findByIdAndUpdate(cid, {status: status}, {new: true})
        res.status(200).json({
            success: updateCate ? true : false,
            message: updateCate ? updateCate : 'Đã xảy ra lỗi!'
        })
    })
)

// DELETE BRAND
categoryRoutes.delete(
    "/:cid",
    verifyAccessToken,
    isAdmin,
    asyncHandler(async (req, res) => {
        const { cid } = req.params;
        const response = await Category.findByIdAndDelete(cid, {new : true});
        res.status(200).json({
            success: response ? true : false,
            message: response ? 'Xóa danh mục thành công!' : 'Đã xảy ra lỗi!'
        })
    }))

// SEARCH 
categoryRoutes.get(
    "/search/:keyword",
    asyncHandler(async (req, res) => {
        let listOfCategory = await Category.find({
            name : {$regex : new RegExp(req.params.keyword, 'i')}
        })
        if(listOfCategory){
            res.status(200).json(listOfCategory)
        }else{
            res.status(404);
            throw new Error("not find category")
        }
    })
)
    
export default categoryRoutes;
