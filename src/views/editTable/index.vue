<template>
    <div class="xls-container">
        <div style="height: 40px;">
            <el-button size="mini" :loading="downloadLoading" style="margin:0 0 20px 20px;float: right;" type="primary"
                       icon="document" @click="addRow">添加行
            </el-button>
            <el-button v-if="editXls === false" size="mini" :loading="downloadLoading" style="margin:0 0 20px 20px;float: right;" type="primary"
                       icon="document" @click="handleEditXls">编辑表单
            </el-button>
            <el-button v-if="editXls === true" size="mini" :loading="downloadLoading" style="margin:0 0 20px 20px;float: right;" type="primary"
                       icon="document" @click="saveForm">完成编辑
            </el-button>
            <!--<el-button size="mini" :loading="downloadLoading" style="margin:0 0 20px 20px;float: right;" type="primary"
                       icon="document" @click="saveForm">保存
            </el-button>-->
            <div class="export-btns">
                <el-button type="success" size="small" plain @click="handleDownload" style="margin-right: 10px">导出
                    <svg-icon icon-class="excel1"></svg-icon>
                </el-button>
                <el-dropdown style="margin-right: 10px">
                    <el-button type="success" size="small" plain>
                        导出<svg-icon style="position: relative;top: 0px;left: 4px;" icon-class="pdf"></svg-icon>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span @click="exportPdfVertical">竖向导出</span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span @click="exportPdfHorizontal">横向导出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--<el-button type="success" size="small" plain @click="handleExportPdf">导出
                    <svg-icon icon-class="pdf"></svg-icon>
                </el-button>-->
                <el-button type="success" size="small" plain :loading="downloadLoading"
                           icon="document" @click="handlePrint">打印
                    <svg-icon icon-class="print"></svg-icon>
                </el-button>
            </div>
        </div>
        <div id="xlsCont" ref="xlsCont">
            <div class="xls-header">
                <div style="margin: 0 auto;width: 300px;">
                    <span class="title">南京仁谷系集成有线公司报销单</span>
                    <span class="logo">
                        <img src="../../../public/img/favicon.png" alt=""
                                 style="width: 30px;height: 30px;position: relative;top: 8px;">
                    </span>
                </div>
            </div>
            <div class="xls-info" style="display: flex;padding: 6px 10px 16px;">
                <div class="xls-info-item"
                     style="flex: 1;display: inline-block;color: #777;font-size: 14px;margin-right: 20px;text-align: left;">
                    <span class="item-name">部门</span>
                    <el-select v-model="department" class="my-print-input"></el-select>
                </div>
                <div class="xls-info-item item-date"
                     style="flex: 1;display: inline-block;color: #777;font-size: 14px;margin-right: 20px;text-align: center;">
                    <span class="item-name">报销日期</span>
                    <el-date-picker
                            class="my-print-input"
                            v-model="date"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="xls-info-item item-user"
                     style="flex: 1;display: inline-block;color: #777;font-size: 14px;margin-right: 20px;text-align: right;">
                    <span class="item-name" style="height: 40px;line-height: 40px;display: inline-block;">报销人 </span>
                    <span style="height: 40px;line-height: 40px;display: inline-block;margin-left: 10px;border-bottom: 1px solid #777;"> {{user}}</span>
                    <!--<el-select v-model="user"></el-select>-->
                </div>
            </div>
            <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row
                      class="xls-table">
                <!--<el-table-column align="center" label="Id" width="95">
                    <template slot-scope="scope">
                        {{ scope.$index }}
                    </template>
                </el-table-column>-->
                <el-table-column label="用途" width="200" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.forUsage" class="edit-input" size="small"/>
                        </template>
                        <span v-else>{{ scope.row.forUsage }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="类别" width="150">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.type" class="edit-input" size="small"/>
                        </template>
                        <span v-else>{{ scope.row.type }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="金额" width="150">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.money" class="edit-input" size="small"/>
                        </template>
                        <span v-else>{{ scope.row.money }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="日期" width="200">
                    <template slot-scope="scope">
                        <el-date-picker
                                v-if="scope.row.edit"
                                v-model="scope.row.useTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                        <span v-else>{{ scope.row.useTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="备注">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.description" class="edit-input" size="small"/>
                        </template>
                        <span v-else>{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Actions" width="200" v-if="editXls">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit && !scope.row.id" type="success" size="mini" @click="confirmAdd(scope.row)">确定
                        </el-button>
                        <el-button v-if="scope.row.edit && scope.row.id" type="primary" size="mini" @click="confirmEdit(scope.row)">确定
                        </el-button>
                        <el-button v-if="scope.row.edit" class="cancel-btn" size="mini" type="warning"
                                   @click="cancelEdit(scope.row)">取消
                        </el-button>
                        <el-button v-if="!scope.row.edit && !scope.row.id" type="primary" size="mini" icon="el-icon-edit"
                                   @click="scope.row.edit=!scope.row.edit">Add
                        </el-button>
                        <el-button v-if="!scope.row.edit && scope.row.id" type="primary" size="mini" icon="el-icon-edit"
                                   @click="scope.row.edit=!scope.row.edit">Edit
                        </el-button>
                        <el-button v-if="!scope.row.edit && scope.row.id" type="warning" size="mini" icon="el-icon-delete"
                                   @click="handleDeleteInfo(scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <table border="1" class="myTable">
                <tr>
                    <td style="color:#333;">报销金额合计</td>
                    <td colspan="5" style="border-top: none;color: #333;">{{computedTotal}}  元</td>
                </tr>
                <tr>
                    <td>本次报销出差时间统计</td>
                    <td style="width: 150px;">出差时间</td>
                    <td colspan="4" style="text-align: left;padding-left: 20px;" class="self-input-class">
                        <span v-if="editXls">
                            <el-date-picker
                                    v-model="startTime"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                        </el-date-picker>
                        至
                        <el-date-picker
                                v-model="endTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                        </span>
                        <span v-else style="margin-right: 10px">
                            <span style="display: inline-block; width: 100px; height: 30px;line-height:30px;border-bottom: 1px solid #777;text-align: center;">
                                {{startTime}}
                            </span>
                            &nbsp;至&nbsp;
                            <span style="display: inline-block; width: 100px; height: 30px;line-height:30px;border-bottom: 1px solid #777;text-align: center;">
                                {{endTime}}
                            </span>
                        </span>
                        共 {{computedTotalDays}} 天
                    </td>
                </tr>
                <tr>
                    <td>本次报销出差补贴统计</td>
                    <td style="width: 150px;">是否包食宿</td>
                    <td style="width: 150px;" class="self-input-class">
                        <span v-if="editXls">
                            <el-select v-model="isCatered" style="width: 100px;">
                                <el-option :key="1"
                                           label="是"
                                           :value="1">
                                </el-option>
                                <el-option :key="0"
                                           label="否"
                                           :value="0">
                                </el-option>
                            </el-select>
                        </span>
                        <span v-else>
                            <span v-if="isCatered == 1">是</span>
                            <span v-else>否</span>
                        </span>
                    </td>
                    <td style="width: 200px">出差补贴</td>
                    <td colspan="2" style="color: #333;">
                        <span v-if="editXls" class="self-input">
                            <input v-model="benefitNumber" style="height: 30px;line-height: 30px;border:none;border-bottom: 1px solid #777;text-align: center;"> 元
                        </span>
                        <span v-else>{{benefitNumber}} 元</span>
                    </td>
                </tr>
                <tr>
                    <td style="color: #333;">出差补贴金额合计</td>
                    <td colspan="5">{{benefitNumber}} 元</td>
                </tr>
                <tr>
                    <td style="color: #333;">总金额（大写）</td>
                    <td colspan="5" style="text-align: left;padding-left: 20px;">
                        <span style="display: inline-block;width: 60px;text-align: right">万</span>
                        <span style="display: inline-block;width: 60px;text-align: right">仟</span>
                        <span style="display: inline-block;width: 60px;text-align: right">佰</span>
                        <span style="display: inline-block;width: 60px;text-align: right">拾</span>
                        <span style="display: inline-block;width: 60px;text-align: right">元</span>
                        <span style="display: inline-block;width: 60px;text-align: right">角</span>
                        <span style="display: inline-block;width: 60px;text-align: right">分</span>
                    </td>
                </tr>
                <tr class="sign">
                    <td>报销人（签章）</td>
                    <td></td>
                    <td style="width:150px;">审核人（签章）</td>
                    <td></td>
                    <td style="width:150px;">领导审批（签章）</td>
                    <td></td>
                </tr>
            </table>
            <div class="note">
                <span class="title">附注</span>
                <ul>
                    <li>①票据类别：交通、住宿、餐饮、办公用品、零星，其他等；</li>
                    <li>②按照由交通->住宿->餐饮->办公用品->零星->其他的票据类型从上往下填写；</li>
                    <li>③同一类型按照从早到晚的时间顺序填写。</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import html2Canvas from 'html2canvas'
    import * as jsPDF from 'jspdf'
    import printJS from 'print-js'
    import {getExpenseFormById, newExpenseById, deleteExpenseById, modifyExpenseById, modifyExpenseForm} from '../../api/expense'

    export default {
        name: 'ExportExcel',
        components: {},
        data() {
            return {
                user: '',
                formId: '',
                filename: 'asdasd',
                days: '',
                editXls: false,
                department: null,
                date: '',
                list: [],
                listLoading: true,
                downloadLoading: false,
                filename: '',
                autoWidth: true,
                bookType: 'xlsx',
                startTime: null,
                endTime: null,
                isCatered: 0,
                benefitNumber: 0
            }
        },
        created() {
            this.user = this.$cookies.get('username')
            this.formId = this.$route.params.id
            // this.getFormList()
            this.fetchData()
        },
        methods: {
            formatTime(timestamp) {
                let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                return Y+M+D;
            },
            getFormList() {
                getExpenseFormById(this.formId).then((res) => {
                    this.list = res.data
                    let length = 6 - this.list.length
                    if(this.list.length < 6) {
                        for(let i = 0; i < length; i++) {
                            this.list.push({
                                forUsage: '',
                                type: '',
                                money: '',
                                useTime: '',
                                description: ''
                            })
                        }
                    }
                    this.list = this.list.map(v => {
                        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
                        v.originalForUsage = v.forUsage //  will be used when user click the cancel botton
                        v.originalType = v.type
                        v.originalMoney = v.money
                        v.originalDescription = v.description
                        if(v.useTime) {
                            v.originalUseTime = this.formatTime(v.useTime)
                            v.useTime = this.formatTime(v.useTime)
                        }
                        return v
                    })
                    this.listLoading = false
                })
            },
            fetchData() {
                /*fetchList().then(response => {
                    this.list = response.data.items
                    this.listLoading = false
                })*/
                this.list = [
                    {
                        forUsage: 'aaa',
                        type: 'bbb',
                        money: 80,
                        useTime: '15208099112',
                        description: ''
                    }, {
                        forUsage: 'aaa',
                        type: 'bbb',
                        money: 80,
                        useTime: '15208099112',
                        description: ''
                    },{
                        forUsage: 'aaa',
                        type: 'bbb',
                        money: 80,
                        useTime: '15208099112',
                        description: ''
                    },
                ]
                if(this.list.length < 6) {
                    for(let i = 0; i < length; i++) {
                        this.list.push({
                            forUsage: '',
                            type: '',
                            money: '',
                            useTime: '',
                            description: ''
                        })
                    }
                }
                this.list = this.list.map(v => {
                    this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
                    v.originalForUsage = v.forUsage //  will be used when user click the cancel botton
                    v.originalType = v.type
                    v.originalMoney = v.money
                    v.originalDescription = v.description
                    if(v.useTime) {
                        v.originalUseTime = this.formatTime(v.useTime)
                        v.useTime = this.formatTime(v.useTime)
                    }
                    return v
                })
                this.listLoading = false
            },
            handleDownload() {
                this.downloadLoading = true
                import('@/vendors/ExportToExcel').then(excel => {
                    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
                    const filterVal = ['title', 'author', 'author', 'timestamp']
                    const list = this.list
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename,
                        autoWidth: this.autoWidth,
                        bookType: this.bookType
                    })
                    this.downloadLoading = false
                })
            },
            exportPdfVertical() {
                this.getPdf('xlsCont', '报销单')
            },
            exportPdfHorizontal() {
                this.getPdfLandscape('xlsCont', '报销单')
            },
            handlePrint() {
                printJS({
                    printable: 'xlsCont',
                    style: '.radio-label {\n' +
                        '    font-size: 14px;\n' +
                        '    color: #606266;\n' +
                        '    line-height: 40px;\n' +
                        '    padding: 0 12px 0 30px;\n' +
                        '}\n' +
                        '.export-btns {\n' +
                        '    float: left;\n' +
                        '}\n' +
                        '.xls-container {\n' +
                        '    padding: 20px;\n' +
                        '}\n' +
                        '\n' +
                        '.xls-header .title {\n' +
                        '    display: inline-block;\n' +
                        '    height: 30px;\n' +
                        '    line-height: 38px;\n' +
                        '    font-size: 18px;\n' +
                        '    border-bottom: 1px solid #000;\n' +
                        '}\n' +
                        '\n' +
                        '.logo {\n' +
                        '    display: inline-block;\n' +
                        '}\n' +
                        '\n' +
                        'img {\n' +
                        '    width: 30px;\n' +
                        '    height: 30px;\n' +
                        '    position: relative;\n' +
                        '    top: 8px;\n' +
                        '}\n' +
                        '\n' +
                        '.xls-info {\n' +
                        '    display: flex;\n' +
                        '    padding: 6px 10px 16px;\n' +
                        '}\n' +
                        '\n' +
                        '.xls-info-item {\n' +
                        '    flex: 1;\n' +
                        '    display: inline-block;\n' +
                        '    color: #777;\n' +
                        '    font-size: 14px;\n' +
                        '    margin-right: 20px;\n' +
                        '    text-align: left;\n' +
                        '}  \n' +
                        '.xls-info-item input {\n' +
                        '    border: none;\n' +
                        '    border-bottom: 1px solid #000;\n' +
                        '}\n' +
                        '.xls-info-item.item-date {\n' +
                        '    text-align: center;\n' +
                        '}\n' +
                        '\n' +
                        '.xls-info-item.item-user {\n' +
                        '    text-align: right;\n' +
                        '}\n' +
                        '#xlsCont {\n' +
                        '    box-sizing: border-box;\n' +
                        '    width: 100% !important;\n' +
                        '}\n' +
                        '.xls-table table {\n' +
                        '    width: 100% !important;\n' +
                        '    border-spacing: 0;\n' +
                        '    border-collapse: collapse;\n' +
                        '    border: 1px solid rgb(235, 238, 245);\n' +
                        '    border-right: none;\n' +
                        '    border-bottom: none;\n' +
                        '    box-sizing: border-box;\n' +
                        '}\n' +
                        '.xls-table th {\n' +
                        '    border-right: 1px solid rgb(235, 238, 245);\n' +
                        '    box-sizing: border-box;\n' +
                        '}\n' +
                        '.xls-table th .cell {\n' +
                        '    padding: 0;\n' +
                        '    box-sizing: border-box;\n' +
                        '}\n' +
                        '.xls-table td {\n' +
                        '    padding: 0;\n' +
                        '    border-right: 1px solid rgb(235, 238, 245);\n' +
                        '    border-bottom: 1px solid rgb(235, 238, 245);\n' +
                        '    min-height: 48px !important;\n' +
                        '    text-align: center;\n' +
                        '    box-sizing: border-box;\n' +
                        '}\n' +
                        '.xls-table tr {\n' +
                        '    height: 48px;\n' +
                        '    box-sizing: border-box;\n' +
                        '}\n' +
                        '\n' +
                        '.el-date-editor {\n' +
                        '    width: unset;\n' +
                        '}\n' +
                        '\n' +
                        '.myTable {\n' +
                        '    border-spacing: 0;\n' +
                        '    border-collapse: collapse;\n' +
                        '    width: 100%;\n' +
                        '    border: 1px solid rgb(235, 238, 245);\n' +
                        '    border-top: none;\n' +
                        '    box-sizing: border-box;\n' +
                        '}\n' +
                        '.myTable tr {\n' +
                        '    box-sizing: border-box;\n' +
                        '    border-top: none;\n' +
                        '}\n' +
                        '\n' +
                        '.myTable tr:nth-child(1) {\n' +
                        '    border-top: none;\n' +
                        '}\n' +
                        '.myTable td:nth-child(1) {\n' +
                        '    box-sizing: border-box;\n' +
                        '    width: 200px;\n' +
                        '}\n' +
                        '.myTable tr.sign{\n' +
                        '    height: 100px;\n' +
                        '}\n' +
                        '\n' +
                        '.myTable td {\n' +
                        '    border-color: rgb(235, 238, 245);\n' +
                        '    border-top: none;\n' +
                        '    border-right: none;\n' +
                        '    box-sizing: border-box;\n' +
                        '    height: 48px;\n' +
                        '    color: #606266;\n' +
                        '    font-size: 14px;\n' +
                        '}\n' +
                        '.note {\n' +
                        '    position: relative;\n' +
                        '}\n' +
                        '.note .title {\n' +
                        '    position: absolute;\n' +
                        '    left: 0;\n' +
                        '    font-size: 14px;\n' +
                        '}\n' +
                        '.note ul {\n' +
                        '    list-style: none;\n' +
                        '}\n' +
                        '.note li {\n' +
                        '    font-size: 14px;\n' +
                        '    text-align: left;\n' +
                        '    color: #606266;\n' +
                        '}\n' +
                        '.my-print-input {\n' +
                        '    display: inline-block;\n' +
                        '}\n',
                    type: 'html',
                    scanStyles: false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        // return parseTime(v[j])
                        return v[j]
                    } else {
                        return v[j]
                    }
                }))
            },
            addRow() {
                this.list.push({
                    title: '',
                    author: '',
                    timestamp: ''
                })
            },
            handleEditXls() {
                this.editXls = !this.editXls
            },
            cancelEdit(row) {
                row.edit = false
                row.forUsage = row.originalForUsage
                row.type = row.originalType
                row.money = row.originalMoney
                row.description = row.originalDescription
            },
            confirmAdd(row) {
                row.edit = false
                row.originalForUsage = row.forUsage
                row.originalType = row.type
                row.originalMoney = row.money
                row.originalDescription = row.description
                let timeStamp = Math.floor(new Date(row.useTime).getTime() / 1000);
                let time = new Date(timeStamp).getTime()
                var qs = require('qs');
                let data = {
                    'departmentName': '民品部',
                    'description': row.description,
                    'type': row.type,
                    'forUsage': row.forUsage,
                    'useTime': timeStamp.toString(),
                    /*'days': this.days,*/
                    'money': row.money
                }
                let datapost = qs.stringify(data)
                newExpenseById(this.formId, datapost).then((res) => {
                    row.edit = false
                    this.getFormList()
                })
            },
            confirmEdit(row) {
                row.edit = false
                row.originalForUsage = row.forUsage
                row.originalType = row.type
                row.originalMoney = row.money
                row.originalDescription = row.description
                let timeStamp = Math.floor(new Date(row.useTime).getTime() / 1000);
                let time = new Date(timeStamp).getTime()
                var qs = require('qs');
                let data = {
                    'departmentName': '民品部',
                    'description': row.description,
                    'type': row.type,
                    'forUsage': row.forUsage,
                    'useTime': timeStamp.toString(),
                    /*'days': this.days,*/
                    'money': row.money
                }
                let datapost = qs.stringify(data)
                modifyExpenseById(row.id, datapost).then((res) => {

                })

            },
            handleDeleteInfo(row) {
                deleteExpenseById(row.id).then((res) => {

                })
            },
            saveForm() {
                var qs = require('qs');
                let data = {
                    'startTime': '1543881600',
                    'endTime': '1544659200',
                    'isCatered': 1,
                    'benefitNumber': 200.5

                }
                let datapost = qs.stringify(data)
                modifyExpenseForm(this.formId,datapost).then((res) => {
                    this.editXls = false
                    if(res.data.startTime) {
                        this.startTime = this.formatTime(res.data.startTime)
                    } else {
                        this.startTime = res.data.startTime
                    }
                    if(res.data.endTime) {
                        this.endTime = this.formatTime(res.data.endTime)
                    } else {
                        this.endTime = res.data.endTime
                    }
                    this.isCatered = res.data.isCatered
                    this.benefitNumber = res.data.benefitNumber
                })
            }
        },
        computed: {
            computedTotal() {
                let total = 0
                this.list.forEach((item) => {
                    if(item.money) {
                        total = parseFloat(total) + parseFloat(item.money)
                    }
                } )
                return total
            },
            computedTotalDays() {
                if(this.startTime && this.endTime) {
                    let totalDays = (Math.floor(new Date(this.endTime).getTime() / 1000) - Math.floor(new Date(this.startTime).getTime() / 1000))/(24*3600)
                    if(totalDays === 0) {
                        return 1
                    }
                    return totalDays + 1
                } else {
                    return 0
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .radio-label {
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 30px;
    }
    .export-btns {
        float: left;
    }
    .xls-container {
        padding: 20px;

        .xls-header {
            .title {
                display: inline-block;
                height: 30px;
                line-height: 38px;
                font-size: 18px;
                // text-decoration: underline;
                border-bottom: 1px solid #000;
            }

            .logo {
                display: inline-block;

                img {
                    width: 30px;
                    height: 30px;
                    position: relative;
                    top: 8px;
                }
            }
        }

        .xls-info {
            display: flex;
            padding: 6px 10px 16px;
        }

        .xls-info-item {
            flex: 1;
            display: inline-block;
            color: #777;
            font-size: 14px;
            margin-right: 20px;
            text-align: left;
        }

        .xls-info-item.item-date {
            text-align: center;
        }

        .xls-info-item.item-user {
            text-align: right;
        }

        .xls-table {
            td {
                min-height: 48px !important;
            }
            /*.edit-input {
                padding-right: 100px;
            }
            .cancel-btn {
                position: absolute;
                right: 15px;
                top: 15px;
            }*/
        }

        .el-date-editor {
            width: unset;
        }

        .myTable {
            border-spacing: 0;
            border-collapse: collapse;
            width: 100%;
            border: 1px solid rgb(235, 238, 245);
            border-top: none;
            box-sizing: border-box;
            tr {
                box-sizing: border-box;
                border-top: none;
                :nth-child(1) {
                    border-top: none;
                }

                td:nth-child(1) {
                    box-sizing: border-box;
                    width: 200px;
                }
            }
            tr.sign{
                height: 100px;
            }

            td {
                border-top: none;
                border-right: none;
                box-sizing: border-box;
                height: 48px;
                color: #606266;
                font-size: 14px;
                border-color: rgb(235, 238, 245);
            }
        }
        .note {
            position: relative;
            .title {
                position: absolute;
                left: 0;
                font-size: 14px;
            }
            ul {
                list-style: none;
                li {
                    font-size: 14px;
                    text-align: left;
                    color: #606266;
                }
            }
        }
        .self-input {
            input:focus {
                border: none;
                border-bottom: 1px solid #777;
                outline: none;
            }
        }
    }
</style>
