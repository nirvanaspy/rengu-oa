<template>
    <div class="nav-container">
        <el-header>
            <div class="left-title">
                <img src="../../../public/img/favicon.png" alt="" class="rengu-logo">
                <i>RenGu OA System</i>
            </div>
            <div class="right-menu">
                <div class="mini-menu">
                    <el-dropdown class="avatar-container right-menu-item" trigger="click">
                        <div class="avatar-wrapper">
                            <span class="user-avatar">
                                <!--<svg-icon icon-class="LOGO"></svg-icon>-->
                                <img :src="genenrateAvatar(userId)" alt="">
                                <!--<svg-icon icon-class="plane"></svg-icon>-->
                            </span>
                            <!--<i class="el-icon-caret-bottom"></i>-->
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item style="display:block;">
                                <span @click="handlePersonalInfo">{{userName}}</span>
                            </el-dropdown-item>
                            <el-dropdown-item divided v-if="userName !== 'rengu'">
                                <span style="display:block;" @click="handleEditPas">修改密码</span>
                            </el-dropdown-item>
                            <el-dropdown-item divided>
                                <span style="display:block;" @click="handleLockScreen">锁定屏幕</span>
                            </el-dropdown-item>
                            <el-dropdown-item divided>
                                <span style="display:block;" @click="handleLogOut">退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <div class="menubar">
            <div class="left-menubar menu-icon">
                <span @click="toggleSidebar" :class="{active: isCollpase === true}" class="menu">
                    <svg-icon icon-class="menu"></svg-icon>
                    菜单
                </span>
            </div>
            <div class="right-menubar">
                <breadcrump></breadcrump>
            </div>
        </div>
        <!--修改密码弹框-->
        <el-dialog title="修改密码"
                   class="editDialog"
                   :visible.sync="editPasswordVisible"
                   width="30%">
            <el-form label-position="left" label-width="80px" :model="passwordInfo">
                <el-form-item label="原密码">
                    <el-input v-model="passwordInfo.oldPas"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="passwordInfo.newPas"></el-input>
                </el-form-item>
                <el-form-item label="再次输入">
                    <el-input v-model="passwordInfo.pasAgain"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="editPassword()">确 定</el-button>
            </span>
        </el-dialog>
        <!--个人信息弹框-->
        <el-dialog class="editDialog personInfoDialog"
                   :visible.sync="personalInfoDialog"
                   width="500px"
        >
            <div slot="title" style="position: relative">
                <span style="color: #fff;">用户信息</span>
                <span style="position: absolute;right: 24px;top:2px;color: #fff;cursor: pointer;color: #fff;"
                      @click="handleEditInfo">
                    <el-tooltip class="item" content="点击开始修改信息" placement="top-start" effect="light">
                        <svg-icon icon-class="edit"></svg-icon>
                    </el-tooltip>
                </span>
            </div>
            <div class="info-body" v-loading="loading">
                <el-row>
                    <el-col :span="8">
                        <div class="avatar-wrapper">
                            <span class="user-avatar">
                                <img :src="genenrateAvatar(userId)" alt="">
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="14" :offset="2">
                        <el-form class="info-wrapper" label-position="left" label-width="60px" :model="passwordInfo">
                            <el-form-item label="用户名">
                                <el-input v-model="personalInfo.username" v-if="editPersonInfo"></el-input>
                                <span class="personal-info-item" v-else>{{personalInfo.username}}</span>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input v-model="personalInfo.realname" v-if="editPersonInfo"></el-input>
                                <span class="personal-info-item" v-else>{{personalInfo.realname}}</span>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="personalInfo.email" v-if="editPersonInfo"></el-input>
                                <span class="personal-info-item" v-else>{{personalInfo.email}}</span>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="personalInfo.telephoneNum" v-if="editPersonInfo"></el-input>
                                <span class="personal-info-item" v-else>{{personalInfo.telephoneNum}}</span>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer" v-if="editPersonInfo">
                <el-button @click="editPersonInfo = false">取 消</el-button>
                <el-button type="primary" @click="editInfo()">确 定</el-button>
            </span>
            <span slot="footer" class="dialog-footer" v-else>
                <el-button @click="personalInfoDialog = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import breadcrump from '../../components/Breadcrumb/index'
    import { modifyPass, getUser } from '../../api/users'
    import { modifyUser } from '../../api/users';
    import Identicon from 'identicon.js'

    export default {
        name: "navbar",
        data() {
            return {
                loading: true,
                userName: '',
                userId: '',
                editPasswordVisible: false,
                personalInfoDialog: false,
                passwordInfo: {
                    oldPas: '',
                    newPas: '',
                    pasAgain: ''
                },
                personalInfo: {
                    username: '',
                    realname: '',
                    email: '',
                    telephoneNum: ''
                },
                editPersonInfo: false
            }
        },
        components: {
            breadcrump
        },
        created() {
            this.userName = this.$cookies.get('username')
            this.userId = this.$cookies.get('userId')
        },
        methods: {
            toggleSidebar() {
                this.$store.dispatch('toggleSideBar')
            },
            handleLogOut() {
                this.$store.dispatch('FedLogOut').then(() => {
                    location.reload()
                })
            },
            resetTemp() {
                this.passwordInfo.oldPas = ''
                this.passwordInfo.newPas = ''
                this.passwordInfo.pasAgain = ''
            },
            handleEditPas() {
                this.resetTemp()
                this.editPasswordVisible = true
            },
            editPassword() {
                var qs = require('qs');
                let data = {
                    'password': this.passwordInfo.newPas
                }
                let datapost = qs.stringify(data)
                modifyPass(this.userId, datapost).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '密码修改成功',
                        type: 'success',
                        duration: 2000
                    })
                }).catch(() => {
                    this.$notify({
                        title: '失败',
                        message: '密码修改失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            },
            getUserInfo() {
                getUser(this.userId).then((res) => {
                    this.personalInfo = res.data.data
                })
            },
            handlePersonalInfo() {
                this.personalInfoDialog = true
                getUser(this.userId).then((res) => {
                    this.personalInfo = res.data.data
                    this.loading = false
                })

            },
            handleEditInfo() {
                this.editPersonInfo = true
            },
            editInfo() {
                var qs = require('qs');
                let data = {
                    'username': this.personalInfo.username,
                    'email': this.personalInfo.email,
                    'telephoneNum': this.personalInfo.telephoneNum,
                    'realname': this.personalInfo.realname
                }
                let datapost = qs.stringify(data)
                modifyUser(this.userId, datapost).then((res) => {
                    this.getUserInfo()
                }).catch(() => {
                    this.$notify({
                        title: '失败',
                        message: '更新失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            },
            // 锁定屏幕
            handleLockScreen() {
                this.$store.dispatch('toggleLock')
                this.$router.push('lockScreen')
            }
        },
        computed: {
            isCollpase() {
                return !this.$store.getters.sidebar.opened
            },
            username() {
                console.log(this.$store.getters)
                return this.$store.getters.name
            },
            genenrateAvatar() {
                return function(hash) {
                    let options = {
                        foreground: [210, 82, 91, 255],               // 前景色
                        background: [255, 255, 255, 0],         // 背景色
                        margin: 0.2,                              // 20% margin
                        size: 40,                                // 420px square
                        format: 'svg'                             // use SVG instead of PNG
                    }
                    let data = new Identicon(hash, options).toString()
                    let src = 'data:image/svg+xml;base64,' + data
                    return src
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    .nav-container .el-header {
        // background: #24292e;
        background: #1d2935;
    }

    .left-title {
        float: left;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        font-weight: bold;
        text-shadow: 5px 5px 5px #999, 0px 0px 2px #999;
        color: #fff;
        .rengu-logo {
            width: 40px;
            height: 40px;
            position: relative;
            top: 10px;
            right: 6px;
        }
    }

    .right-menu {
        float: right;
        height: 40px;

        & :focus {
            outline: none;
        }

        .menu-icon {
            font-size: 20px;
            color: #fff;
        }
        .right-items {
            display: inline-block;
            margin-right: 10px;
            padding: 0 4px;
            cursor: pointer;
            color: #f5f5f5;
        }
        .right-menu-item {
            display: inline-block;
            margin: 0 8px;
        }
        .mini-menu {
            display: inline-block;
        }
        .avatar-container {
            height: 50px;
            // margin-right: 30px;

            .avatar-wrapper {
                cursor: pointer;
                margin-top: 10px;
                position: relative;

                .user-avatar {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 30px;
                    // border: 1px solid #f5f5f5;
                    // background: rgba(200, 200, 200, .5);
                    background: #fff;
                }
                /*.user-avatar {
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 40px;
                }*/

                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }

            }
        }
    }

    .menubar {
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        // background: #eee;
        background: rgb(36,50,65);
        border-top: 1px solid #374d63;
        cursor: pointer;
        .menu {
            color: #fff;
        }
        .menu-icon {
            // float: right;
            margin-right: 10px;
            font-size: 14px;
            span.active {
                color: #3da8f5
            }
        }
        .left-menubar {
            float: left;
        }
        .right-menubar {
            float: left;
            margin-left: 10px;
        }
    }
    .personal-cont,.calendar-cont {
        position: absolute;
        top: 60px;
        bottom: 30px;
    }
    .editDialog {
        .avatar-wrapper {
            position: relative;
            margin-bottom: 20px;
            width: 100%;
            .user-avatar {
                width: 100%;
                display: inline-block;
                /*width: 120px;
                height: 120px;*/
                border-radius: 50%;
                background: #eee;
                max-width: 140px;
                img {
                    /*width: 120px;
                    height: 120px;*/
                    width: 100%;
                    max-width: 140px;
                    max-height: 140px;
                }
            }
        }
    }
    .personInfoDialog {
        .info-body {
            height: 160px;
        }
       /* .avatar-wrapper, .info-wrapper {
            display: inline-block;
            margin-bottom: 0;
        }
        .avatar-wrapper {
            width: 30%;
            float: left;
            height: 160px;
        }
        .info-wrapper {
            width: 70%;
            height: 160px;
            float: left;
        }*/
        .personal-info-item {
            padding: 0 16px;
        }
    }
</style>
