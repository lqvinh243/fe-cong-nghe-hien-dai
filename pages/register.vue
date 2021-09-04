<template>
    <div :style="{ backgroundImage: 'url(' + require('~/assets/images/hero-bg.png') + ')',}" class="bg_img hero-bg">
        <el-container style="max-width:70%;margin:0 auto">
            <b-row class="page-controls" style="padding:5rem 0rem">
                <b-col cols="8" style="background-color:#fff">
                    <div action="#" style="max-width:80%;margin:0 auto;margin-top:30%;">
                        <h1 class="text-center">
                            Sign up
                        </h1>
                        <el-form ref="ruleForm" :model="registerModel" :rules="rules" label-width="120px" class="demo-ruleForm">
                            <el-form-item label-width="auto" prop="firstName">
                                <el-input v-model="registerModel.firstName" placeholder="First name" />
                            </el-form-item>
                            <el-form-item label-width="auto" prop="lastName">
                                <el-input v-model="registerModel.lastName" placeholder="Last name" />
                            </el-form-item>
                            <el-form-item label-width="auto" prop="address">
                                <el-input v-model="registerModel.address" placeholder="Address" />
                            </el-form-item>
                            <el-form-item label-width="auto" prop="email">
                                <el-input v-model="registerModel.email" placeholder="Email" />
                            </el-form-item>
                            <el-form-item label-width="auto" prop="Password">
                                <el-input v-model="registerModel.password" type="password" placeholder="Password" />
                            </el-form-item>
                            <vue-recaptcha
                                ref="recaptcha"
                                :sitekey="sitekey"
                                @verify="onVerify"
                                @expired="onExpired"
                            />

                            <el-button :disabled="!verifyCapcha" style="width: 100%;margin-top:1rem" type="primary" :loading="loading" @click="handleResiter('ruleForm')">
                                Register
                            </el-button>
                        </el-form>
                        <div style="width: 100%;margin-top:1rem">
                            Already have an Account?
                            <nuxt-link to="/login">
                                Sign in
                            </nuxt-link>
                        </div>
                    </div>
                </b-col>
                <b-col :style="{ backgroundImage: 'url(' + require('~/assets/images/land.jpg') + ')' }" />
            </b-row>
        </el-container>
        <el-dialog
            title="Register successfully"
            :visible.sync="dialogVisible"
            width="30%"
            :show-close="false"
        >
            <div>Register successfully! Please check email to active account!</div>
            <nuxt-link to="/login">
                Back to login
            </nuxt-link>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { authService } from '~/services/auth';
import { clientService } from '~/services/client';

export default Vue.extend({
    layout: 'blank',
    middleware: ['non-authentication'],

    data: () => ({
        sitekey: '6LeqPkEcAAAAADQ9itOzqznCafxpgKCqfzFWEJve',
        title: 'Register',
        email: '',
        password: '',
        loginMessage: '',
        loading: false,
        registerModel: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: ''
        },
        rules: {
            firstName: [
                { required: true, message: 'Please input first name!', trigger: 'blur' },
                { max: 10, message: 'Length first name must be less than 10!', trigger: 'blur' },
            ],
            lastName: [
                { max: 10, message: 'Length last name must be less than 10!', trigger: 'blur' },
            ],
            email: [
                { required: true, message: 'Please input email!', trigger: 'blur' },
                { type: 'email', message: 'Email is invalid!', trigger: 'blur' },

            ],
            password: [
                { required: true, message: 'Please input password!', trigger: 'blur' },
            ],
            address: [
                { required: true, message: 'Please input address!', trigger: 'blur' },
            ]
        },
        dialogVisible: false,
        verifyCapcha: false

    }),
    head(): object {
        return {
            title: this.title,
            titleTemplate: '%s - Bid',
            bodyAttrs: {
                class: 'theme-default page-login',
                'data-layout': 'blank',
            },
            script: [
                { once: true, src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', async: 'defer' }
            ],
        };
    },

    methods: {
        handleResiter(formName: string) {
            this.loading = true;
            if (this.verifyCapcha) {
                this.$refs[formName].validate(async (valid:boolean) => {
                    if (valid) {
                        const result = await clientService.register(this.registerModel).catch(error => {
                            this.$notify.error({
                                title: 'Error',
                                message: error.message || 'Cannot register!'
                            });
                        });
                        if (result) {
                            this.$refs[formName].resetFields();
                            this.dialogVisible = true;
                        }
                    }
                    this.loading = false;
                });
            }
            else {
                this.loading = false;
                this.$notify.error({
                    title: 'Error',
                    message: 'Please verify capcha!'
                });
            }
        },
        async onVerify(response:any) {
            const result = await authService.verifyCapcha(response).catch(error => {
                this.$refs.recaptcha.reset();
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Please verity capcha again!'
                });
            });
            if (result)
                this.verifyCapcha = result;
            else
                this.$refs.recaptcha.reset();
        },
        onExpired() {
            this.verifyCapcha = false;
        }
    }
});
</script>
<style lang="scss" scoped>
>::placeholder {
  color: black;
  opacity: 1; /* Firefox */
}

.bg_img {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-position: bottom center;
}
.hero-bg {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}
</style>

