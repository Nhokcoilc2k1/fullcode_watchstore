import instance from "~/axios"

export const apiGetCategory = () => instance({
    url: '/categorys',
    method: 'get',
})