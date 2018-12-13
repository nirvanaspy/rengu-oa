const getters = {
    sidebar: state => state.app.sidebar,
    currentMode: state => state.app.currentMode,
    token: state => state.user.token,
    name: state => state.user.name,
    status: state => state.user.status,
    roles: state => state.user.roles,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
}
export default getters
