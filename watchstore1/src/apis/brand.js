import instance from "~/axios"

export const apiGetBrand = () => instance({
    url: '/brands',
    method: 'get',
})

export const apiCreateBrand = (data) => instance({
    url: '/brands',
    method: 'post',
    data
})

export const apiUpdateStatusBrand = (bid, data) => instance({
    url: `/brands/status/${bid}`,
    method: 'put',
    data
})

export const apiDeleteBrand = (bid) => instance({
    url: '/brands/' + bid,
    method: 'delete',
})