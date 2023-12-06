import instance from "~/axios"

export const apiGetPromotion = (params) => instance({
    url: '/promotions',
    method: 'get',
    params
})

export const apiGetSinglePromotion = (proid) => instance({
    url: '/promotions/' + proid,
    method: 'get',
})

export const apiCreatePromotion = (data) => instance({
    url: '/promotions',
    method: 'post',
    data
})

export const apiDeletePromotion = (proid) => instance({
    url: '/promotions/' + proid,
    method: 'delete',
})

export const apiUpdateStatusPromotion = (proid, data) => instance({
    url: `/promotions/status/${proid}`,
    method: 'put',
    data
})

export const apiUpdatePromotion = (proid, data) => instance({
    url: `/promotions/${proid}`,
    method: 'put',
    data
})