<template>
    <div class="login-container">
        <linecanvas></linecanvas>
        <div class="content">
            <div class="logo">
        <span class="svg-container">
          <svg-icon icon-class="logo1" />
        </span>
            </div>
            <div class="title-container">
                <h3 class="title">仁谷OA管理系统登录</h3>
            </div>
            <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
                <div class="ipContainer">
                    <el-form-item prop="ipConfig" class="ipform">
            <span class="svg-container svg-container_ip">
              <svg-icon icon-class="IP" />
            </span>
                        <el-input name="ipConfig" type="text" v-model="loginForm.ipConfig" autoComplete="on" placeholder="IP地址" />
                    </el-form-item>
                    <el-form-item prop="port" class="portform">
            <span class="svg-container">
              <svg-icon icon-class="port" />
            </span>
                        <el-input name="port" type="text" v-model="loginForm.port" autoComplete="on" placeholder="端口号" />
                    </el-form-item>
                </div>
                <el-form-item prop="username" class="userform">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
                    <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
                </el-form-item>

                <el-form-item prop="password" class="passwordform">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
                    <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
                    <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
                </el-form-item>

                <el-button type="primary" style="width:100%;margin-bottom:20px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
                <div class="register-container">
                    <span class="register-tips">没有账号？</span>
                    <span class="register-btn" @click="jumpToRegister">注册</span>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { loginByUsername } from '@/api/login';
    import { isvalidUsername } from '@/utils/validate'
    import service from '@/utils/request'
    import linecanvas from '../../components/Canvas_line/index.vue'
    export default {
        name: 'login',
        components: {
          linecanvas
        },
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!isvalidUsername(value)) {
                    callback(new Error('请输入正确的用户名！'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 1) {
                    callback(new Error('请输入正确的密码！'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: 'rengu',
                    password: 'rengu',
                    ipConfig: '192.168.31.134',
                    port: 8080
                },
                loginRules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
                },
                passwordType: 'password',
                loading: false,
                showDialog: false
            }
        },
        methods: {
            jumpToRegister() {
                this.$router.replace('/register')
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    let username = this.loginForm.username
                    let password = this.loginForm.password
                    let ip = this.loginForm.ipConfig
                    let port = this.loginForm.port
                    if (valid) {
                        this.loading = true
                        this.$cookies.set('username', username)
                        this.$cookies.set('ip', ip)
                        this.$cookies.set('port', port)
                        service.defaults.baseURL = 'http://' + ip + ':' + port // 动态设置api接口

                        let qs = require('qs');
                        let formData = qs.stringify({
                            "username": username,
                            'password': password,
                            'grant_type': 'password',
                            'scope': 'SCOPES',
                            'client_id': 'OAUTH_CLIENT_ID',
                            'enctype': 'OAUTH_CLIENT_ID'
                        })
                        this.$store.dispatch('LoginByUsername', formData).then(() => {
                            this.loading = false
                            this.$router.push({ path: '/' })
                        }).catch(() => {
                            this.loading = false
                            this.$notify({
                                title: '失败',
                                message: '登录失败',
                                type: 'error',
                                duration: 1000
                            })
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        },
        created() {
            if(this.$cookies.get('username')) {
                this.loginForm.username = this.$cookies.get('username')
            }
            if(this.$cookies.get('ip')) {
                this.loginForm.ipConfig = this.$cookies.get('ip')
            }
            if(this.$cookies.get('port')) {
                this.loginForm.port = this.$cookies.get('port')
            }
        },
        mounted() {
        },
        destroyed() {
        }
    }
</script>

<style scoped>
    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #f9f9f9;
    }
    .login-container .content{
        margin:40px auto;
    }
    .logo{
        text-align: center;
        font-size: 60px;
        margin-bottom: 30px;
        cursor: pointer;
    }
    .login-container .el-form-item {
        margin-bottom: 24px;
    }
    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 24%;
        padding: 35px 20px 15px 20px;
        margin: 0 auto;
        background-color: #fff;
        border:1px solid #ccc;
        border-radius:8px;
        box-shadow: 0 6px 8px rgba(26, 26, 26, 0.2);
    }
    .login-form input.el-input__inner {
        padding-left: 30px !important;
        padding-right: 30px !important;
    }
    .title-container {
        position: relative;
    }
    .title {
        font-size: 18px;
        /*font-weight: 400;*/
        color: #000;
        margin: 0px auto 10px auto;
        text-align: center;
        /*font-weight: bold;*/
    }
    .ipform, .portform, .userform, .passwordform {
        position: relative;
    }
    .login-form span.svg-container{
        position: absolute;
        z-index:99;
        top:0;
        left:6px;
    }
    .show-pwd {
        position: absolute;
        z-index:99;
        top:0;
        right: 8px;
    }
    .register-container{
        text-align: center;
        font-size: 14px;
    }
    .register-container .register-btn{
        color: #409EFF;
        cursor: pointer;
    }
</style>
