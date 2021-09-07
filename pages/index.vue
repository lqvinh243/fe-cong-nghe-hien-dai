<template>
    <v-container
        grid-list-lg
        row
        wrap
        ml-3
        class="mx-auto mt-4"
        style="max-width:80%"
    >
        <v-layout row wrap>
            <h2>Top 5 sản phẩm gần kết thúc</h2>
        </v-layout>
        <v-layout
            row
            wrap
        >
            <v-flex
                v-for="(item, index) in listProductLastEnd"
                :key="index"
                md3
                sm6
                xs12
            >
                <product :product="item" />
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <h2>Top 5 sản phẩm có nhiều lượt ra giá nhất</h2>
        </v-layout>
        <v-layout
            row
            wrap
        >
            <v-flex
                v-for="(item, index) in listProductAuction"
                :key="index"
                md3
                sm6
                xs12
            >
                <product :product="item" />
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <h2>Top 5 sản phẩm có giá cao nhất</h2>
        </v-layout>
        <v-layout
            row
            wrap
        >
            <v-flex
                v-for="(item, index) in listProductHighPrice"
                :key="index"
                md3
                sm6
                xs12
            >
                <product :product="item" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import product from '~/components/product.vue';
// import { mapActions } from 'vuex';
import { productService } from '~/services/product';
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
        listProductExpried: [] as any
    }),
    created() {
        this.loadData();
    },
    async mounted() {
        await this.getProductExpriedAsc();
    },
    methods: {
        loadData() {
            this.loadTop5ProductLastEnd();
            this.loadTop5ProductAuctionMost();
            this.loadTop5ProductHighPrice();
        },
        showProductDetail() {
            this.$router.push('product/3');
        },
        async getProductExpriedAsc() {
            const query = `limit=5&sortType=${this.sortType.EXPIRED_ASC}`;
            const result = await productService.findProduct(query)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get products!'
                    });
                });
            this.listProductExpried = result.data;
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
