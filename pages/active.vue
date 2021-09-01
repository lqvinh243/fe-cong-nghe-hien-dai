<template>
    <el-dialog
        title="Register successfully"
        :visible.sync="dialogVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
    >
        <div>Activation successfully! Please login and enjoy!</div>
        <nuxt-link to="/login">
            Back to login
        </nuxt-link>
    </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    layout: 'blank',
    middleware: ['non-authentication'],

    data() {
        return {
            title: 'Active account',
            dialogVisible: true
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
    mounted() {
        const email = this.$route.query.email;
        const activeKey = this.$route.query.activeKey;
        console.log(email);
        console.log(activeKey);
    },
    methods: {

    }
});
</script>
