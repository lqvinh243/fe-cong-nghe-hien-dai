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
import { clientService } from '~/services/client';

export default Vue.extend({
    layout: 'blank',
    middleware: ['non-authentication'],

    data() {
        return {
            title: 'Activation account',
            dialogVisible: false
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
    async mounted() {
        await this.$nextTick(async () => {
            this.$nuxt.$loading.start();
            await this.activeClient();
            this.$nuxt.$loading.finish();
        });
    },
    methods: {
        async activeClient() {
            const email = this.$route.query.email;
            const activeKey = this.$route.query.key;
            if (!email || !activeKey)
                this.$router.push('/');
            const result = await clientService.active(email, activeKey).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot activation account!'
                });
            });
            if (result)
                this.dialogVisible = true;
        }
    }
});
</script>
