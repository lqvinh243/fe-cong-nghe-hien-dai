<template>
    <!-- <div> -->
    <el-container style="max-width: 70%; margin: 0 auto">
        <b-row class="page-controls" style="padding: 5rem 0rem">
            <b-col h-100 cols="8" style="background-color: #fff">
                <div style="max-width: 80%">
                    <div class="section-header">
                        <h1 class="text-center mb-3 title">
                            SIGN UP
                        </h1>
                        <p>We are happy you're here!</p>
                    </div>
                    <el-form
                        ref="ruleForm"
                        :model="loginModel"
                        :rules="rules"
                        label-width="120px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label-width="auto" prop="email">
                            <el-input
                                v-model="loginModel.email"
                                placeholder="Email Address"
                            />
                        </el-form-item>

                        <el-form-item label-width="auto" prop="password">
                            <el-input
                                v-model="loginModel.password"
                                type="password"
                                placeholder="Password"
                            />
                        </el-form-item>
                        <div class="text-right mt-2">
                            <a href="#"> Forgot password</a>
                        </div>
                        <el-button
                            class="custom-button mb-3"
                            style="width: 40%; margin-top: 1rem"
                            type="primary"
                            :loading="loading"
                            @click="login('ruleForm')"
                        >
                            Log in
                        </el-button>
                    </el-form>
                    <div class="text-center" style="width: 100%; margin-top: 1rem">
                        New here?
                        <nuxt-link to="/register">
                            Create an Account
                        </nuxt-link>
                    </div>
                </div>
            </b-col>
            <b-col
                :style="{
                    backgroundImage:
                        'url(' + require('~/assets/images/hero-bg.png') + ')',
                }"
            />
        </b-row>
    </el-container>
    <!-- </div> -->
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
                    {
                        required: true,
                        message: 'Please input Password!',
                        trigger: 'blur',
                    },
                    {
                        min: 6,
                        message: 'Length should be greater than 6!',
                        trigger: 'blur',
                    },
                ],
            },
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
        ...mapActions('auth', [
            'updateAuthentication',
            'updateProfile',
            'clearAuthentication',
        ]),
        login(formName: string) {
            this.loading = true;
            this.$refs[formName].validate(async (valid: boolean) => {
                if (valid) {
                    const result = await authService
                        .login(this.loginModel.email, this.loginModel.password)
                        .catch((error) => {
                            this.$notify.error({
                                title: 'Error',
                                message: error.message || 'Username or password incorrect!',
                            });
                        });
                    if (result) {
                        this.updateAuthentication(result.data);
                        const profile = await meService.getProfile().catch((error) => {
                            this.$notify.error({
                                title: 'Error',
                                message: error.message || 'Cannot get profile!',
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
    },
});
</script>
<style lang="scss" scoped>
> ::placeholder {
  color: black;
  opacity: 1; /* Firefox */
}

.section-header {
  margin-bottom: 55px;
  margin: 0 auto 35px;
  text-align: center;
}

.section-header h1 {
  color: #171d1c;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 2rem;
}
.custom-button {
  margin-left: 30%;
  font-size: 16px;
  height: 50px;
  color: #ffffff;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 18px;
  background: -moz-linear-gradient(90deg, #3da9f5 0%, #683df5 100%);
  background: -ms-linear-gradient(90deg, #3da9f5 0%, #683df5 100%);
  background: -webkit-linear-gradient(90deg, #3da9f5 0%, #683df5 100%);
  box-shadow: -1.04px 4.891px 20px 0px rgb(69 49 183 / 50%);
  font-family: "Roboto", sans-serif;
}
</style>
