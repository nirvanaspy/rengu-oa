<template>
    <div class="nav-container">
        <el-header>
            <div class="left-title">
                <img src="../../../public/img/favicon.png" alt="" class="rengu-logo">
                <i>RenGu OA System</i>
            </div>
            <div class="right-menu">
                <div class="calendary right-items">
                    <!--<svg-icon icon-class="form"></svg-icon>-->
                    日历
                </div>
                <div class="mine right-items" @click="showPersonalDialog">
                    <!--<svg-icon icon-class="people"></svg-icon>-->
                    我的
                </div>
                <div class="mini-menu">
                    <el-dropdown class="avatar-container right-menu-item" trigger="click">
                        <div class="avatar-wrapper">
                            <span class="user-avatar">
                                <svg-icon icon-class="LOGO"></svg-icon>
                                <!--<svg-icon icon-class="plane"></svg-icon>-->
                            </span>
                            <!--<i class="el-icon-caret-bottom"></i>-->
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item style="display:block;">
                                <span>{{userName}}</span>
                            </el-dropdown-item>
                            <el-dropdown-item divided>
                                <span style="display:block;">修改密码</span>
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
        <!--<div class="dialog-cont">
            <el-dialog
                    title="提示"
                    :visible.sync="personalDialogVisible"
                    width="100%">
                <div class="personal-nav">

                </div>
                &lt;!&ndash;<span slot="footer" class="dialog-footer">
                    <el-button @click="personalDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="personalDialogVisible = false">确 定</el-button>
                </span>&ndash;&gt;
            </el-dialog>
        </div>-->
        <div class="personal-cont" style="width:100%;background: #000" v-if="personalDialogVisible">
            这是一个个人弹窗
        </div>
        <div class="calendar-cont" style="width:100%;background: #000" v-if="calendarDialogVisible">
            这是一个个人弹窗
        </div>
    </div>
</template>

<script>
    import breadcrump from '../../components/Breadcrumb/index'

    export default {
        name: "navbar",
        data() {
            return {
                userName: '',
                personalDialogVisible: false,
                calendarDialogVisible: false
            }
        },
        components: {
            breadcrump
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
            showPersonalDialog() {
                this.calendarDialogVisible = false
                this.personalDialogVisible = true
            }
        },
        created() {
            this.userName = this.$cookies.get('username')
        },
        computed: {
            isCollpase() {
                return !this.$store.getters.sidebar.opened
            },
            username() {
                console.log(this.$store.getters)
                return this.$store.getters.name
            }
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
                    background: rgba(200, 200, 200, .5);
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
</style>
