import express from 'express';
import asyncHandler from 'express-async-handler';
import Post from '../Models/PostModel.js';
import protect, { isAdmin, verifyAccessToken } from '../Middleware/AuthMiddleware.js';
import uploadCloud from '../config/cloudinaryConfig.js';

const postRoute = express.Router();

postRoute.post(
    "/",
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
        {name: 'image', maxCount: 1},
    ]),
    asyncHandler(async(req, res) => {
        const {title, content, status, description} = req.body;
        const postExit = await Post.findOne({title})
        if(postExit) throw new Error("Mã danh mục đã tồn tại");
        if(!title) throw new Error("Đầu vào không hợp lệ");
        const image = req?.files?.image[0].path
        const post = new Post({
            title,
            content,
            status,
            description,
            image
        })
        const newPost = await post.save();
        res.status(200).json({
            success: newPost ? true : false,
            message: newPost ? 'Tạo bài viết thành công!' : 'Đã xảy ra lỗi!'
        })
        
    })
)

postRoute.put(
    "/:poid",
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
        {name: 'image', maxCount: 1},
    ]),
    asyncHandler(async(req, res) => {
        const { poid } = req.params;
        const files = req?.files
        if(files?.image) req.body.image = files?.image[0]?.path;
        const updatePost = await Post.findByIdAndUpdate(poid, {...req.body}, {new: true})
        return res.status(200).json({
            success: updatePost ? true : false,
            message: updatePost ? 'Cập nhật bài viết thành công!' : 'Đã xảy ra lỗi!'
        })
    })
    )

// UPDATE STATUS post
postRoute.put(
    "/status/:poid",
    verifyAccessToken,
    isAdmin,
    asyncHandler(async (req, res) => {
       const {poid} = req.params;
       const {status} = req.body;
        const updatePost = await Post.findByIdAndUpdate(poid, {status: status}, {new: true})
        res.status(200).json({
            success: updatePost ? true : false,
            message: updatePost ? updatePost : 'Đã xảy ra lỗi!'
        })

    })
)


postRoute.delete(
    "/:poid",
    verifyAccessToken,
    isAdmin,
    asyncHandler(async (req, res) => {
        const { poid } = req.params;
        const response = await Post.findByIdAndDelete(poid, {new : true});
        res.status(200).json({
            success: response ? true : false,
            message: response ? 'Xóa bài viết thành công!' : 'Đã xảy ra lỗi!'
        })
}))


postRoute.get(
    "/",
    asyncHandler(async(req, res) => {
        const queries = {...req.query};
        const excludeFields = ['limit', 'sort', 'page', 'fields'];
        excludeFields.forEach(el => delete queries[el]);
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`);
        const formatedQueries = JSON.parse(queryString);

        if(queries?.name) formatedQueries.name = {$regex: queries.name, $options: 'i'}

        if(req.query.q){
            delete formatedQueries.q;
            formatedQueries['$or'] = [
                {title : {$regex: req.query.q, $options: 'i'}},
                // {coupon_code : {$regex: req.query.q, $options: 'i'}}
            ]
        }

        let queryCommand = Post.find(formatedQueries);

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
            const counts = await Post.find(formatedQueries).countDocuments();
            return res.status(200).json({
              success: response ? true : false,
              posts: response ? response : 'Cannot get posts',
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

postRoute.get(
    '/:poid',
    asyncHandler(async(req, res) => {
        const { poid } = req.params;
        const post = await Post.findById(poid);
        res.status(200).json({
            success: post ? true : false,
            post: post ? post : 'Đã xảy ra lỗi'
        })
    })
)

export default postRoute;