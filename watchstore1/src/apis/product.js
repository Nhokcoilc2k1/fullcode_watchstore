import instance from "~/axios";

export const apiGetProducts = (params) => instance({
    url: '/products/',
    method: 'get',
    params
})

export const apiGetProduct = (pid) => instance({
    url: `/products/${pid}`,
    method: 'get'
})

export const apiUpdateReview = (data) => instance({
    url: `/products/ratings`,
    method: 'put',
    data
})

export const apiCreateProduct = (data) => instance({
    url: `/products`,
    method: 'post',
    data
})

export const apiUpdateProduct = (data, pid) => instance({
    url: `/products/${pid}`,
    method: 'put',
    data
})

export const apiDeleteProduct = (pid) => instance({
    url: `/products/${pid}`,
    method: 'delete',
})

export const apiCreateOrder = (data) => instance({
    url: `/orders/`,
    method: 'post',
    data
})

export const apiGetOrderByUser = () => instance({
    url: `/orders/`,
    method: 'get',
})

export const apiGetOrder = (params) => instance({
    url: `/orders/admin`,
    method: 'get',
    params
})

export const apiDeleteOrderUser = (oid) => instance({
    url: `/orders/${oid}`,
    method: 'delete',
})

export const apiUpdateOrderByAdmin = (oid, data) => instance({
    url: `/orders/status/${oid}`,
    method: 'put',
    data
})

export const apiGetAttribute = (pid) => instance({
    url: `/attribute/${pid}`,
    method: 'get'
})
