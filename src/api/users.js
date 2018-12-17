import request from '@/utils/request'

export function getUsers() {
    return request({
        url: 'SUGAR-USER-API/user',
        method: 'get',
    })
}

export function getUser(id) {
    return request({
        url: 'SUGAR-USER-API/user/' + id,
        method: 'get',
    })
}

export function deleteUser(id) {
    return request({
        url: 'SUGAR-USER-API/user/' + id,
        method: 'delete',
    })
}

export function modifyUser(id, data) {
    return request({
        url: 'SUGAR-USER-API/user/' + id,
        method: 'put',
        data: data
    })
}

export function modifyPass(id, data) {
    return request({
        url: 'SUGAR-USER-API/user/' + id + '/password',
        method: 'put',
        data: data
    })
}

