import request from '@/utils/request'

export function addExpenseForm(data) {
    return request({
        url: 'SUGAR-REIMBURSE-API/reimburse_form',
        method: 'post',
        data
    })
}

export function modifyExpenseForm( id, data) {
    return request({
        url: 'SUGAR-REIMBURSE-API/reimburse_form/' + id,
        method: 'put',
        data
    })
}

export function getExpenseFormByUser() {
    return request({
        url: 'SUGAR-REIMBURSE-API/reimburse_form',
        method: 'get'
    })
}

export function deleteExpenseForm(id) {
    return request({
        url: 'SUGAR-REIMBURSE-API/reimburse_form/' + id,
        method: 'delete'
    })
}

export function getExpenseFormById(id) {
    return request({
        url: 'SUGAR-REIMBURSE-API/reimburse/byReimburseFormId/' + id,
        method: 'get'
    })
}

export function newExpenseById(id, data) {
    return request({
        url: 'SUGAR-REIMBURSE-API/reimburse/byReimburseFormId/' + id,
        method: 'post',
        data
    })
}
export function deleteExpenseById(id) {
    return request({
        url: 'SUGAR-REIMBURSE-API/reimburse/' + id,
        method: 'delete'
    })
}
export function modifyExpenseById(id, data) {
    return request({
        url: 'SUGAR-REIMBURSE-API/reimburse/' + id,
        method: 'put',
        data
    })
}
