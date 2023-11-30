import instance from "~/axios"

export const apiCreateAttribute= (data) => instance({
    url: '/attribute',
    method: 'post',
    data
})

export const apiGetAttribute= (pid) => instance({
    url: '/attribute/' + pid,
    method: 'get',
})

export const apiUpdateAttribute= (pid, data) => instance({
    url: '/attribute/' + pid,
    method: 'put',
    data
})