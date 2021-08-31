<template>
    <div class="theme-default">
        <div class="main-content">
            <div data-app>
                <menu-header />
            </div>
            <div class="col-right">
                <nuxt />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MenuHeader from '~/components/MenuHeader.vue';
// import { connectWS } from '~/utils/socket';

export default Vue.extend({
    components: { MenuHeader },
    mounted() {
        // if (this.$auth.isAuthenticated()) {
        //     const socket = connectWS(this.$config.wsUrl, 'chat', this.$store.state.auth.accessToken);

        //     socket.on('connect', () => {
        //         // eslint-disable-next-line no-console
        //         console.log('Chat channel is connected!');
        //     });

        //     socket.on('disconnect', () => {
        //         // eslint-disable-next-line no-console
        //         console.log('Chat channel is disconnected!');
        //     });

        //     socket.on('connect_error', (err: Error) => {
        //         // eslint-disable-next-line no-console
        //         console.log('connect_error', err);
        //     });

        //     socket.on('online_status_changed', (onlineStatus: {userId: string, isOnline: boolean}) => {
        //         // eslint-disable-next-line no-console
        //         console.log('online_status', onlineStatus);
        //     });
        // }

        // // eslint-disable-next-line no-console
        // const socket = connectWS(this.$config.wsUrl, 'tracking');

        // socket.on('connect', () => {
        //     // eslint-disable-next-line no-console
        //     console.log('Tracking channel is connected!');
        // });

        // socket.on('disconnect', () => {
        //     // eslint-disable-next-line no-console
        //     console.log('Tracking channel is disconnected!');
        // });

        // socket.on('connect_error', (err: Error) => {
        //     // eslint-disable-next-line no-console
        //     console.log('connect_error', err);
        // });
    }
});
</script>
