const path = {
    PUBLIC: '/',
    HOME: '/',
    ALL: '*',
    PRODUCTS: '/:category',
    DETAILPRODUCT_CATEGORY_PID_TITLE: '/:category/:pid/:title',
    DETAILPRODUCT:'/products/:pid',
    CART: '/cart/:id?',
    CONNTACT:  '/contact',
    PAYMENT: '/pay',
    ACCOUNT: '/account',
    ORDER: '/don-hang',
    ORDERDETAIL: '/checkout',
    FINALREGISTER: '/finalregister/:status',
    RESETPASSWORD: '/reset-password/:token',
    POST: '/post',
    POSTITEM: '/post/:poid/:title',
}
// /:category/:pid/:title
export default path;