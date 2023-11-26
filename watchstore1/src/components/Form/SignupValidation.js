import * as Yup from 'yup';

const phoneRegExp = /^(03[2-9]|05[2689]|07[06-9]|08[1-9]|09[0-9]|01[2-9])[0-9]{7}$/;


export const loginValidation = Yup.object({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
})

export const registerValidation = Yup.object({
    name: Yup.string().matches(/^[^\s].*$/, 'Không được nhập dấu cách đầu').min(3, 'Họ tên phải có ít nhất 3 kí tự').required('Vui lòng nhập họ và tên'),
    phone: Yup.number().typeError('Số điện thoại phải là số').min(8, 'Số điện thoại phải có ít 8 kí tự').required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string().matches(/^\S*$/, 'Không được nhập dấu cách').min(5, 'Mật khẩu phải có ít nhất 5 kí tự').required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Vui lòng nhập lại mật khẩu'),
});


export const shipAddressValidation = Yup.object({
    name: Yup.string().min(3, 'Họ tên phải có ít nhất 3 kí tự').required('Vui lòng nhập đầy đủ họ và tên'),
    phone: Yup.string().typeError('Số điện thoại phải là số').matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Vui lòng nhập đúng số điện thoại'),
    address: Yup.string().min(10, 'Địa chỉ phải có ít nhất 10 kí tự').required('Vui lòng nhập chính xác địa chỉ'),
})

export const createProductValidation = Yup.object({
    name: Yup.string().required('Vui lòng nhập tên sản phẩm'),
    price: Yup.string().matches(/^[1-9][0-9]*$/, 'Giá không hợp lệ').required('Vui lòng nhập giá gốc sản phẩm'),
    sale_price: Yup.number().typeError('Giá không chứa chữ cái').required('Vui lòng nhập giá bán sản phẩm'),
    quantity: Yup.number().typeError('Số lượng không chứa chữ cái').required('Vui lòng số lượng sản phẩm'),
    category: Yup.string().required('Vui lòng chọn danh mục'),
    brand: Yup.string().required('Vui lòng chọn nhãn hiệu'),
    // thumbnail: Yup.string().required('Vui lòng chọn ảnh'),
    // images: Yup.array().of(Yup.string().required("Vui lòng chọn ít nhất một file")),
})

export const accountValidation = Yup.object({
    name: Yup.string().min(3, 'Họ tên phải có ít nhất 3 kí tự').required('Vui lòng nhập đầy đủ họ và tên'),
    phone: Yup.string().typeError('Số điện thoại phải là số').matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Vui lòng nhập đúng số điện thoại'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
})

