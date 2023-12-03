import jwt from 'jsonwebtoken';

// Tạo ra chuỗi token. đối số 1 là payload, 2 khóa bí mật dùng để kí và xác minh token, 3 thời gian hết hạn của token
// const generateToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET,{
//         expiresIn: "1d",
//     });
// };

const generateAccessToken = (id, roles) => jwt.sign({_id: id, roles}, process.env.JWT_SECRET, {expiresIn: '7d'});
const generateRefreshToken = (id) => jwt.sign({_id: id}, process.env.JWT_SECRET, {expiresIn: '10d'});

export  { generateAccessToken, generateRefreshToken};