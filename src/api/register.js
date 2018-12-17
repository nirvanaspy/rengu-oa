import request from '@/utils/request'

export function addUser(data) {
    return request({
        // url: 'users/user',
        url: 'SUGAR-USER-API/user',
        method: 'post',
        data
    })
}

export function testEmail(email) {
    return request({
        url: 'SUGAR-USER-API/user/has-email',
        method: 'get',
        params: {
            email: email
        }
    })
}
