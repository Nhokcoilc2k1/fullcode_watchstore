const path = {
    PUBLIC: '/',
    HOME: '/',
    ALL: '*',
    PRODUCTS: '/products',
    DETAILPRODUCT_CATEGORY_PID_TITLE: '/:pid/:title',
    DETAILPRODUCT:'/products/:pid',
    CART: '/cart/:id?',
    CONNTACT:  '/contact',
    PAYMENT: '/pay',
    ACCOUNT: '/account',
    ORDER: '/don-hang',
    ORDERDETAIL: '/checkout',
    FINALREGISTER: '/finalregister/:status',
    RESETPASSWORD: '/reset-password/:token',
}
// /:category/:pid/:title
export default path;