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
            { title: 'Trang chủ', icon: 'mdi-view-dashboard', url: '', roleIds: [ROLE_ID.BIDDER] },
            { title: 'Danh sách yêu thích', icon: 'mdi-view-dashboard', url: 'product/favourite', roleIds: [ROLE_ID.BIDDER] },
            { title: 'Quản lí thành viên', icon: 'mdi-forum', url: 'admin/client-management', roleIds: [ROLE_ID.SUPER_ADMIN] },
            { title: 'Quản lí danh mục sản phẩm', icon: 'mdi-forum', url: 'admin/category-management', roleIds: [ROLE_ID.SUPER_ADMIN] },
            { title: 'Quản lí sản phẩm', icon: 'mdi-forum', url: 'admin/product-management', roleIds: [ROLE_ID.SUPER_ADMIN] },
            { title: 'Quản lí nâng cấp thành viên', icon: 'mdi-forum', url: 'admin/upgrade-request-management', roleIds: [ROLE_ID.SUPER_ADMIN] },
            { title: 'Tạo sản phẩm', icon: 'mdi-forum', url: 'create-product', roleIds: [ROLE_ID.SELLER] },
            { title: 'Sản phẩm đang đấu giá', icon: 'mdi-forum', url: 'product/bid', roleIds: [ROLE_ID.SELLER, ROLE_ID.BIDDER] },
            { title: 'Sản phẩm đã thắng', icon: 'mdi-forum', url: 'product/win', roleIds: [ROLE_ID.SELLER, ROLE_ID.BIDDER] },
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
            if (this.$route.path === `/${url}`)
                this.$emit('emitDrawer');
            else this.$router.push(`/${url}`);
        }
    },
});
</script>
