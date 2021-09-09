<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dense dark>
            <v-app-bar-nav-icon @click="handleDrawer()" />

            <v-toolbar-title>
                <NuxtLink :to="`/`">
                    <span style="color:white"> Home </span>
                </NuxtLink>
            </v-toolbar-title>

            <v-autocomplete
                v-model="select"
                :loading="loading"
                :items="listSearch"
                :search-input.sync="search"
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                label="Nhập tên, điện thoại, máy tính..."
                solo-inverted
            />
            <v-spacer />
            <v-menu offset-y>
                <template #activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                        Danh mục
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        <v-list-item-title>
                            <NuxtLink :to="`/${item.id}`">
                                {{ item.title }}
                            </NuxtLink>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-menu bottom>
                <template #activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-avatar>
                            <img
                                src="https://cdn.vuetifyjs.com/images/john.jpg"
                                alt="John"
                            >
                        </v-avatar>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="n in dropdownSelection" :key="n.id" @click="handleRedirect(n.id)">
                        <v-list-item-title>
                            {{ n.title }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
    data: () => ({
        items: [
            { title: 'Điện thoại di động', id: 'mobile' },
            { title: 'Máy tính xách tay', id: 'laptop' }
        ],
        profiles: [{ title: 'Login', id: 'login', isAuth: false }, { title: 'Profile', id: 'my-profile', isAuth: true }, { title: 'Logout', id: 'logout', isAuth: true }],
        listSearch: [],
        loading: false,
        search: null,
        select: null,
    }),
    computed: {
        dropdownSelection():any {
            return this.profiles.filter((item:any) => item.isAuth === this.$auth.isAuthenticated());
        }
    },

    watch: {
        search(val) {
            val && val !== this.select && this.querySelections(val);
        },
    },
    methods: {
        ...mapActions('auth', [
            'clearAuthentication',
        ]),
        handleDrawer() {
            this.$emit('emitDrawer');
        },
        querySelections(v: any) {
            this.loading = true;
            // Simulated ajax query
            setTimeout(() => {
                this.listSearch = this.states.filter((e: any) => {
                    return (e || '').toLowerCase().includes((v || '').toLowerCase());
                });
                this.loading = false;
            }, 500);
        },
        handleRedirect(path: string) {
            switch (path) {
            case 'logout':
                this.clearAuthentication();
                this.$router.push('/login');
                break;
            case 'my-profile':
            case 'login':
                this.$router.push(`/${path}`);
                break;
            }
        }
    }
});
</script>
