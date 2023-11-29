import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
// import generateToken from '../utils/generateToken.js';
import protect, { isAdmin, verifyAccessToken } from '../Middleware/AuthMiddleware.js';
import {generateAccessToken, generateRefreshToken} from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import sendMail from '../utils/sendmail.js';
import crypto from 'crypto';
import makeToken from 'uniqid';
import Product from '../Models/ProductModel.js';

const usertRouter = express.Router();

// ĐOạn 2

// usertRouter.post(
//     '/register',
//     asyncHandler(async(req, res) => {
//         const {name, email, password, phone} = req.body;
//         const userExit = await User.findOne({email})
//         if(!(email && name && password && phone)) 
//         return res.status(400).json({
//             success: false,
//             message: 'Thiếu đầu vào',
//         })
//         if(userExit) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email đã được đăng kí. Vui lòng sử dụng email khác"
//             })
//         }else{
//             const newUser = await User.create(req.body)
//             return res.status(200).json({
//                 success: newUser ? true : false,
//                 message: newUser ? "Tạo tài khoản thành công. Vui lòng đăng nhập!" : "Đã xảy ra lỗi.Vui lòng thử lại!"
//             })
//         }
//     })
// )
usertRouter.post(
    '/register',
    asyncHandler(async(req, res) => {
        const {name, email, password, phone} = req.body;
        const userExit = await User.findOne({email})
        if(!(email && name && password && phone)) 
        return res.status(400).json({
            success: false,
            message: 'Thiếu đầu vào',
        })
        if(userExit) {
            return res.status(400).json({
                success: false,
                message: "Email đã được đăng kí. Vui lòng sử dụng email khác"
            })
        }else{
            const token = makeToken();
            res.cookie('dataregister', {...req.body, token}, {httpOnly: true, maxAge: 15 * 60 * 1000});
            const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng kí.Link này sẽ hết hạn sau 15 phút kể từ bây giờ <a href=
            ${process.env.URL_SERVER}/api/users/finalregister/${token}>Click here</a>`
            await sendMail({email, html, subject: 'Hoàn tất đăng kí tài khoản'})
            return res.json({
                success: true,
                message: 'Please check your email to active account',
            })
        }    
    })
)

usertRouter.get(
    '/finalregister/:token',
    asyncHandler(async(req, res) => {
        const cookie = req.cookies
        const {token} = req.params
        if(!cookie || cookie?.dataregister?.token !== token) {
            res.clearCookie('dataregister')
            return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
        }
        const newUser = await User.create({
            email: cookie.dataregister.email,
            name: cookie.dataregister.name,
            phone: cookie.dataregister.phone,
            password: cookie.dataregister.password,
        })
        res.clearCookie('dataregister');
        if(newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
        else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)

    })
)

// RefreshToken => cấp mới accessToken
// AccessToken => Xác thực người dùng, phân quyền người dùng
usertRouter.post(
    '/login',
    asyncHandler(async(req, res) => {
        const {email, password} = req.body;
        if(!(email && password )) 
        return res.status(400).json({
            success: false,
            message: 'Thiếu đầu vào',
        })
        const user = await User.findOne({email})
        if(user && (await user.matchPassword(password))){
            const {password, roles, refreshToken, ...userData} = user.toObject();
            const accessToken = generateAccessToken(user._id, roles)
            // Tạo refress token
            const newRefreshToken = generateRefreshToken(user._id);
            // Lưu refresh token vào database
            await User.findByIdAndUpdate(user._id, {refreshToken: newRefreshToken}, {new: true});
            // Lưu refresh token vào cookie
            res.cookie("refreshToken", refreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000})
            if(user.status){
                return res.status(200).json({
                    success: true,
                    accessToken,
                    userData
                })
            }else{
                return res.status(400).json("Tài khoản ngưng hoạt động. Vui lòng đăng nhập tài khoản khác")
            }
        }else{
            return res.status(400).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng. Vui lòng thử lại',
            });
        }
    })
)


usertRouter.get(
    '/current',
    verifyAccessToken,
    asyncHandler(async(req, res) => {
        const {_id} = req.user
        const user = await User.findById(_id).select('-refreshToken -password').populate({
            path: 'cart',
            populate: {
                path: 'product',
                select: 'name thumbnail sale_price'
            }
        })
 
        return res.status(200).json({
            success: user ? true : false,
            rs: user ? user : 'User not found'
        })
    })
)

usertRouter.post(
    '/refreshtoken',
    asyncHandler(async(req, res) => {
        // Lấy token từ cookies
        const cookie = req.cookies
        // Check xem có token hay không
        if(!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies');
        // Check xem có hợp lệ hay không
        const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
        const response = await User.findOne({_id: rs._id, refreshToken: cookie.refreshToken})
        return res.status(200).json({
                success: response ? true : false,
                newAccessToken: response ? generateAccessToken(response._id, response.roles) : 'refresh token not matched'
            })
    })
)

usertRouter.get(
    "/logout",
    asyncHandler(async(req, res) => {
        const cookie = req.cookies;
        if(!cookie || !cookie.refreshToken) throw new  Error("No refresh token in cookies")
        // Xóa refresh token ở db
        await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ""}, {new: true})
        // Xóa refresh token ở cookie trình duyệt
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true
        })
        return res.status(200).json({
            success: true,
            message: "Logout is done"
        })
    })
)

// client gửi email 
// server check email có hợp lệ không => gửi mail + kèm theo link (password change token)
// Client check mail-> click link
// client gửi api kèm token
// Check token có giống với token mà server gửi mail hay không
// Change password

usertRouter.post(
    '/forgotpassword',
    asyncHandler(async(req, res) => {
        const {email} = req.body
        if(!email) throw new Error("Missing email")
        const user = await User.findOne({email})
        if(!user) throw new Error("User not found");
        const resetToken = user.createPasswordChangeToken();
        await user.save();

        const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ <a href=
        ${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`

        const data = {
            email,
            html,
            subject:'Forgot password',
        }
        const rs = await sendMail(data);
        return res.status(200).json({
            success: rs.response?.includes('OK') ? true : false,
            message: rs.response?.includes('OK') ? "Hãy check mail của bạn." : "Đã xảy ra lỗi. Vui lòng thử lại sau."
        })
    })
)

usertRouter.put(
    '/resetpassword',
    asyncHandler(async(req, res) => {
        const {password, token} = req.body;
        if(!password || !token) throw new Error("Missing input")
        const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now() }});
        if(!user) throw new Error('Mã token đã hết hạn')
        user.password = password
        user.passwordResetToken = undefined;
        user.passwordChangedAt = Date.now();
        user.passwordResetExpires = undefined;
        await user.save();
        return res.status(200).json({
            success: user ? true : false,
            message: user ? "Mật khẩu đã được cập nhật": "Đã xảy ra sự cố"
        })

    })
)

