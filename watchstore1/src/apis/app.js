import instance from "~/axios"

export const apiGetCategory = (bid) => instance({
    url: '/categorys',
    method: 'get',
})