import instance from "~/axios"

export const apiRegister = (data) => instance({
    url: '/users/register',
    method: 'post',
    data,
    withCredentials: true,
})

export const apiLogin = (data) => instance({
    url: '/users/login',
    method: 'post',
    data
})

export const apiForgotPassword = (data) => instance({
    url: '/users/forgotpassword',
    method: 'post',
    data
})

export const apiResetPassword = (data) => instance({
    url: '/users/resetpassword',
    method: 'put',
    data
})

export const apiGetCurrent = () => instance({
    url: '/users/current',
    method: 'get',
})

export const apiUpdateCurrent = (data) => instance({
    url: '/users/current',
    method: 'put',
    data
})

export const apiUpdateCart = (data) => instance({
    url: '/users/updatecart',
    method: 'put',
    data
})

export const apiRemoveCart = (pid) => instance({
    url: '/users/remove-cart/' + pid,
    method: 'delete',
})

export const apiGetUsers = (params) => instance({
    url: '/users',
    method: 'get',
    params
})

export const apiDeleteUser = (uid) => instance({
    url: '/users/' + uid,
    method: 'delete',
})

export const apiUpdateUserByAdmin = (uid) => instance({
    url: '/users/' + uid,
    method: 'put',
})