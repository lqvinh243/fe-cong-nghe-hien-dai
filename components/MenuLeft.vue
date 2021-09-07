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
                    <v-list-item v-for="item in filterItem" :key="item.title" link @click="handleGo(item.url)">
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
import { mapActions, mapGetters } from 'vuex';
import { ROLE_ID } from '../commom/enum';

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
            { title: 'Home', icon: 'mdi-view-dashboard', url: '', roleIds: [ROLE_ID.BIDDER] },
            { title: 'Product Favourite', icon: 'mdi-view-dashboard', url: 'product/favourite', roleIds: [ROLE_ID.BIDDER] },
            { title: 'Client Managerment', icon: 'mdi-forum', url: 'admin/client-managerment', roleIds: [ROLE_ID.SUPER_ADMIN] },
            { title: 'Category Managerment', icon: 'mdi-forum', url: 'admin/category-managerment', roleIds: [ROLE_ID.SUPER_ADMIN] },
            { title: 'Product Managerment', icon: 'mdi-forum', url: 'admin/product-managerment', roleIds: [ROLE_ID.SUPER_ADMIN] },

        ],
    }),

    computed: {
        ...mapGetters('auth', ['roleId']),
        filterItem():any {
            const list = this.items.filter((item:any) => item && item.roleIds && this.$auth.isRoles(...item.roleIds));
            return list;
        }
    },
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
        show(roleIds: string[]):boolean {
            return this.$auth.isRoles(roleIds);
        },
        handleGo(url: string) {
            console.log(url);
            this.$router.push(`/${url}`);
        }
    },
});
</script>
