import instance from "~/axios"

export const apiCreatePromotion = (data) => instance({
    url: '/promotions',
    method: 'post',
    data
})

export const apiDeletePromotion = (proid) => instance({
    url: '/promotions/' + proid,
    method: 'delete',
})