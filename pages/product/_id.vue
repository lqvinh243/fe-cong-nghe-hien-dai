<template>
    <div grid-list-lg fluid class="container-fluid ml-4 mt-5">
        <v-layout row>
            <v-flex>
                <h1>{{ title }}</h1>
            </v-flex>
            <v-flex md1>
                <i v-if="showFavouriteIcon" style="font-size: 2rem; cursor: pointer" :class="isFavourite ? 'el-icon-star-on icon-like-product' :'el-icon-star-off'" @click="handleFavourite" />
                <!-- <i v-if="likeProduct" class="el-icon-star-on icon-like-product" @click="likeProduct = false" />
                <i v-if="!likeProduct" style="font-size: 2rem; cursor: pointer" class="el-icon-star-off" @click="likeProduct = true" /> -->
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
                <v-layout md12 mt-1>
                    <span class="color-primary-header">
                        {{ formatPrice(priceBidder) }} đ
                    </span>
                </v-layout>
                <v-card
                    style="padding: 0 auto"
                    class="mx-auto"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content style="margin-right:0 !important">
                            <div class="text-overline">
                                <h3>Thông tin Đấu giá</h3>
                                <v-divider />
                            </div>
                            <v-list-item-title class="text-h5 mb-1">
                                <v-layout md12 my-2>
                                    Giá hiện tại: <span class="ml-2 color-primary">{{ stepPrice }} đ</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Giá Mua ngay: <span class="ml-2 color-primary">{{ formatPrice(priceCurrent) }} đ</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Tình trạng: {{ status }}
                                </v-layout>
                                <v-layout md12 my-2>
                                    Thời gian đấu giá: <span>{{ timeExpire }}</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Bước nhảy: <span>{{ stepPrice }}</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Thông tin bidder đang đặt giá cao nhất: <span>{{ stepPrice }}</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Ngày đăng sản phẩm: <span class="ml-2 text-info-auction">{{ formatDate(createdAt) }}</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Số lượt ra giá hiện tại: <span class="ml-2 text-info-auction">{{ stepPrice }}</span>
                                </v-layout>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions>
                        <el-button style="width: 100%;margin-top:1rem; font-weight: bold; color:white" type="primary" :loading="loading" @click="auctionProduct">
                            ĐẤU GIÁ
                        </el-button>
                        <el-button style="width: 100%;margin-top:1rem; font-weight: bold; color:white" type="danger" :loading="loading" @click="auctionProduct">
                            MUA NGAY
                        </el-button>
                    </v-card-actions>
                </v-card>

                <v-card
                    style="padding: 0 auto"
                    class="mx-auto mt-4"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content style="margin-right:0 !important">
                            <div class="text-overline">
                                <h3>Thông tin Sản phẩm</h3>
                                <v-divider />
                            </div>

                            <v-list-item-title class="text-h5 mb-1">
                                <v-layout md12 mt-1>
                                    Danh mục: {{ category }}
                                </v-layout>
                                <v-layout md12 mt-1>
                                    Người Bán: {{ seller }}
                                </v-layout>
                                <v-layout md12 mt-1>
                                    Mô tả: {{ description }}
                                </v-layout>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions />
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import momment from 'moment';
import { ROLE_ID } from '~/commom/enum';
import { productService } from '~/services/product';
import { productFavouriteService } from '~/services/product-favourite';

export default Vue.extend({
    data: () => ({
        id: null as string | null,
        selection: null,
        loading: false,
        listProductImage: [],
        title: '' as any,
        priceCurrent: 0,
        status: '' as any,
        priceBidder: 0,
        description: '' as any,
        timeExpire: 0,
        seller: '' as any,
        likeProduct: false as boolean,
        stepPrice: 0 as number,
        category: '' as string,
        createdAt: null,
        isFavourite: false
    }),

    computed: {
        showFavouriteIcon():boolean {
            return this.$auth.isRoles(ROLE_ID.BIDDER);
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        if (!this.id)
            return this.$router.push('/404');
        this.loadProductDetail();
        this.checkFavourite();
    },

    methods: {
        auctionProduct() {

        },

        async loadProductDetail() {
            const result = await productService.getProductDetailById(this.id)
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
            this.priceBidder = result.data.bidPrice;
            this.description = result.data.productDescription + '';
            // this.timeExpire = momment(result.data.expiredAt);
            this.seller = `${result.data.seller.firstName} ${result.data.seller.lastName == null ? '' : result.data.seller.lastName}`;
            this.stepPrice = result.data.stepPrice;
            this.category = result.data.category.name;
            this.createdAt = result.data.createdAt;
        },

        formatPrice(value: any) {
            const val = (value / 1).toFixed(0).replace(',', '.');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        formatDate(date:any) {
            return momment(date).format('k:mm D-M-Y');
        },

        async checkFavourite() {
            if (this.$auth.isRoles(ROLE_ID.BIDDER)) {
                const result = await productFavouriteService.getByBidder(this.id).catch(error => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message || 'Cannot check favourite product'
                    });
                });
                this.isFavourite = result.data;
            }
        },

        async handleFavourite() {
            if (!this.$auth.isAuthenticated())
                return this.$router.push('/login?redirect=' + this.$router.currentRoute.path);

            const result = await productService.favouriteProduct(this.id).catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: error.message || 'Cannot favourite product!'
                });
            });
            if (result) {
                this.$notify.success({
                    title: 'Success',
                    message: !this.isFavourite ? 'Favourite product successfully!' : 'Unfavourite product successfully!'
                });
                this.isFavourite = !this.isFavourite;
            }
        }
    }
});
</script>
<style>
    .container-fluid {
        margin: 0 auto;
    }

    .color-primary-header {
        font-weight: 700;
        color: #cb1c22;
        margin-right: 10px;
        font-size: 32px;
    }

    .color-primary {
        font-weight: 700;
        color: #cb1c22;
    }

    h1, h3, v-layout {
        color: #0f0f0f;
        font-weight: bold;
    }

    .icon-like-product {
        font-size: 2rem;
        cursor: pointer;
        color: red;
    }

    .text-info-auction {
        font-weight: bold;
    }
</style>
