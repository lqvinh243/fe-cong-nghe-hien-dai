<template>
    <v-container
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
        <v-layout row>
            <client-only>
                <!-- <v-flex
                        v-for="(item, index) in listProductLastEnd"
                        :key="index"
                        md3
                        sm6
                        xs12
                    > -->
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide v-for="(item, index) in listProductLastEnd" :key="index">
                        <product :product="item" />
                    </swiper-slide>
                    <div slot="button-prev" class="swiper-button-prev button-swiper" />
                    <div slot="button-next" class="swiper-button-next button-swiper" />
                </swiper>
                <!-- </v-flex> -->
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
        <v-layout row>
            <client-only>
                <!-- <v-flex
                        v-for="(item, index) in listProductLastEnd"
                        :key="index"
                        md3
                        sm6
                        xs12
                    > -->
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide v-for="(item, index) in listProductAuction" :key="index">
                        <product :product="item" />
                    </swiper-slide>
                    <div slot="button-prev" class="swiper-button-prev button-swiper" />
                    <div slot="button-next" class="swiper-button-next button-swiper" />
                </swiper>
                <!-- </v-flex> -->
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
        <v-layout row class="m-4">
            <client-only>
                <!-- <v-flex
                        v-for="(item, index) in listProductLastEnd"
                        :key="index"
                        md3
                        sm6
                        xs12
                    > -->
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide v-for="(item, index) in listProductHighPrice" :key="index">
                        <product :product="item" />
                    </swiper-slide>
                    <div slot="button-prev" class="swiper-button-prev button-swiper" />
                    <div slot="button-next" class="swiper-button-next button-swiper" />
                </swiper>
                <!-- </v-flex> -->
            </client-only>
        </v-layout>

    <!-- <v-layout row wrap>
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
        </v-layout> -->
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import product from '~/components/product.vue';
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
        listProductExpried: [] as any,
        swiperOption: {
            grabCursor: true,
            slidesPerView: 3,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                }
            }
        }
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
            this.listProductLastEnd = result.data;
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
            this.listProductAuction = result.data;
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
            this.listProductHighPrice = result.data;
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
