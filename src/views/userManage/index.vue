<template>
    <div class="usermanageCont">
        <span class="editor-create" @click="handlAddUser()" v-if="nowTabs == 0">
            <svg-icon icon-class="create"></svg-icon>
        </span>
        <span class="editor-create" @click="handlAddRole()" v-if="nowTabs == 1">
            <svg-icon icon-class="create"></svg-icon>
        </span>
        <el-row style="height: 100%;">
            <el-col :span="6" style="height: 100%;">
                <div class="managerCont">
                    <div class="managerAvatar">
                        <span class="avatar">
                            <svg-icon icon-class="developer"></svg-icon>
                        </span>
                    </div>
                    <div class="managerInfo">
                        <div class="managerName infoBox">
                            <span class="title">用户名</span>
                            <span class="text">admin</span>
                        </div>
                        <div class="managerRole infoBox">
                            <span class="title">用户角色</span>
                            <span class="text">管理员</span>
                        </div>
                        <div class="managerRole infoBox">
                            <span class="title">邮箱</span>
                            <span class="text">123456@qq.com</span>
                        </div>
                        <div class="managerRole infoBox">
                            <span class="title">手机号</span>
                            <span class="text">12345678910</span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <el-tabs type="border-card" v-model="nowTabs">
                    <el-tab-pane>
                        <span slot="label"><svg-icon icon-class="peoples"></svg-icon> 用户管理</span>
                        <div class="userboard">
                            <div class="filiter-box">
                                <div class="input-group">
                                    <el-input type="text" size="small" style="width:200px;"></el-input>
                                    <div class="input-group-button">
                                        <svg-icon icon-class="search"></svg-icon>
                                    </div>
                                </div>
                            </div>
                            <div v-for="item in userList" class="user-item" v-if="item.username !== 'rengu'">
                                <div class="editor-box">
                                    <span class="editor-item editor-edit" @click="handleEditUser(item)"><svg-icon icon-class="edit"></svg-icon></span>
                                    <span class="editor-item editor-delete" @click="handleDeleteUser(item)"><svg-icon icon-class="delete"></svg-icon></span>
                                </div>
                                <div class="avatarCont">
                                    <span class="user-avatar">
                                        <img :src="genenrateAvatar(item.id)" alt="">
                                    </span>
                                </div>
                                <div class="userMesCont">
                                    <div class="userName">
                                        <span class="username-title">用户名:</span>
                                        <strong class="username-text">{{item.username}}</strong>
                                    </div>
                                    <div class="userMes">
                                        <div class="user-email name">邮箱:{{item.email}}</div>
                                        <div class="user-phone name">电话:{{item.telephoneNum}}</div>
                                        <div class="user-role name">角色:
                                            <span v-for="role in item.roleEntities">  {{role.name}}-{{role.description}}</span>
                                            <el-dropdown placement="bottom-start" trigger="click" @command="handleSelectRole">
                                                <!--<el-button type="primary">
                                                    更多菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                                                </el-button>-->
                                                <span class="switchrole" @click="handleSelectUser(item)"><svg-icon icon-class="switchrole"></svg-icon></span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item v-for="item in roleList" :command="item.id">{{item.name}}</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><svg-icon icon-class="roles"></svg-icon> 角色管理</span>
                        <!--<div class="roleboard">
                            <div class="role-item" v-for="item in roleList"></div>
                        </div>-->
                        <el-row>
                            <el-col :span="6" v-for="(item, index) in roleList" :key="index" :offset="(index)%3 == 0 ? 0 : 3" style="margin-bottom: 30px;">
                                <el-card :body-style="{ padding: '0px',background:'rgb(249,249,249)'}" shadow="hover">
                                    <span class="role-icon"><svg-icon icon-class="role1"></svg-icon></span>
                                    <div style="padding: 14px;">
                                        <span>{{item.name}}</span>
                                        <div class="bottom clearfix" style="height: 30px">
                                            <span @click="handleEditRole(item)" v-if="item.name !== 'user' && item.name !== 'admin'" class="role-edit">
                                                <svg-icon icon-class="edit"></svg-icon>
                                            </span>
                                            <span @click="handleDeleteRole(item.id)" v-if="item.name !== 'user' && item.name !== 'admin'" class="role-delete">
                                                <svg-icon icon-class="delete"></svg-icon>
                                            </span>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <!--新建用户-->
        <el-dialog title="新建用户"
                   class="createDialog"
                   :visible.sync="createDialogVisible"
                   width="30%">
            <el-form label-position="left" label-width="80px" :model="createUserInfo">
                <el-form-item label="用户名">
                    <el-input v-model="createUserInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="createUserInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="createUserInfo.telephoneNum"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="createUserInfo.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="再次输入">
                    <el-input v-model="createUserInfo.passwordAgain" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUsers">确 定</el-button>
            </span>
        </el-dialog>
        <!--编辑用户-->
        <el-dialog title="编辑用户"
                   class="editDialog"
                   :visible.sync="editDialogVisible"
                   width="30%">
            <el-form label-position="left" label-width="80px" :model="userInfo">
                <el-form-item label="用户名">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="userInfo.telephoneNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser()">确 定</el-button>
            </span>
        </el-dialog>
        <!--新建用户角色-->
        <el-dialog title="新建用户角色"
                   class="createDialog"
                   :visible.sync="createRoleDialog"
                   width="30%">
            <el-form label-position="left" label-width="80px" :model="createRoleInfo">
                <el-form-item label="角色名称">
                    <el-input v-model="createRoleInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="createRoleInfo.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createRoleDialog = false">取 消</el-button>
                <el-button type="primary" @click="addRoles">确 定</el-button>
            </span>
        </el-dialog>
        <!--编辑用户角色-->
        <el-dialog title="编辑用户角色"
                   class="editDialog"
                   :visible.sync="editRoleDialog"
                   width="30%">
            <el-form label-position="left" label-width="80px" :model="userInfo">
                <el-form-item label="角色名">
                    <el-input v-model="roleInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="roleInfo.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRoleDialog = false">取 消</el-button>
                <el-button type="primary" @click="editRole()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { getUsers, deleteUser, modifyUser } from "../../api/users";
    import { getRoles, addRole, deleteRole, modifyRole, switchRole } from "../../api/roles";
    import { addUser } from "../../api/register";
    import Identicon from 'identicon.js'

    export default {
        name: "usermanange",
        data() {
            return {
                nowTabs: null,
                selectedUserId: '',
                userList: [{
                    username: 'aaa',
                    email: 'aaa@qq.com',
                    telephoneNum: '12345678910',
                    id: 'qwertrtgdfgdsassffdfg'
                }],
                roleList: null,
                userInfo: {
                    id: '',
                    username: 'aaaa',
                    email: 'aaa@qq.com',
                    telephoneNum: '12345678910'
                },
                createUserInfo: {
                    username: '',
                    email: '',
                    telephoneNum: '',
                    password: '',
                    passwordAgain: ''
                },
                roleInfo: {
                  id: '',
                  name: '',
                  description: ''
                },
                createRoleInfo: {
                    name: '',
                    description: ''
                },
                managerInfo: null,
                createDialogVisible: false,
                editDialogVisible: false,
                deleteDialogVisible: false,
                createRoleDialog: false,
                editRoleDialog: false
            }
        },
        created() {
            this.getUserList()
            this.getRolesList()
        },
        mounted() {
        },
        methods: {
            getUserList() {
                getUsers().then((res) => {
                    this.userList = res.data.data
                })
            },
            getRolesList() {
                getRoles().then((res) => {
                    this.roleList = res.data.data
                })
            },
            handlAddUser() {
                this.createDialogVisible = true
            },
            handleEditUser(item) {
                this.editDialogVisible = true
                this.userInfo = Object.assign({}, item)
            },
            handleDeleteUser(item) {
                this.$confirm('确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser(item.id).then(() => {
                        this.getUserList()
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success',
                            duration: 2000
                        })
                    }).catch(() => {
                        this.$notify({
                            title: '失败',
                            message: '删除失败',
                            type: 'error',
                            duration: 2000
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            handleDeleteRole(id) {
                this.$confirm('确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRole(id).then(() => {
                        this.getRolesList()
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success',
                            duration: 2000
                        })
                    }).catch(() => {
                        this.$notify({
                            title: '失败',
                            message: '删除失败',
                            type: 'error',
                            duration: 2000
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            handlAddRole() {
                this.createRoleDialog = true
            },
            handleEditRole(item) {
                this.editRoleDialog = true
                this.roleInfo = Object.assign({}, item)
            },
            addRoles() {
                var qs = require('qs');
                let data = {
                    'name': this.createRoleInfo.name,
                    'description': this.createRoleInfo.description
                }
                let datapost = qs.stringify(data)
                addRole(datapost).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.getRolesList()
                    this.createRoleDialog = false
                }).catch(() => {
                    this.$notify({
                        title: '失败',
                        message: '创建失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            },
            addUsers() {
                var qs = require('qs');
                let data = {
                    'username': this.createUserInfo.username,
                    'email': this.createUserInfo.email,
                    'telephoneNum': this.createUserInfo.telephoneNum,
                    'password' : this.createUserInfo.password
                }
                let datapost = qs.stringify(data)
                addUser(datapost).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.getUserList()
                    this.createDialogVisible = false
                }).catch(() => {
                    this.$notify({
                        title: '失败',
                        message: '创建失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            },
            editUser() {
                var qs = require('qs');
                let data = {
                    'username': this.userInfo.username,
                    'email': this.userInfo.email,
                    'telephoneNum': this.userInfo.telephoneNum
                }
                let datapost = qs.stringify(data)
                modifyUser(this.userInfo.id, datapost).then((res) => {
                    this.getUserList()
                }).catch(() => {
                    this.$notify({
                        title: '失败',
                        message: '更新失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            },
            editRole() {
                var qs = require('qs');
                let data = {
                    'name': this.roleInfo.name,
                    'description': this.roleInfo.description
                }
                let datapost = qs.stringify(data)
                modifyRole(this.roleInfo.id, datapost).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '修改成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.getRolesList()
                    this.editRoleDialog = false
                }).catch(() => {
                    this.$notify({
                        title: '失败',
                        message: '修改失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            },
            handleSelectUser(item) {
                this.selectedUserId = item.id
            },
            handleSelectRole(id) {
                this.$confirm('确认选择该角色吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var qs = require('qs');
                    let data = {
                        'roleId': id
                    }
                    let datapost = qs.stringify(data)
                    switchRole(this.selectedUserId, datapost).then(() => {
                        this.$notify({
                            title: '成功',
                            message: '角色修改成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.getUserList()
                    }).catch(() => {
                        this.$notify({
                            title: '失败',
                            message: '角色修改失败',
                            type: 'error',
                            duration: 2000
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消选择'
                    })
                })
            }
        },
        computed: {
            genenrateAvatar() {
                return function(hash) {
                    let options = {
                        foreground: [210, 82, 91, 255],               // rgba black
                        background: [255, 255, 255, 0],         // rgba white
                        margin: 0.2,                              // 20% margin
                        size: 40,                                // 420px square
                        format: 'svg'                             // use SVG instead of PNG
                    }
                    let data = new Identicon(hash, options).toString()
                    let src = 'data:image/svg+xml;base64,' + data
                    return src
                }
            },
            listenNowTabs() {
                return this.nowTabs
            }
        },
        watch: {
            listenNowTabs: function () {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .editor-create {
        right: 35px;
        position: absolute;
        top: 40px;
        z-index: 1000;
        color: rgb(92,184,92);
        cursor: pointer;
    }
    .managerCont {
        height: 100%;
        padding-right: 30px;
        .managerAvatar {
            width: 100px;
            height: 100px;
            padding: 6px;
            background: #fff;
            border-radius: 50%;
            padding: 8px;
            margin: 0 auto;
            .avatar {
                display: inline-block;
                width: 100%;
                height: 100%;
                background: #ddd;
                border-radius:50%;
                font-size: 60px;
                line-height: 80px;
            }
        }
        .managerInfo {
            width: 100%;
            padding: 30px 0;
            .info-title,.info-mes {
                width: 50%;
                display: inline-block;
                text-align: left;
                span {
                    display: block;
                }
            }
            .infoBox {
                box-sizing: border-box;
                height: 35px;
                line-height: 35px;
                padding-left: 8px;
                span {
                    display: inline-block;
                    width:50%;
                    text-align: left;
                    color: rgb(119, 119, 119);
                    font-size: 13px;
                }
            }
            .infoBox:nth-child(odd) {
                background: #fff;
            }
        }
    }
    .usermanageCont {
        /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
    }
    /*Chrome下隐藏滚动条，溢出可以透明滚动*/
    .usermanageCont::-webkit-scrollbar{width:0px}
    .usermanageCont {
        box-sizing: border-box;
        padding: 30px 20px 10px 20px;
        background: rgb(240,242,245);
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        position: absolute;
        top: 0;
        bottom: 30px;
        .user-item {
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid #eee;
            margin-bottom: 10px;
        }
        .editor-box {
            position: absolute;
            top: 4px;
            right: 0px;
            .editor-item {
                width: 20px;
                margin-right: 4px;
                font-size: 18px;
                cursor: pointer;
                &.editor-create {
                    color: rgb(92,184,92)
                }
                &.editor-edit {
                    color: rgb(240,173,48)
                }
                &.editor-delete {
                    color: rgb(233,102,44)
                }
            }
        }
        .avatarCont {
            float: left;
            width: 80px;
            height: 100%;
            // background: #123;
            font-size: 40px;
            .user-avatar {
                display: inline-block;
                width: 40px;
                height: 40px;
                margin-top: 10px;
                background: #eee;
                border-radius: 6px;
                text-align: center;
                cursor: pointer;
            }
        }
        .userMesCont {
            float: left;
            width: calc(100% - 80px);
            height: 100%;
            box-sizing: border-box;
            padding: 10px;
            text-align: left;
            // background: #445;
            .name {
                color: rgb(119, 119, 119);
                font-size: 14px;
            }
            .username-title {
                color: #777;
                font-size: 14px;
            }
            .username-text{
                color:#777;
                margin-left: 10px;
            }
            .userMes div{
                height: 24px;
                line-height: 24px;
            }
            .switchrole {
                margin-left: 10px;
                font-size: 20px;
                cursor: pointer;
            }
        }
        .userboard {
            background: #fff;
            padding: 0 18px 18px 0;
        }

        .role-icon {
            display: block;
            width: 100%;
            height: 72px;
            background: rgba(231,76,60,0.8);
            font-size: 50px;
        }
    }
    .filiter-box {
        text-align: left;
        padding-bottom: 20px;
        padding-left: 8px;
        border-bottom: 1px solid #eee;
    }
    .input-group{
        padding: 0 10px;
    }
    .input-group-button {
        height: 32px;
        width: 32px;
        line-height: 32px;
        position: relative;
        left: -10px;
        display: inline-block;
        background:#3f7b5f;
        cursor: pointer;
        text-align: center;
    }
    .role-edit {
        color: rgb(240,173,48);
        cursor: pointer;
    }
    .role-delete {
        color: rgb(233,102,44);
        cursor: pointer;
    }
</style>
