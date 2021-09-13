<template>
    <div class="text-center mx-auto" style="max-width:80%">
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
        <el-select
            v-model="selectCategory"
            class="w-25 my-4"
            placeholder="Danh muc!"
            filterable
            remote
            reserve-keyword
            @change="handleSelectCategory"
        >
            <el-option
                v-for="option in categories"
                :key="option.id"
                :label="option.name"
                :value="option.id"
            />
        </el-select>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/product' }">
                Home
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">
                {{ item.name }}
            </el-breadcrumb-item>
            <!-- <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
        </el-breadcrumb>
        <el-row :gutter="20" class=" mt-4">
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
import { categoryService } from '~/services/category';
import { productService } from '~/services/product';
import { productFavouriteService } from '~/services/product-favourite';
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
        selectKey: null as any,
        categories: [] as any,
        selectCategory: '',
        breadcrumb: []
    }),
    async mounted() {
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

        await this.loadCategory();
    },
    methods: {
        async loadData(filters: string = '') {
            console.log(filters);
            let agoliaResult:any[] = [];
            if (this.selectKey === 'asc(priceNow)') {
                await this.agoliaPriceIndex.search(this.keyword, {
                    filters
                }).then(({ hits }:any) => {
                    agoliaResult = hits;
                });
            }
            else {
                await this.agoliaTimeIndex.search(this.keyword, {
                    filters
                }).then(({ hits }:any) => {
                    agoliaResult = hits;
                });
            }

            if (agoliaResult) {
                const productIds = agoliaResult.map((item:any) => item.id);
                const resultsBiggest = await productService.getBiggestBidByProductIds(productIds).catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get bid product!'
                    });
                });
                let resultsFavourite:any | null = null;
                if (this.$auth.isAuthenticated()) {
                    resultsFavourite = await productFavouriteService.getByProductIds({ productIds }).catch(error => {
                        this.$notify.error({
                            title: 'Error',
                            message: error.message || 'Cannot get product favourite'
                        });
                    });
                }

                if (resultsBiggest) {
                    agoliaResult.forEach((product:any) => {
                        let item = resultsBiggest.find((item:any) => item.data.productId === product.id);
                        if (item)
                            product.bidderProduct = item.data;
                        if (resultsFavourite) {
                            item = resultsFavourite.data.find((item:any) => item.id === product.id);
                            if (item)
                                product.isFavourite = item.isFavourite;
                        }

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
        },
        async  handleSelectCategory() {
            const item = this.categories.find((item:any) => item.id === this.selectCategory);
            if (item) {
                if (this.breadcrumb.length && item.parentId === this.breadcrumb[this.breadcrumb.length - 1].parentId)
                    this.breadcrumb.pop();

                this.breadcrumb.push(item);
                if (item.parentId) {
                    this.products = [];
                    const filters = `category.id:${item.id}`;
                    await this.loadData(filters);
                }
                await this.loadCategory(this.selectCategory);
            }
        },
        async loadCategory(id: string = '') {
            let query = '';
            if (id)
                query += `parentId=${id}`;

            const result = await categoryService.findCategory(query).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot get category!'
                });
            });
            if (result && result.data.length)
                this.categories = result.data;
        },

        async checkFavourite(products: any[]) {
            let productMappings:any[] = [];
            if (this.$auth.isAuthenticated) {
                const ids = products.map(item => item.id);
                const results = await productFavouriteService.getByProductIds({ productIds: ids }).catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get product favourite'
                    });
                });
                if (results && results.data && results.data.length) {
                    products.forEach(product => {
                        const item = results.data.find((item:any) => item.id === product.id);
                        if (item)
                            product.isFavourite = item.isFavourite;

                        productMappings.push(product);
                    });
                }
                else productMappings = products;
            }

            return productMappings;
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

