<template>
    <div>
        <el-container style="max-width:70%;margin:0 auto">
            <b-row class="page-controls" style="padding:5rem 0rem">
                <b-col :style="{ backgroundImage: 'url(' + require('~/assets/images/land.jpg') + ')' }" />
                <b-col h-100 cols="5" style="background-color:#fff">
                    <div style="max-width:80%;margin-top:30%;">
                        <h1 class="text-center mb-3">
                            Sign in
                        </h1>
                        <el-form ref="ruleForm" :model="loginModel" :rules="rules" label-width="120px" class="demo-ruleForm">
                            <el-form-item label-width="auto" prop="email">
                                <el-input v-model="loginModel.email" placeholder="Email address" />
                            </el-form-item>

                            <el-form-item label-width="auto" prop="password">
                                <el-input v-model="loginModel.password" type="password" placeholder="Password" />
                            </el-form-item>
                            <div class="text-right mt-2">
                                <a href="#"> Forget password</a>
                            </div>
                            <el-button style="width: 100%;margin-top:1rem" type="primary" :loading="loading" @click="login('ruleForm')">
                                Login
                            </el-button>
                        </el-form>
                        <div style="width: 100%;margin-top:1rem">
                            Not registered yet?
                            <nuxt-link to="/register">
                                Create an Account
                            </nuxt-link>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </el-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { authService } from '~/services/auth';
import { meService } from '~/services/me';

export default Vue.extend({
    layout: 'blank',
    middleware: ['non-authentication'],

    data() {
        return {
            title: 'Login',
            loginMessage: '',
            loading: false,
            loginModel: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    { required: true, message: 'Please input Email!', trigger: 'blur' },
                    { type: 'email', message: 'Email is invalid!', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Please input Password!', trigger: 'blur' },
                    { min: 6, message: 'Length should be greater than 6!', trigger: 'blur' }
                ]
            }

        };
    },
    head(): object {
        return {
            title: this.title,
            titleTemplate: '%s - Bid',
            bodyAttrs: {
                class: 'theme-default page-login',
                'data-layout': 'blank',
            },
        };
    },
    methods: {
        ...mapActions('auth', ['updateAuthentication', 'updateProfile', 'clearAuthentication']),
        login(formName: string) {
            this.loading = true;
            this.$refs[formName].validate(async (valid:boolean) => {
                if (valid) {
                    const result = await authService.login(this.loginModel.email, this.loginModel.password).catch(error => {
                        this.$notify.error({
                            title: 'Error',
                            message: error.message || 'Username or password incorrect!'
                        });
                    });
                    if (result) {
                        this.updateAuthentication(result.data);
                        const profile = await meService.getProfile().catch(error => {
                            this.$notify.error({
                                title: 'Error',
                                message: error.message || 'Cannot get profile!'
                            });
                        });
                        if (profile) {
                            this.updateProfile(profile.data);
                            this.$router.push('/');
                        }
                    }
                }
                this.loading = false;
            });
        },
    }
});
</script>
<style lang="scss" scoped>
>::placeholder {
  color: black;
  opacity: 1; /* Firefox */
}
</style>
