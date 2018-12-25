import {loginByUsername, logout, getUserInfo} from '@/api/login'
import {getToken, getRefreshToken, setToken, setRefreshToken, removeToken, setUserId, removeUserId} from '@/utils/auth'

const jwt = require('jsonwebtoken')

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        refreshToken: getRefreshToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        ipconfig: '',
        port: '',
        loginname: '',
        userId: ''
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_REFRESHTOKEN: (state, token) => {
            state.refreshToken = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_LOGINNAME: (state, loginname) => {
            state.loginname = loginname
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        }
    },
    /* eslint-disable */
    actions: {
        LoginByUsername({commit}, formData) {
            return new Promise((resolve, reject) => {
                loginByUsername(formData).then(response => {
                    const access_token = response.data.access_token
                    const refresh_token = response.data.refresh_token
                    commit('SET_TOKEN', access_token)
                    commit('SET_REFRESHTOKEN', refresh_token)
                    setToken(access_token)
                    setRefreshToken(refresh_token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息 原始版本
        /*GetUserInfo({ commit, state }) {
          return new Promise((resolve, reject) => {
            getUserInfo(state.token).then(response => {
              if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                reject('error')
                /!*console.log('getUserInfoError')*!/
              }
              const data = response.data
              commit('SET_ROLES', data.roles)
              commit('SET_NAME', data.name)
              commit('SET_AVATAR', data.avatar)
              commit('SET_INTRODUCTION', data.introduction)
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },*/
        GetUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                if (!state.token) {
                    reject('error')
                    console.log('hasNoToken')
                }
                const data = state.token
                const refreshToken = state.refreshToken
                const decodeToken = jwt.decode(data)
                const decodeRefreshToken = jwt.decode(refreshToken)
                // const rolesset = decodeToken.authorities.length > 1 ? 'admin' : 'editor'
                const rolesset = decodeToken.authorities
                const roleArr = []
                rolesset.forEach((item) => {
                    roleArr.push(item.substring(5))
                })
                commit('SET_ROLES', roleArr)
                /*if(rolesset.indexOf('ROLE_admin') >= 0) {
                    console.log(1)
                    commit('SET_ROLES', ['admin'])
                } else {
                    commit('SET_ROLES', ['editor'])
                }*/
                const userId = decodeToken.userId
                commit('SET_USERID', userId)
                setUserId(userId)
                resolve()
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                removeUserId()
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({commit}, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    resolve()
                })
            })
        }
    }
}

export default user
