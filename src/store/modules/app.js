import Cookies from 'js-cookie'

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        },
        currentMode: {
            isdark: !+Cookies.get('nowMode')
        },
        lockScreen: {
            isLock: !+Cookies.get('isLock')
        }
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        },
        TOGGLE_MODE: state => {
            if (state.currentMode.isdark) {
                Cookies.set('nowMode', 1)
            } else {
                Cookies.set('nowMode', 0)
            }
            state.currentMode.isdark = !state.currentMode.isdark
        },
        TOGGLE_LOCK: state => {
            if (state.lockScreen.isLock) {
                Cookies.set('isLock', 1)
            } else {
                Cookies.set('isLock', 0)
            }
            state.lockScreen.isLock = !state.lockScreen.isLock
        },
    },
    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        toggleMode({ commit }) {
            commit('TOGGLE_MODE')
        },
        toggleLock({ commit }) {
            commit('TOGGLE_LOCK')
        }
    }
}

export default app
