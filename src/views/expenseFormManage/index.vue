<template>
    <div class="expenseform">
        <div class="btn-container">
            <el-button type="primary" @click="handleCreateForm" size="mini" style="float: right">添加表单</el-button>
        </div>
        <div>
            <el-table :data="formList"
                      border fit highlight-current-row
                      style="width: 100%"
            >
                <el-table-column align="center" label="报销单描述" >
                    <template slot-scope="scope">
                        <span class="link-type" @click="routerToForm(scope.row)">{{scope.row.description}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="报销人">
                    <template slot-scope="scope">
                        <span>{{scope.row.username}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="140" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <el-button type="success" plain>更多操作</el-button>
                        </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <span style="display:inline-block;padding:0 10px;" @click="handleEditForm(scope.row)">编辑</span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>
                                    <span style="display:inline-block;padding:0 10px;" @click="deleteForm(scope.row.id)">删除</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--新建报销单-->
        <el-dialog title="新建报销单"
                   class="createDialog"
                   :visible.sync="createDialogVisible"
                   width="30%">
            <el-form label-position="left" label-width="80px" :model="createFormInfo">
                <!--<el-form-item label="用户名">
                    <el-input v-model="createFormInfo.username"></el-input>
                </el-form-item>-->
                <!--<el-form-item label="选择用户">
                    &lt;!&ndash;<el-select v-model="userId" placeholder="请选择" style="width: 100%;">
                        <el-option
                                v-for="item in userList"
                                :key="item.id"
                                :label="item.username"
                                :value="item.id">
                        </el-option>
                    </el-select>&ndash;&gt;
                    <el-select v-model="userInfo" value-key="id" placeholder="请选择" style="width: 100%;">
                        <el-option
                                v-for="item in userList"
                                :key="item.id"
                                :label="item.username"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="备注">
                    <el-input v-model="createFormInfo.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addForm">确 定</el-button>
            </span>
        </el-dialog>
        <!--修改报销单-->
        <el-dialog title="修改报销单"
                   class="editDialog"
                   :visible.sync="editDialogVisible"
                   width="30%">
            <el-form label-position="left" label-width="80px" :model="formInfo">
                <!--<el-form-item label="用户名">
                    <el-input v-model="formInfo.username"></el-input>
                </el-form-item>-->
                <el-form-item label="备注">
                    <el-input v-model="formInfo.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { addExpenseForm, getExpenseFormByUser, deleteExpenseForm, modifyExpenseForm } from '@/api/expense'
    import { getUsers } from "../../api/users"

    export default {
        name: "index",
        data() {
            return {
                id: '',
                createDialogVisible: false,
                editDialogVisible: false,
                formList: [],
                userList: [],
                userId: [],
                userInfo: '',
                createFormInfo: {
                    description: '',
                    username: ''
                },
                formInfo: {
                    description: '',
                    username: ''
                },
                selectedFormId: ''
            }
        },
        created() {
            this.createFormInfo.username = this.$cookies.get('username')
            this.id = this.$cookies.get('userId')
            this.getUserList()
            this.getFormList()
        },
        methods: {
            getUserList() {
                getUsers().then((res) => {
                    this.userList = res.data.data
                })
            },
            getFormList() {
                getExpenseFormByUser().then((res) => {
                    this.formList = res.data
                })
            },
            handleCreateForm() {
                this.createDialogVisible = true
            },
            addForm() {
                var qs = require('qs');
                let data = {
                    'username': this.createFormInfo.username,
                    'userId': this.id,
                    'description': this.createFormInfo.description
                    /*'username': this.userInfo.username,
                    'userId': this.userInfo.id,
                    'description': this.createFormInfo.description*/
                }
                let datapost = qs.stringify(data)
                addExpenseForm(datapost).then(() => {

                })
            },
            deleteForm(id) {
                deleteExpenseForm(id).then((res) => {

                })
            },
            handleEditForm(item) {
                this.editDialogVisible = true
                this.formInfo = Object.assign({}, item)
                this.selectedFormId = item.id
            },
            editForm() {
                var qs = require('qs');
                let data = {
                    'username': this.createFormInfo.username,
                    'userId': this.id,
                    'description': this.formInfo.description
                    /*'username': this.userInfo.username,
                    'userId': this.userInfo.id,
                    'description': this.createFormInfo.description*/
                }
                let datapost = qs.stringify(data)
                modifyExpenseForm(this.selectedFormId, datapost).then(()=> {

                })
            },
            routerToForm(row) {
                this.$router.push({
                    name: 'editTable',
                    params: {
                        name: row.name,
                        id: row.id
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .expenseform {
        padding: 20px;
    }
    .btn-container {
        height: 30px;
        margin-bottom: 10px;
    }
</style>
