<template>
    <div class="ma-12 pa-12">
        <v-sheet
            height="calc(100vh - 48px)"
            class="overflow-hidden"
            style="position: relative"
        >
            <slot />

            <v-navigation-drawer v-model="drawerMenuLeft" absolute temporary>
                <!-- <v-divider></v-divider> -->
                <v-list dense>
                    <v-list-item v-for="item in items" :key="item.title" link>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
    props: {
        drawer: {
            default: null,
            type: Boolean
        },
    },

    data: () => ({
        drawerMenuLeft: null,
        items: [
            { title: 'Home', icon: 'mdi-view-dashboard' },
            { title: 'About', icon: 'mdi-forum' },
        ],
    }),
    watch: {
        drawer() {
            this.drawerMenuLeft = this.drawer;
        },
    },

    mounted() {
        this.drawerMenuLeft = this.drawer;
    },
    methods: {
        ...mapActions('auth', ['clearAuthentication']),
        logout() {
            this.clearAuthentication();
            this.$router.push('/');
        },
    },
});
</script>
