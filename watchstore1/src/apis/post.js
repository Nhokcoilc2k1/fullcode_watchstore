import instance from "~/axios"

export const apiGetPosts = (params) => instance({
    url: '/posts',
    method: 'get',
    params
})

export const apiGetSinglePost = (poid) => instance({
    url: '/posts/' + poid,
    method: 'get',
})

export const apiGetPost = (poid) => instance({
    url: '/posts/' + poid,
    method: 'get',
})


export const apiCreatePost = (data) => instance({
    url: '/posts' ,
    method: 'post',
    data
})

export const apiUpdateStatusPost = (poid, data) => instance({
    url: '/posts/status/' + poid,
    method: 'put',
    data
})

export const apiDeletePost = (poid) => instance({
    url: '/posts/' + poid,
    method: 'delete',
})

export const apiUpdatePost = (poid, data) => instance({
    url: '/posts/' + poid,
    method: 'put',
    data
})


