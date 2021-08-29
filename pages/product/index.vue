<template>
    <v-container grid-list-lg row wrap fluid class="home-app-wrapper statistics pt-2">
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
            >
                <v-card
                    :key="item.id"
                    :loading="loading"
                    class="mx-auto my-12 md3"
                    @click="showProductDetail()"
                >
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        />
                    </template>

                    <v-img
                        height="250"
                        :src="item.url"
                    />

                    <v-card-title>
                        <div class="text-name-product">
                            {{ item.name }}
                        </div>
                    </v-card-title>

                    <v-card-text>
                        <v-row
                            align="center"
                            class="mx-0"
                        >
                            <v-rating
                                :value="4.5"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="14"
                            />

                            <div class="grey--text ms-4">
                                4.5 (413)
                            </div>
                        </v-row>

                        <div align="left" class="my-4 text-subtitle-1">
                            $ • Price current: {{ item.bidPrice }}
                        </div>

                        <div align="left">
                            • Time expried: {{ item.expiredAt }}
                        </div>

                        <div align="left">
                            Category: {{ item.category.name }}
                        </div>
                    </v-card-text>

                    <v-divider class="mx-4" />

                    <!-- <v-card-title>Tonight's availability</v-card-title> -->

                    <!-- <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text> -->

                    <!-- <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Get detail
                        </v-btn>
                    </v-card-actions> -->
                </v-card>
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
            >
                <v-card
                    :key="item.id"
                    :loading="loading"
                    class="mx-auto my-12 md3"
                    @click="showProductDetail()"
                >
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        />
                    </template>

                    <v-img
                        height="250"
                        :src="item.url"
                    />

                    <v-card-title>
                        <div class="text-name-product">
                            {{ item.name }}
                        </div>
                    </v-card-title>

                    <v-card-text>
                        <v-row
                            align="center"
                            class="mx-0"
                        >
                            <v-rating
                                :value="4.5"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="14"
                            />

                            <div class="grey--text ms-4">
                                4.5 (413)
                            </div>
                        </v-row>

                        <div align="left" class="my-4 text-subtitle-1">
                            $ • Price current: {{ item.bidPrice }}
                        </div>

                        <div align="left">
                            • Time expried: {{ item.expiredAt }}
                        </div>

                        <div align="left">
                            Category: {{ item.category.name }}
                        </div>
                    </v-card-text>

                    <v-divider class="mx-4" />
                </v-card>
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
            >
                <v-card
                    :key="item.id"
                    :loading="loading"
                    class="mx-auto my-12 md3"
                    @click="showProductDetail()"
                >
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        />
                    </template>

                    <v-img
                        height="250"
                        :src="item.url"
                    />

                    <v-card-title>
                        <div class="text-name-product">
                            {{ item.name }}
                        </div>
                    </v-card-title>

                    <v-card-text>
                        <v-row
                            align="center"
                            class="mx-0"
                        >
                            <v-rating
                                :value="4.5"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="14"
                            />

                            <div class="grey--text ms-4">
                                4.5 (413)
                            </div>
                        </v-row>

                        <div align="left" class="my-4 text-subtitle-1">
                            $ • Price current: {{ item.bidPrice }}
                        </div>

                        <div align="left">
                            • Time expried: {{ item.expiredAt }}
                        </div>

                        <div align="left">
                            Category: {{ item.category.name }}
                        </div>
                    </v-card-text>

                    <v-divider class="mx-4" />
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
// import { mapActions } from 'vuex';
import { productService } from '~/services/product';

export default Vue.extend({
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
        // ...mapActions('product', ['getTop5productNearEnd']),

        loadData() {
            this.loadTop5ProductLastEnd();
            this.loadTop5ProductAuctionMost();
            this.loadTop5ProductHighPrice();
        },

        async loadTop5ProductLastEnd() {
            const { data } = await productService.getTop5productNearEnd();
            if (data)
                this.listProductLastEnd = data;
        },

        async loadTop5ProductAuctionMost() {
            const { data } = await productService.getTop5productAuctionMost();
            if (data)
                this.listProductAuction = data;
        },

        async loadTop5ProductHighPrice() {
            const { data } = await productService.getTop5productHighPrice();
            if (data)
                this.listProductHighPrice = data;
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

