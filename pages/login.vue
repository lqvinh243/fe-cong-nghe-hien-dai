<template>
    <div>
        <b-container style="max-width:70%">
            <b-row class="page-controls" style="padding:5rem 0rem">
                <b-col :style="{ backgroundImage: 'url(' + require('~/assets/images/land.jpg') + ')' }" />
                <b-col h-100 cols="5" style="background-color:#fff">
                    <b-container action="#" style="margin-top:30%">
                        <h1 class="text-center">
                            Sign in
                        </h1>
                        <div style="margin-top:1rem">
                            <span>
                                Email
                            </span>
                            <el-input v-model="email" placeholder="Please input" />
                        </div>

                        <div style="margin-top:1rem">
                            <span>
                                Password
                            </span>
                            <el-input v-model="password" placeholder="Please input" />
                        </div>
                        <div class="text-right mt-2">
                            <a href="#"> Forget password</a>
                        </div>
                        <el-button style="width: 100%;margin-top:1rem" type="primary" :loading="loading" @click="login">
                            Login
                        </el-button>

                        <div style="width: 100%;margin-top:1rem">
                            Not registered yet?
                            <nuxt-link to="/register">
                                Create an Account
                            </nuxt-link>
                        </div>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
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

    data: () => ({
        title: 'Login',
        email: '',
        password: '',
        loginMessage: '',
        loading: false,

    }),
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
        async login() {
            this.loading = true;
            const result = await authService.login(this.email, this.password).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Username or password incorrect!'
                });
            });
            if (result)
                this.updateAuthentication(result.data);
            const profile = await meService.getProfile().catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot get profile!'
                });
            });
            if (profile) {
                this.$router.push('/');
                this.updateProfile(profile.data);
            }

            this.loading = false;
        },

    }
});
</script>
