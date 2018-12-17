<template>
    <div class="lockScreen">
        <div class="lock-container">
            <div class="lock-avatar">
                <div class="avatar-cont">
                    <span class="user-avatar">
                        <img :src="genenrateAvatar(userId)" alt="">
                    </span>
                </div>
            </div>
            <div class="lock-form">
                <span class="username">
                    {{userName}}
                </span>
                <span class="password-cont">
                    <svg-icon icon-class="password" class="lock-icon"></svg-icon>
                    <el-input type="password" placeholder="输入密码解锁" @keyup.enter.native="handleUnlock" v-model="password"></el-input>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import Identicon from 'identicon.js'
    export default {
        name: "index",
        data() {
            return {
                userName: '',
                userId: '',
                password: ''
            }
        },
        created() {
            this.userName = this.$cookies.get('username')
            this.userId = this.$cookies.get('userId')
        },
        methods: {
            handleUnlock() {
                let qs = require('qs')
                let formData = qs.stringify({
                    "username": this.userName,
                    'password': this.password,
                    'grant_type': 'password',
                    'scope': 'SCOPES',
                    'client_id': 'OAUTH_CLIENT_ID',
                    'enctype': 'OAUTH_CLIENT_ID'
                })
                this.$store.dispatch('LoginByUsername', formData).then(() => {
                    this.$store.dispatch('toggleLock')
                    this.$router.push({ path: '/' })
                }).catch(() => {
                    this.loading = false
                    this.$notify({
                        title: '失败',
                        message: '解锁失败',
                        type: 'error',
                        duration: 1000
                    })
                })
            }
        },
        computed: {
            genenrateAvatar() {
                return function(hash) {
                    let options = {
                        foreground: [210, 82, 91, 255],               // 前景色
                        background: [255, 255, 255, 0],         // 背景色
                        margin: 0.2,                              // 20% margin
                        size: 40,                                // 40px square
                        format: 'svg'                             // use SVG instead of PNG
                    }
                    let data = new Identicon(hash, options).toString()
                    let src = 'data:image/svg+xml;base64,' + data
                    return src
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .lockScreen {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        background: url(./lockBack.jpg) center center fixed;
    }
    .lock-container {
        position: relative;
        margin: 15% auto 0;
        width: 400px;
        padding: 20px;
        background: rgba(0,0,0,0.2);
        .lock-avatar {
            width: 150px;
            height: 150px;
            background: #fff;
            padding: 10px;
            border-radius: 50%;
            position: absolute;
            top: -100px;
            left: 50%;
            margin-left:-75px;
            .avatar-cont{
                width: 100%;
                height: 100%;
                background: #ddd;
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .lock-form {
            margin-top: 28px;
            .username {
                font-size: 28px;
                font-family: 'Oswald';
                color: #fff;
            }
            .password-cont {
                display: block;
                margin: 20px 0 10px 0;
                position: relative;
                .lock-icon {
                    color: #777;
                    position: absolute;
                    top: 10px;
                    right: 8px;
                }
            }
        }
    }

</style>
