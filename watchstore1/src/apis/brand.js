import instance from "~/axios"

export const apiGetBrand = () => instance({
    url: '/brands',
    method: 'get',
})