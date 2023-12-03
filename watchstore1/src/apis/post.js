import instance from "~/axios"

export const apiGetPosts = (params) => instance({
    url: '/posts',
    method: 'get',
    params
})

export const apiGetPost = (poid) => instance({
    url: '/posts/' + poid,
    method: 'get',
})

