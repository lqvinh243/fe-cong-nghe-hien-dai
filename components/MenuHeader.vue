<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dense dark>
            <v-app-bar-nav-icon />

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
        profiles: [{ title: 'Profile', id: 'my-profile' }, { title: 'Logout', id: 'logout' }],
        listSearch: [],
        loading: false,
        search: null,
        select: null,
        states: [
            'Alabama',
            'Alaska',
            'American Samoa',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'District of Columbia',
            'Federated States of Micronesia',
            'Florida',
            'Georgia',
            'Guam',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Marshall Islands',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Northern Mariana Islands',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Palau',
            'Pennsylvania',
            'Puerto Rico',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virgin Island',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming',
        ]
    }),

    watch: {
        search(val) {
            val && val !== this.select && this.querySelections(val);
        },
    },

    methods: {
        querySelections(v: any) {
            this.loading = true;
            // Simulated ajax query
            setTimeout(() => {
                this.listSearch = this.states.filter((e: any) => {
                    return (e || '').toLowerCase().includes((v || '').toLowerCase());
                });
                this.loading = false;
            }, 500);
        }
    }
});
</script>
