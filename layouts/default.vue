<template>
    <div class="theme-default">
        <div class="main-content">
            <div data-app>
                <menu-header @emitDrawer="getDrawer" />
                <menu-left :drawer="drawer" @emitDrawer="getDrawer">
                    <div class="col-right" style="overflow: auto;height:calc(100vh - 48px)">
                        <nuxt />
                    </div>
                </menu-left>
            </div>

            <!-- <div class="col-right">
                <nuxt />
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MenuHeader from '~/components/MenuHeader.vue';
import MenuLeft from '~/components/MenuLeft.vue';
import EvenBus from '~/plugins/event-bus';
import { connectWS } from '~/utils/socket';

export default Vue.extend({
    components: { MenuHeader, MenuLeft },

    data: () => ({
        drawer: null,
        items: [
            { title: 'Home', icon: 'mdi-view-dashboard' },
            { title: 'About', icon: 'mdi-forum' }
        ],
    }),

    mounted() {
        const socket = connectWS(this.$config.wsUrl, 'bid', this.$store.state.auth.accessToken);
        socket.on('connect', () => {
            console.log('Bid channel is connected!');
        });

        socket.on('disconnect', () => {
            // eslint-disable-next-line no-console
            console.log('Bid channel is disconnected!');
        });

        socket.on('bid_infomation_change', (data:any) => {
            // eslint-disable-next-line no-console
            console.log('bid_infomation_change');
            console.log(data);
            EvenBus.$emit('bid_infomation_change', data);
        });

        socket.on('bid_price_change', (data:any) => {
            console.log('bid_price_change');
            console.log(data);
            EvenBus.$emit('bid_price_change', data);
        });

        socket.on('product_end', (data:any) => {
            console.log('product_end');
            console.log(data);
            EvenBus.$emit('product_end', data);
        });

        // if (this.$auth.isAuthenticated()) {
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
    },

    methods: {
        getDrawer() {
            this.drawer = !this.drawer;
        }
    }
});
</script>
