import instance from "~/axios"

export const apiGetCategory = (params) => instance({
    url: '/categorys',
    method: 'get',
    params
})

export const apiCreateCategory = (data) => instance({
    url: '/categorys',
    method: 'post',
    data
})

export const apiUpdateStatusCategory = (cid, data) => instance({
    url: '/categorys/status/' + cid,
    method: 'put',
    data
})

export const apiDeleteCategory = (cid) => instance({
    url: '/categorys/' + cid,
    method: 'delete',
})

export const apiUpdateCategory = (cid, data) => instance({
    url: '/categorys/' + cid,
    method: 'put',
    data
})