<template>
    <div>
        <b-container style="max-width:70%">
            <b-row class="page-controls" style="padding:5rem 0rem">
                <b-col h-100 cols="5" style="background-color:#fff">
                    <b-container action="#" style="margin-top:30%">
                        <h1 class="text-center">
                            Sign up
                        </h1>
                        <div style="margin-top:1rem">
                            <span>
                                Email
                            </span>
                            <el-input placeholder="Please input" />
                        </div>

                        <div style="margin-top:1rem">
                            <span>
                                Password
                            </span>
                            <el-input placeholder="Please input" />
                        </div>
                        <div style="margin-top:1rem">
                            <span>
                                Address
                            </span>
                            <el-input placeholder="Please input" />
                        </div>
                        <el-button style="width: 100%;margin-top:1rem" type="primary" :loading="loading">
                            Loading
                        </el-button>
                        <div style="width: 100%;margin-top:1rem">
                            Already have an Account?
                            <nuxt-link to="/login">
                                Sign in
                            </nuxt-link>
                        </div>
                    </b-container>
                </b-col>
                <b-col :style="{ backgroundImage: 'url(' + require('~/assets/images/land.jpg') + ')' }" />
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
    layout: 'blank',
    middleware: ['non-authentication'],

    data: () => ({
        title: 'Register',
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
    computed: { ...mapGetters('auth', ['profile', 'roleId', 'companyProfile']), },

    methods: {
        ...mapActions('auth', ['updateAuthentication', 'updateProfile', 'clearAuthentication', 'updateCompanyProfile']),
        async login() {
        },

    }
});
</script>
