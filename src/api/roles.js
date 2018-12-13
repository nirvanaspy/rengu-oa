import request from '@/utils/request'


export function getRoles() {
    return request({
        url: 'SUGAR-USER-API/role',
        method: 'get',
    })
}

export function deleteRole(id) {
    return request({
        url: 'SUGAR-USER-API/role/' + id,
        method: 'delete',
    })
}

export function addRole(data) {
    return request({
        url: 'SUGAR-USER-API/role',
        method: 'post',
        data: data
    })
}

export function modifyRole(id, data) {
    return request({
        url: 'SUGAR-USER-API/role/' + id,
        method: 'put',
        data: data
    })
}

export function switchRole(id, data) {
    return request({
        url: 'SUGAR-USER-API/user/' + id + '/role',
        method: 'put',
        data: data
    })
}
