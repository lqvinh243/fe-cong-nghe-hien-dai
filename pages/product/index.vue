<template>
    <div class="text-center">
        <el-select
            v-model="selectKey"
            class="w-25 my-4"
            placeholder="Sap xep!"
            filterable
            remote
            reserve-keyword
            @change="handleSelect"
        >
            <el-option
                v-for="option in options"
                :key="option.key"
                :label="option.name"
                :value="option.key"
            />
        </el-select>
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
import { productService } from '~/services/product';
// import { mapActions } from 'vuex';

export default Vue.extend({
    components: { product },
    data: () => ({
        selection: null,
        loading: false,
        products: [] as any,
        limit: 5,
        agoliaIndex: null as any,
        agoliaTimeIndex: null as any,
        agoliaPriceIndex: null as any,
        keyword: '',
        options: [
            {
                name: 'Thoi gian giam dan',
                key: 'asc(expiredAt)'
            },
            {
                name: 'Gia tang dan',
                key: 'asc(priceNow)'
            }
        ],
        selectKey: null as any
    }),
    mounted() {
        const agoliaApp = process.env.agoliaApp ?? '';
        const agoliaApiKey = process.env.agoliaApiKey ?? '';
        const agoliaClient = algoliasearch(agoliaApp, agoliaApiKey, { protocol: 'http' } as any);
        this.agoliaPriceIndex = agoliaClient.initIndex('product_desc_asc');
        this.agoliaTimeIndex = agoliaClient.initIndex('product_expired_desc');
        this.keyword = this.$route.query.query;
        this.loadData();
        eventBus.$on('CHANGE_QUERY_SEARCH', (val:string) => {
            this.products = [];
            this.keyword = val;
            this.loadData();
        });
    },
    methods: {
        async loadData() {
            let agoliaResult:any[] = [];
            if (this.selectKey === 'asc(priceNow)') {
                await this.agoliaPriceIndex.search(this.keyword).then(({ hits }:any) => {
                    agoliaResult = hits;
                });
            }
            else {
                await this.agoliaTimeIndex.search(this.keyword).then(({ hits }:any) => {
                    agoliaResult = hits;
                });
            }

            if (agoliaResult) {
                const productIds = agoliaResult.map((item:any) => item.id);
                const result = await productService.getBiggestBidByProductIds(productIds).catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get bid product!'
                    });
                });
                if (result) {
                    agoliaResult.forEach((product:any) => {
                        const item = result.find((item:any) => item.data.productId === product.id);
                        if (item)
                            product.bidderProduct = item.data;
                        this.products.push(product);
                    });
                }
            }
        },
        showProductDetail() {
        },
        async handleSelect() {
            this.$nuxt.$loading.start();
            this.products = [];
            await this.loadData();
            this.$nuxt.$loading.finish();
        }
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

