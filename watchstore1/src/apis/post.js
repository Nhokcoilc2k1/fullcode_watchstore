import instance from "~/axios"

export const apiGetPost = () => instance({
    url: '/posts',
    method: 'get',
})
