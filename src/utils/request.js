import axios from 'axios'
import store from '@/store/index.js'
import Cookies from 'js-cookie'
const ip = Cookies.get('ip')
const port = Cookies.get('port')
let serviceConfig
if(ip && port) {
    serviceConfig = 'http://' + ip + ':' + port
} else {
    serviceConfig = 'http://127.168.31.134:8080'
}

const service = axios.create({
    baseURL: serviceConfig
})


service.interceptors.request.use(config => {
    // Do something before request is sent
    if (store.getters.token) {
        config.headers['Authorization'] = 'Bearer ' + store.getters.token// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        // config.headers['Authorization'] = 'Bearer ' + store.getters.token // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})


service.interceptors.response.use(
    response => response,
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
        //  const res = response.data;
        //     if (res.code !== 20000) {
        //       Message({
        //         message: res.message,
        //         type: 'error',
        //         duration: 5 * 1000
        //       });
        //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //           confirmButtonText: '重新登录',
        //           cancelButtonText: '取消',
        //           type: 'warning'
        //         }).then(() => {
        //           store.dispatch('FedLogOut').then(() => {
        //             location.reload();// 为了重新实例化vue-router对象 避免bug
        //           });
        //         })
        //       }
        //       return Promise.reject('error');
        //     } else {
        //       return response.data;
        //     }
    error => {
        console.log('err' + error)// for debug
        return Promise.reject(error)
    })

export default service
