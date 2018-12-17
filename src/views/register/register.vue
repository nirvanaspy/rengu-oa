<template>
    <div class="register-container">
        <div class="steps-container">
            <el-steps :active="activeStep" finish-status="success" align-center>
                <el-step title="填写邮箱信息" icon="el-icon-edit"></el-step>
                <el-step title="完善个人信息" icon="el-icon-upload"></el-step>
                <el-step title="验证邮箱信息" icon="el-icon-edit-outline"></el-step>
                <el-step title="完成注册">
                    <span slot="icon">
                        <svg-icon icon-class="peoples"></svg-icon>
                    </span>
                </el-step>
            </el-steps>
        </div>
        <div class="pane-container">
            <div class="step-pane" v-if="activeStep === 0">
                <div class="company-cont">
                    <div class="logo">
                        <img src="../../../public/img/favicon.png" alt="">
                    </div>
                    <div class="company-name">Rengu</div>
                </div>
                <div class="title">输入邮箱</div>
                <div class="form-cont">
                    <el-form label-position="left">
                        <el-form-item>
                            <el-input v-model="emailAddress" placeholder="someone@example.com"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="step-pane"></div>
            <div class="step-pane"></div>
            <div class="step-pane"></div>
        </div>
        <div class="operation-container">
            <el-button style="margin-top: 12px;" @click="previousStep">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="nextStep">下一步</el-button>
        </div>
    </div>
</template>

<script>
    import { testEmail } from '../../api/register';

    export default {
        name: "register",
        data() {
            return {
                activeStep: 0,
                emailAddress: ''
            }
        },
        methods: {
            previousStep() {
                if(this.activeStep === 0) {
                    this.activeStep = 0
                } else {
                    this.activeStep --
                }
            },
            nextStep() {
                if(this.activeStep === 0) {
                    testEmail(this.emailAddress).then((res) => {
                        if(res.data === false) {
                            this.activeStep += 1
                        }
                    })
                }
                if(this.activeStep === 4) {
                    this.activeStep = 4
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .register-container {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        padding: 0 100px;
        .steps-container {
            margin-top: 40px;
        }

        .pane-container {
            height: 400px;
            width: 500px;
            margin: 100px auto 0;
            .company-cont {
                text-align: left;
                height: 30px;
                line-height: 30px;
                margin: 6px 0;
                .logo {
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    display: inline-block;
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
                .company-name {
                    display: inline-block;
                    height: 30px;
                    margin-left: 10px;
                    vertical-align: top;
                    font-weight: bold;
                    font-size: 20px;
                    color: #777;
                }
            }
        }
    }
</style>
