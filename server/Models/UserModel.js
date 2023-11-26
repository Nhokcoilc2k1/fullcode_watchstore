import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import crypto from "crypto";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        // require: true,
    },
    roles: {
        type: String,
        require: true,
        default: 'user',
    },
    status: {
        type: Boolean,
        require: true,
        default: true,
    },
    cart: [{
        product: {type: mongoose.Types.ObjectId, ref: 'Product'},
        quantity: Number,
    }],
    refreshToken: {
        type: String,
    },
    passwordChangedAt:{
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: String
    },
    registerToken: {
        type: String
    }
},{
    timestamps: true
})

// Login
// so sánh mật khẩu nhập vào với mật khẩu đã được mã hóa của người dùng.
userSchema.methods = {
    matchPassword : async function (enterPassword){
        return await bcrypt.compare(enterPassword, this.password);
    },
    createPasswordChangeToken : function (){
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
};

// Register
// Quy trình băm password, tạo muối(mã hóa password)
//Thực thi trước khi đối tượng được lưu hoặc cập nhật vào csdl (save)
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){ //kiểm tra xem pass có thay đổi không
        next();//không thay đổi tiếp tục xử lí tiếp theo
    }
    const salt = bcrypt.genSaltSync(10); // tạo một muối salt ngẫu nhiên với độ dài bằng 10/ sử dụng trog mã hóa mk
    this.password = await bcrypt.hash(this.password, salt);// mã hóa mk với salt và gtri mã hóa vào password
})

const User = mongoose.model("User", userSchema)

export default User;