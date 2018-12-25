<template>
    <div>
        <!--<div id="example"></div>-->
        <hot-table :settings="settings"></hot-table>
    </div>
</template>

<script>
    import { HotTable } from '@handsontable/vue'
    export default {
        name: "editTable",
        data() {
            return {
                settings: {
                    data: [
                        ["火车票", "交通", 110, '12月11日', 13],
                        ["火车票", "交通", 110, '12月11日', 13],
                        ["住宿费用", "交通", 150, '12月11日', 13]
                    ],
                    // colHeaders: true,
                    colHeaders: ['用途', "类别", "金额", "日期", "备注"],
                    rowHeaders: false,
                    allowRemoveColumn: true,
                    manualRowResize:true,
                    manualColumnResize:true,
                    mergeCells: true,
                    contextMenu: {
                        items: {
                            'mergeCells':{ name: '合并单元格' , },
                            'row_above': { name: '上方添加一行', },
                            'row_below': { name: '下方添加一行', },
                            'col_left': { name: '左侧添加一列', },
                            'col_right': { name: '右侧添加一列', },
                            'remove_row': { name: '移除此行', },
                            'remove_col': { name: '移除此列', },
                            'copy': { name: '复制', },
                            'cut': { name: '剪切', },
                            'make_read_only': { name: '禁止编辑选中项', },
                            'alignment': { },
                            'undo': { name: '还原上次操作', },
                            'redo': { name: '重复上次动作', }
                        }
                    },
                    /*customBorders: [
                        {
                            range: {//多个单元格
                                from: {//起始位置
                                    row: 1,
                                    col: 1
                                },
                                to: {
                                    row: 3,
                                    col: 4
                                }
                            },
                            top: {//结束位置
                                width: 2,
                                color: '#5292F7'
                            },
                            left: {
                                width: 2,
                                color: 'orange'
                            },
                            bottom: {
                                width: 2,
                                color: 'red'
                            },
                            right: {
                                width: 2,
                                color: 'magenta'
                            }
                        }
                    ],*/
                    colWidths: [200,100,100,100,400]
                }
            }
        },
        components: {
            HotTable
        }
    }
</script>

<style scoped>
    @import '../../../node_modules/handsontable/dist/handsontable.full.css';
</style>
