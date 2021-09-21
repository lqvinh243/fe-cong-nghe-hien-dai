<template>
    <div
        row
        fluid
        style="max-width:80%"
        class="mx-auto"
    >
        <v-layout row class="m-4 w-100" style="font-weigth:bold">
            <h2>Top 5 sản phẩm gần kết thúc</h2>
            <el-button type="text" class="ml-auto mr-0" style=" text-decoration: underline;">
                <nuxt-link to="/product">
                    Xem them
                </nuxt-link>
            </el-button>
        </v-layout>
        <v-layout row wrap style="overflow:hidden">
            <client-only>
                <carousel
                    v-if="listProductAuction && listProductAuction.length"
                    :per-page="4"
                    :per-page-custom="[[1024,4],[768,3],[640,2],[320,1]]"
                    :space-padding="10"
                    :pagination-padding="20"
                >
                    <Slide v-for="(item, index) in listProductAuction" :key="index" class="mx-1">
                        <product :product="item" />
                    </Slide>
                </carousel>
            </client-only>
        </v-layout>

        <v-layout row class="m-4  w-100" style="font-weigth:bold">
            <h2>Top 5 sản phẩm có nhiều lượt ra giá nhất</h2>
            <el-button type="text" class="ml-auto mr-0 " style=" text-decoration: underline;">
                <nuxt-link to="/product">
                    Xem them
                </nuxt-link>
            </el-button>
        </v-layout>
        <v-layout row wrap style="overflow:hidden">
            <client-only>
                <client-only>
                    <carousel
                        v-if="listProductHighPrice && listProductHighPrice.length"
                        :per-page="4"
                        :per-page-custom="[[1024,4],[768,3],[640,2],[320,1]]"
                        :space-padding="10"
                        :pagination-padding="20"
                    >
                        <Slide v-for="(item, index) in listProductHighPrice" :key="index" class="mx-1">
                            <product :product="item" />
                        </Slide>
                    </carousel>
                </client-only>
            </client-only>
        </v-layout>

        <v-layout row class="m-4  w-100" style="font-weigth:bold">
            <h2>Top 5 sản phẩm có giá cao nhất</h2>
            <el-button type="text" class="ml-auto mr-0 " style=" text-decoration: underline;">
                <nuxt-link to="/product">
                    Xem them
                </nuxt-link>
            </el-button>
        </v-layout>
        <v-layout row wrap class="m-4" style="overflow:hidden">
            <client-only>
                <carousel
                    v-if="listProductHighPrice && listProductHighPrice.length"
                    :per-page="4"
                    :per-page-custom="[[1024,4],[768,3],[640,2],[320,1]]"
                    :space-padding="10"
                    :pagination-padding="20"
                >
                    <Slide v-for="(item, index) in listProductHighPrice" :key="index" class="mx-1">
                        <product :product="item" />
                    </Slide>
                </carousel>
            </client-only>
        </v-layout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ROLE_ID } from '~/commom/enum';
import product from '~/components/product.vue';
import { productService } from '~/services/product';
import { productFavouriteService } from '~/services/product-favourite';

export default Vue.extend({
    components: { product },
    data: () => ({
        selection: null,
        loading: false,
        listProductLastEnd: [],
        listProductAuction: [],
        listProductHighPrice: [],
        limit: 5,
        sortType: {
            EXPIRED_ASC: 'expired_asc',
            EXPIRED_DESC: 'expired_desc',
            AUCTIONS_ASC: 'auctions_asc',
            AUCTIONS_DESC: 'auctions_desc',
            PRICE_ASC: 'price_asc',
            PRICE_DESC: 'price_desc'
        },
        listProductExpried: [] as any,
    }),
    async mounted() {
        await this.loadData();
    },
    methods: {
        loadData() {
            this.loadTop5ProductLastEnd();
            this.loadTop5ProductAuctionMost();
            this.loadTop5ProductHighPrice();
        },
        async loadTop5ProductLastEnd() {
            const query = `limit=5&sortType=${this.sortType.EXPIRED_ASC}`;
            const result = await productService.findProduct(query)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get products!'
                    });
                });
            if (result && result.data)
                this.listProductLastEnd = await this.checkFavourite(result.data);
        },
        async loadTop5ProductAuctionMost() {
            const query = `limit=5&sortType=${this.sortType.AUCTIONS_DESC}`;
            const result = await productService.findProduct(query)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get products!'
                    });
                });
            if (result && result.data)
                this.listProductAuction = await this.checkFavourite(result.data);
        },
        async loadTop5ProductHighPrice() {
            const query = `limit=5&sortType=${this.sortType.PRICE_DESC}`;
            const result = await productService.findProduct(query)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get products!'
                    });
                });
            if (result && result.data)
                this.listProductHighPrice = await this.checkFavourite(result.data);
        },

        async checkFavourite(products: any[]) {
            let productMappings:any[] = [];
            if (this.$auth.isAuthenticated() && this.$auth.isRoles(ROLE_ID.SELLER, ROLE_ID.BIDDER)) {
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
            else productMappings = products;

            return productMappings;
        }
    }
});
</script>

<style lang="scss" scoped>
.home-logo {
    animation: 1s appear;
    margin: auto;
}
@keyframes appear {
    0% {
        opacity: 0;
    }
}
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.title {
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}
.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}
.links {
    padding-top: 15px;
}
.button-green {
    color: rgb(24, 182, 245) !important;
    margin: 20px;
}

.button-swiper::after {
    font-size:25px
}

</style>
