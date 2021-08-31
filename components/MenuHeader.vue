<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dense dark>
            <v-app-bar-nav-icon />

            <v-toolbar-title>Home</v-toolbar-title>

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

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

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
                    <v-list-item v-for="n in profiles" :key="n.id" @click="() => {}">
                        <v-list-item-title>
                            <NuxtLink :to="`/${n.id}`">
                                {{ n.title }}
                            </NuxtLink>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import { mapActions } from 'vuex';

export default Vue.extend({
    data: () => ({
        items: [
            { title: 'Điện thoại di động', id: 'mobile' },
            { title: 'Máy tính xách tay', id: 'laptop' }
        ],
        profiles: [{ title: 'Profile', id: 'my-profile' }, { title: 'Logout', id: 'logout' }]
    }),
    methods: {
    // ...mapActions('auth', [
    //     'clearAuthentication'
    // ])
    },
});
</script>