usertRouter.get(
    '/',
    asyncHandler(async(req, res) => {
        const queries = {...req.query};
        const excludeFields = ['limit', 'sort', 'page', 'fields'];
        excludeFields.forEach(el => delete queries[el]);
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`);
        const formatedQueries = JSON.parse(queryString);

        //  Filtering
        if(queries?.name) formatedQueries.name = {$regex: queries.name, $options: 'i'}
        // const query = {}
        // if(req.query.q){
        //     query = {$or: [
        //         {name : {$regex: req.query.q, $options: 'i'}},
        //         {email : {$regex: req.query.q, $options: 'i'}}
        //     ]
        // }
        if(req.query.q){
            delete formatedQueries.q;
            formatedQueries['$or'] = [
                {name : {$regex: req.query.q, $options: 'i'}},
                {email : {$regex: req.query.q, $options: 'i'}}
            ]
        }
        
        let queryCommand = User.find(formatedQueries);
       
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

        const page = +req.query.page  || 1
        const limit = +req.query.limit  || process.env.LIMIT_PRODUCT
        const skip = (page - 1) * limit
        queryCommand = queryCommand.skip(skip).limit(limit)

        try {
            const response = await queryCommand.exec();
            const counts = await User.find(formatedQueries).countDocuments();
            return res.status(200).json({
              success: response ? true : false,
              users: response ? response : 'Cannot get products',
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

usertRouter.delete(
    '/:uid',
    verifyAccessToken,
    isAdmin,
    asyncHandler(async(req, res) => {
        const {uid} = req.params;
        const response = await User.findByIdAndDelete(uid);
        return res.status(200).json({
            success: response ? true : false,
            message: response ? `Người dùng với email ${response.email} đã được xóa` : 'Không có người dùng để xóa'
        })
    })
)

usertRouter.put(
    '/current',
    verifyAccessToken,
    asyncHandler(async(req, res) => {
        const {_id} = req.user;
        if(!_id || Object.keys(req.body).length === 0) throw new Error("Missing input");
        if(req.body.roles) delete req.body.roles;
        const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-password -roles');
        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response ? response : 'Đã xảy ra sự cố'
        })
    })
)

usertRouter.put(
    '/updatecart',
    verifyAccessToken,
    asyncHandler(async(req, res) => {
        const {_id} = req.user;
        const {pid, quantity = 1, action, name, sale_price, thumbnail,} = req.body;
        if(!pid || !action) throw new Error('Missing input');
        const product = await Product.findById(pid).select('quantity')
        const user = await User.findById(_id).select('cart');
        const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)
        if(alreadyProduct){
            let newQuantity = alreadyProduct.quantity;
            if (action === 'increase') {
                newQuantity += 1;
                if (newQuantity > product.quantity) {
                  newQuantity = product.quantity;
                }
              } else if (action === 'decrease') {
                newQuantity -= 1;
                if (newQuantity < 1) {
                  newQuantity = 1;
                }
              } else {
                throw new Error('Invalid action');
              }
           
            const response = await User.updateOne({cart: {$elemMatch : alreadyProduct}}, {$set: {"cart.$.quantity" : newQuantity, "cart.$.sale_price" : sale_price, "cart.$.name" : name, "cart.$.thumbnail" : thumbnail}}, {new : true})
            return res.status(200).json({
                success: response ? true : false,
                message: response ? 'Thêm sản phẩm thành công' : 'Đã xảy ra lỗi!'
            })
        }else{
            const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quantity, sale_price, name, thumbnail}}}, {new : true})
            return res.status(200).json({
                success: response ? true : false,
                message: response ? 'Thêm sản phẩm thành công' : 'Đã xảy ra lỗi!'
            })
        }
    })
)

// usertRouter.put(
//     '/:uid',
//     verifyAccessToken,
//     isAdmin,
//     asyncHandler(async(req, res) => {
//         const {uid} = req.params;
//         const {status} = req.body;
//         if(!uid || !status) throw new Error("Missing input");
//         const user = await User.findByIdAndUpdate(uid, {status: status}, {new: true}).select('-password -roles -refreshToken');
//         return res.status(200).json({
//             success: user ? true : false,
//             message: user ? 'Cập nhật người dùng thành công' : 'Đã xảy ra lỗi!'
//         })
//     })
// )


usertRouter.delete(
    '/remove-cart/:pid',
    verifyAccessToken,
    asyncHandler(async(req, res) => {
        const {_id} = req.user;
        const { pid } = req.params;
        const user = await User.findById(_id).select('cart');
        const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid);
        if(!alreadyProduct){
            return res.status(200).json({
                success:  true ,
                message: 'Cập nhật giỏ hàng thành công' 
            })
        }
        const response = await User.findByIdAndUpdate(_id, {$pull: {cart: {product: pid}}}, {new : true})
            return res.status(200).json({
                success: response ? true : false,
                message: response ? 'Thêm sản phẩm thành công' : 'Đã xảy ra lỗi!'
            })
    })
)

export default usertRouter;