import request from '@/utils/request'

export function loginByUsername(data) {
    return request({
        url: '/SUGAR-AUTHORIZATION-SERVER/oauth/token',
        // url: '/oauth/token',
        method: 'post',
        auth: {
            username: 'OAUTH_CLIENT_ID',
            password: 'OAUTH_CLIENT_SECRET'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function getUserInfo(token) {
    return request({
        url: '/users/login',
        method: 'get',
        auth:{
            username:'admin',
            password:'admin'
        }
        /*params: { token }*/
    })
}
