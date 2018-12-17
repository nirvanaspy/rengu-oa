import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
export function getRefreshToken() {
    return Cookies.get('RefreshTokenKey')
}
export function setRefreshToken(token) {
    return Cookies.set('RefreshTokenKey', token)
}
export function removeToken() {
    return Cookies.remove(TokenKey)
}
export function setUserId(id) {
    return Cookies.set('userId', id)
}
export function removeUserId() {
    return Cookies.remove('userId')
}
