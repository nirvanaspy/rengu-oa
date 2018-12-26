<template>
    <div class="departmentCont">
        <el-row>
            <el-col :xs="24" :sm="12" :md="6" v-for="(item, index) in departmentList" :key="index" style="margin-bottom: 30px;">
                <el-card :body-style="{ padding: '0px',background:'rgb(249,249,249)'}" shadow="hover" style="height: 400px">
                    <div class="department-name">
                        {{item.name}}
                        <div class="btn-cont">
                            <span class="icon-delete icons" @click="handleSelectMembers(item)">
                                <svg-icon icon-class="people"></svg-icon>
                            </span>
                            <span class="icon-edit icons" @click="handleEditDepa(item)">
                                <svg-icon icon-class="edit"></svg-icon>
                            </span>
                            <span class="icon-delete icons" @click="handleDeleteDepa(item)">
                                <svg-icon icon-class="delete"></svg-icon>
                            </span>
                        </div>
                    </div>
                    <div class="department-info">
                        <div class="department-avatar">
                            <svg-icon icon-class="department"></svg-icon>
                        </div>
                        <div class="info-detail">
                            <span>部门人数:{{computeMemberNum(item.userEntities)}}</span>
                            <span>部门经理:{{item.leaderName}}</span>
                        </div>
                    </div>
                    <div class="department-members">
                        <div v-for="member in item.userEntities" class="member-item">
                            <span class="avatar">
                                <img :src="genenrateAvatar(member.id)" alt="">
                            </span>
                            <span class="name">{{member.username}}</span>
                            <span class="member-delete" @click="handleDeleteMember(member)">
                                <svg-icon icon-class="delete"></svg-icon>
                            </span>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6" style="margin-bottom: 30px;">
                <el-card style="height: 400px">
                    <div class="add-icon" @click="handleAddDepartment">
                        <svg-icon icon-class="add"></svg-icon>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="新建部门"
                   class="createDialog"
                   :visible.sync="createDialogVisible"
                   width="30%">
            <el-form label-position="left" label-width="80px" :model="createDpInfo">
                <el-form-item label="部门名">
                    <el-input v-model="createDpInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="部门领导">
                    <el-select v-model="selectedLeaderId" placeholder="请选择" style="width: 100%;">
                        <el-option
                                v-for="item in userList"
                                :key="item.id"
                                :label="item.username"
                                :value="item.username">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDepa">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑部门"
                   class="editDialog"
                   :visible.sync="editDialogVisible"
                   width="30%">
            <el-form label-position="left" label-width="80px" :model="createDpInfo">
                <el-form-item label="部门名">
                    <el-input v-model="depaInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="部门领导">
                    <el-select v-model="depaInfo.leaderName" placeholder="请选择" style="width: 100%;">
                        <el-option
                                v-for="item in userList"
                                :key="item.id"
                                :label="item.username"
                                :value="item.username">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDepa">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="选择组员"
                   class="editDialog"
                   :visible.sync="selectMemberDialogVisible"
                   width="30%">
            <el-table
                    ref="multipleTable"
                    :data="userList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="memberSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="用户名"
                        width="120">
                    <template slot-scope="scope">{{ scope.row.username }}</template>
                </el-table-column>
                <el-table-column
                        prop="realname"
                        label="姓名"
                        width="120">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="selectMemberDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectMember">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { getDepartment, addDepartment, deleteDepartment, modifyDepartment, addDepaMembers } from '../../api/department'
    import { getUsers } from "../../api/users"
    import Identicon from 'identicon.js'


    export default {
        name: "department",
        data() {
            return {
                createDialogVisible:false,
                editDialogVisible:false,
                selectMemberDialogVisible: false,
                leaderOptions: [
                ],
                userList: [],
                departmentList: [
                    {
                        name: '民品部',
                        userEntities: [
                            {
                                username: '张三',
                                id: 'assadasddswwwwe'
                            },
                            {
                                username: '张三',
                                id: 'assadasddswwwwe'
                            },
                            {
                                username: '张三',
                                id: 'assadasddswwwwe'
                            }
                        ]
                    },
                    {name: '民品部'},
                    {name: '民品部'},
                    {name: '民品部'}
                ],
                createDpInfo: {
                    name: ''
                },
                depaInfo: {
                    name: '',
                    leaderName: ''
                },
                selectedLeaderId: '',
                selectedDepaId: '',
                selectedMembers: [],
                selectedMemberId: ''
            }
        },
        created() {
            this.getUserList()
            this.getDepaList()
        },
        methods: {
            getDepaList() {
                getDepartment().then((res) => {
                    this.departmentList = res.data
                })
            },
            getUserList() {
                getUsers().then((res) => {
                    this.userList = res.data.data
                })
            },
            handleAddDepartment() {
                this.createDialogVisible = true
            },
            addDepa() {
                var qs = require('qs');
                let data = {
                    'name': this.createDpInfo.name,
                    'leaderName': this.selectedLeaderId
                }
                let datapost = qs.stringify(data)
                addDepartment(datapost).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.getDepaList()
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
            handleDeleteDepa(item) {
                deleteDepartment(item.id).then((res) => {
                    this.getDepaList()
                })
            },
            handleEditDepa(item) {
                this.editDialogVisible = true
                this.depaInfo = Object.assign({}, item)
            },
            editDepa() {
                var qs = require('qs');
                let data = {
                    'name': this.depaInfo.name,
                    'leaderName': this.depaInfo.leaderName
                }
                let datapost = qs.stringify(data)
                modifyDepartment(this.depaInfo.id, datapost).then((res) => {
                    this.getDepaList()
                    this.editDialogVisible = false
                })
            },
            memberSelectionChange(val) {
                this.selectedMembers = val

            },
            handleSelectMembers(item) {
                this.selectMemberDialogVisible = true
                this.selectedDepaId = item.id
            },
            selectMember() {
                let ids = []
                this.selectedMembers.forEach((item) => {
                    ids.push(item.id)
                })
                let memberIds = (ids + '').replace(/\[|]/g, '')
                console.log(memberIds)
                var qs = require('qs');
                let data = {
                    ids: memberIds
                }
                let datapost = qs.stringify(data)
                addDepaMembers(this.selectedDepaId, datapost).then(() => {

                })
            },
            handleDeleteMember(member) {
                this.selectedMemberId = member.id
                this.$confirm('确认删除'+ member.username + '吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
        },
        computed: {
            computeMemberNum: function () {
                return function (item) {
                    if(item) {
                        return item.length
                    } else {
                        return 0
                    }
                }
            },
            genenrateAvatar() {
                return function(hash) {
                    let options = {
                        foreground: [210, 82, 91, 255],               // rgba black
                        background: [255, 255, 255, 0],         // rgba white
                        margin: 0.2,                              // 20% margin
                        size: 30,                                // 420px square
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
    .departmentCont {
        padding: 10px;
        .department-name {
            position: relative;
            height: 30px;
            line-height: 30px;
            font-size: 20px;
            font-weight: bold;
            background: rgb(92,184,92);
            color: #fff;
            .btn-cont {
                position: absolute;
                top: 0;
                right: 6px;
                .icons {
                    display: inline-block;
                    width: 20px;
                    height: 30px;
                    line-height: 30px;
                    cursor: pointer;
                }
                .icon-delete {
                    font-size: 16px;
                    /*color: rgb(233,102,44);*/
                }
                .icon-edit {
                    font-size: 16px;
                    /*color: rgb(240,173,48);*/
                }
            }
        }
        .department-info {
            height: 120px;
            background: rgb(76,174,76);
            padding: 10px 0;
            .department-avatar {
                width: 60px;
                height: 60px;
                line-height: 70px;
                border-radius: 50%;
                // background: rgb(18,150,219);
                background: #fff;
                margin: 0 auto 10px;
                svg{
                    font-size: 40px;
                }
            }
            .info-detail {
                color: #fff;
                font-size: 12px;
                span {
                    display: block;
                }
            }
        }
    }
    .department-members {
        background:rgb(249,249,249);
        height: 250px;
        text-align: left;
        overflow-y: scroll;
        padding: 10px 0;
        /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
        /*Chrome下隐藏滚动条，溢出可以透明滚动*/
        .member-item {
            height: 30px;
            width: 100%;
            line-height: 30px;
            margin-bottom: 10px;
            padding: 0 20px;
            cursor: pointer;
            &:hover, &:focus {
                background: #f5f5e5;
            }
            .avatar {
                display: inline-block;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #eee;
            }
            .name {
                display: inline-block;
                vertical-align: top;
                margin-left: 20px;
                font-size: 14px;
                color: #333;
            }
            .member-delete {
                float: right;
                color: rgb(231,76,60);
                cursor: pointer;
            }
        }
    }
    .department-members::-webkit-scrollbar{width:0px}
    .add-icon {
        font-size: 40px;
        color: rgb(92,184,92);
        cursor: pointer;
    }
</style>
