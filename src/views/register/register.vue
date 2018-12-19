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
                    <div class="company-name">Rengu OA System</div>
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
            <div class="step-pane" v-if="activeStep === 1">
                <div class="form-cont">
                    <div class="company-cont">
                        <div class="logo">
                            <img src="../../../public/img/favicon.png" alt="">
                        </div>
                        <div class="company-name">Rengu OA System</div>
                    </div>
                    <div class="title">填写信息</div>
                    <el-form label-position="left">
                        <el-form-item>
                            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="step-pane" v-if="activeStep === 2">
                <div class="company-cont">
                    <div class="logo">
                        <img src="../../../public/img/favicon.png" alt="">
                    </div>
                    <div class="company-name">Rengu OA System</div>
                </div>
                <div class="title">
                    输入验证码
                </div>
                <el-form label-position="left">
                    <el-form-item>
                        <el-input v-model="activeCode" placeholder="请输入验证码" @keyup.enter.native="activeAccount"></el-input>
                        <span @click="activeAccount" class="active-icon">
                            <svg-icon icon-class="arrow-right"></svg-icon>
                        </span>
                    </el-form-item>
                </el-form>
            </div>
            <div class="step-pane" v-if="activeStep === 3">
                <div class="company-cont">
                    <div class="logo">
                        <img src="../../../public/img/favicon.png" alt="">
                    </div>
                    <div class="company-name">Rengu OA System</div>
                </div>
                <div class="title" style="text-align: center">
                    <span>注册成功！</span>
                    <span class="success-icon">
                        <svg-icon icon-class="success"></svg-icon>
                    </span>
                </div>
            </div>
        </div>
        <div class="operation-container">
            <span class="previousSpan" @click="previousStep">
                <svg-icon icon-class="previous"></svg-icon>
                上一步
            </span>
            <span class="nextSpan" @click="nextStep">
                下一步
                <svg-icon icon-class="next"></svg-icon>
            </span>
        </div>
        <!--<div class="operation-container">
            <el-button size="mini" class="previousBtn" style="margin-top: 12px;" @click="previousStep">上一步</el-button>
            <el-button size="mini" class="nextBtn" style="margin-top: 12px;" @click="nextStep">下一步</el-button>
        </div>-->
    </div>
</template>

<script>
    import { addUser, testEmail, activeUser } from '../../api/register';
    export default {
        name: "register",
        data() {
            return {
                activeStep: 3,
                emailAddress: '',
                activeCode: '',
                loginForm: {
                    ipConfig: '192.168.31.134',
                    port: '8080',
                    mailConfig: '',
                    tel: '',
                    username: '',
                    password: '',
                    againPassword: ''
                },
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
                        } else if(res.data === true) {
                            this.activeStep = 2
                        }
                    })
                }
                if(this.activeStep === 1) {
                    let qs = require('qs');
                    let data = {
                        'username': this.loginForm.username,
                        'password': this.loginForm.password,
                        'email': this.emailAddress
                    }
                    let datapost = qs.stringify(data)
                    addUser(datapost).then((res) => {
                        this.activeStep += 1
                        this.$notify({
                            title: '成功',
                            message: '邮件已发送',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
                if(this.activeStep === 4) {
                    this.activeStep = 4
                }
            },
            activeAccount() {
                if(this.activeCode == '') {
                    return
                }
                let qs = require('qs');
                let data = {
                    'email': this.emailAddress,
                }
                let datapost = qs.stringify(data)
                activeUser(this.activeCode, this.emailAddress).then((res) => {
                    this.$notify({
                        title: '成功',
                        message: '激活成功',
                        type: 'success',
                        duration: 2000
                    })
                })
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
        background: url('./back-1.jpg') no-repeat center center;
        background-size: cover;
        .steps-container {
            margin-top: 100px;
        }

        .pane-container {
            // height: 300px;
            width: 500px;
            margin: 15% auto 0;
            padding: 40px;
            background: rgba(255,255,255,0.3);
            border-radius: 10px;
            position: relative;
            .company-cont {
                text-align: left;
                height: 30px;
                line-height: 30px;
                margin: 0 0 16px 0;
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
                    color: #fff;
                }
            }
            .title {
                height: 50px;
                line-height: 50px;
                margin-bottom: 16px;
                padding-left: 4px;
                font-size: 30px;
                color: #ccc;
                text-align: left;
            }
        }
        .operation-container {
            position: absolute;
            bottom: 20px;
            // bottom: 40px;
            left: 20px;
            right: 20px;
            .previousBtn {
                float: left;
            }
            .nextBtn {
                float: right;
            }
            .previousSpan,.nextSpan {
                color: #fff;
                font-size: 16px;
                cursor: pointer;
            }
            .previousSpan {
                float: left;
            }
            .nextSpan {
                float: right;
            }
        }
        .active-icon {
            position: absolute;
            right: 10px;
            cursor: pointer;
            font-size: 20px;
            color: #eee;
        }
        .success-icon {
            margin-left: 4px;
            color: rgb(102,194,58);
            font-size: 30px;
        }
    }
</style>
