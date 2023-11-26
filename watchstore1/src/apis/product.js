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