import request from '@/utils/request'

export function addUser(data) {
    return request({
        // url: 'users/user',
        url: 'SUGAR-USER-API/user',
        method: 'post',
        data
    })
}
