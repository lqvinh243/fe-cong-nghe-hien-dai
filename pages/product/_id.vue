<template>
    <div grid-list-lg fluid class="container-fluid ml-4 mt-5">
        <v-layout row>
            <v-flex>
                <h1>{{ title }}</h1>
            </v-flex>
            <v-flex md1>
                <v-btn
                    class="mx-2 text-right"
                    fab
                    dark
                    small
                    color="pink"
                >
                    <v-icon dark>
                        mdi-heart
                    </v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-divider />
        <v-layout row wrap>
            <v-flex md5>
                <v-carousel :show-arrows="false">
                    <v-carousel-item
                        v-for="(item,i) in listProductImage"
                        :key="i"
                        :src="item.url"
                    />
                </v-carousel>
            </v-flex>
            <v-flex md1 />
            <v-flex md5 mt-4>
                <v-card
                    elevation="24"
                    max-width="444"
                    class="mx-auto"
                />
                <v-layout>
                    <v-flex class="text-center">
                        Thông tin chi tiết
                    </v-flex>
                </v-layout>
                <v-layout md12 mt-1>
                    <h1 class="color-primary">
                        {{ formatPrice(priceOrigin) }} VNĐ
                    </h1>
                    <!-- Giá Khởi điểm: <span class="color-primary">{{ formatPrice(priceOrigin) }} VNĐ</span> -->
                </v-layout>
                <v-layout md12 mt-1>
                    Giá Hiện tại: <span class="color-primary">{{ formatPrice(priceCurrent) }} VNĐ</span>
                </v-layout>
                <v-layout md12 mt-1>
                    Thời gian đấu giá: <span class="color-primary">{{ priceCurrent }}</span>
                </v-layout>
                <v-layout md12 mt-1>
                    Tình trạng: {{ status }}
                </v-layout>
                <v-layout md12 mt-1>
                    Người Bán: {{ seller }}
                </v-layout>
                <v-layout md12 mt-1>
                    Mô tả: {{ description }}
                </v-layout>
                <v-layout class="my-2">
                    <v-flex>
                        <v-btn
                            color="error"
                            dark
                            block
                            large
                            md12
                        >
                            Đấu giá
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import momment from 'moment';
import { productService } from '~/services/product';

export default Vue.extend({
    data: () => ({
        selection: null,
        loading: false,
        listProductImage: [],
        title: '' as any,
        priceCurrent: 0,
        status: '' as any,
        priceOrigin: 0,
        description: '' as any,
        timeExpire: 0,
        seller: '' as any
    }),
    mounted() {
        console.log(this.$route.params.id);
        this.loadProductDetail();
    },

    methods: {
        async loadProductDetail() {
            const result = await productService.getProductDetailById(this.$route.params.id)
                .catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot get product detail!'
                    });
                });
            console.log(result.data);
            this.listProductImage = result.data.productImages;
            this.title = result.data.name;
            this.priceCurrent = result.data.priceNow;
            this.status = result.data.status;
            this.priceOrigin = result.data.bidPrice;
            this.description = result.data.productDescription + '';
            // this.timeExpire = momment(result.data.expiredAt);
            this.seller = `${result.data.seller.firstName} ${result.data.seller.lastName == null ? '' : result.data.seller.lastName}`;
        },

        formatPrice(value: any) {
            const val = (value / 1).toFixed(0).replace(',', '.');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

    }
});
</script>
<style>
    .container-fluid {
        margin: 0 auto;
    }

    .color-primary {
        color: brown;
        font-weight: bold;
        margin-left: 5px;
    }

    h1 {
        color: #0f0f0f;
        font-weight: bold;
    }
</style>
