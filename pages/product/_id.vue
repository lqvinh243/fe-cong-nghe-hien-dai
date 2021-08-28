<template>
    <v-container grid-list-lg row wrap fluid class="home-app-wrapper statistics pt-2">
        <v-layout row wrap>
            <h2>Product Detail</h2>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
// import { mapActions } from 'vuex';

export default Vue.extend({
    data: () => ({
        selection: null,
        loading: false
    }),
    methods: {
        // ...mapActions('auth', [
        //     'clearAuthentication'
        // ]),

    }
});
</script>
