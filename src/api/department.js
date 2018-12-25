import request from '@/utils/request'

export function getDepartment() {
    return request({
        url: 'SUGAR-USER-API/department',
        method: 'get',
    })
}

export function addDepartment(data) {
    return request({
        url: 'SUGAR-USER-API/department',
        method: 'post',
        data
    })
}

export function deleteDepartment(id) {
    return request({
        url: 'SUGAR-USER-API/department/' + id,
        method: 'delete',
    })
}

export function modifyDepartment(id, data) {
    return request({
        url: 'SUGAR-USER-API/department/' + id,
        method: 'put',
        data
    })
}

export function addDepaMembers(id, data) {
    return request({
        url: 'SUGAR-USER-API/department/' + id + '/saveMember',
        method: 'post',
        data
    })
}
