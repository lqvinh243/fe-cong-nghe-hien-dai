<template>
    <div class="text-center">
        <el-row :gutter="20" class="mx-auto mt-4" style="max-width:80%">
            <el-col v-for="item in products" :key="item.id" :span="6">
                <product :product="item" />
            </el-col>
        </el-row>
        <el-button type="primary" style="width:10%">
            Load more
        </el-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import algoliasearch from 'algoliasearch';
import product from '~/components/product.vue';
import eventBus from '~/plugins/event-bus';
// import { mapActions } from 'vuex';

export default Vue.extend({
    components: { product },
    data: () => ({
        selection: null,
        loading: false,
        products: [] as any,
        limit: 5,
        sortType: {
            EXPIRED_ASC: 'expired_asc',
            EXPIRED_DESC: 'expired_desc',
            AUCTIONS_ASC: 'auctions_asc',
            AUCTIONS_DESC: 'auctions_desc',
            PRICE_ASC: 'price_asc',
            PRICE_DESC: 'price_desc'
        },
        agoliaIndex: null as any,
        keyword: ''
    }),
    mounted() {
        const agoliaApp = process.env.agoliaApp ?? '';
        const agoliaApiKey = process.env.agoliaApiKey ?? '';
        const agoliaClient = algoliasearch(agoliaApp, agoliaApiKey);
        this.agoliaIndex = agoliaClient.initIndex('product');
        this.keyword = this.$route.query.query;
        this.loadData();
        eventBus.$on('CHANGE_QUERY_SEARCH', (val:string) => {
            this.keyword = val;
            this.loadData();
        });
    },
    methods: {
        loadData() {
            this.agoliaIndex.search(this.keyword).then(({ hits }:any) => {
                this.products = hits;
            });
        },
        showProductDetail() {
        },
    }
});
</script>
<style>
.text-name-product {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

