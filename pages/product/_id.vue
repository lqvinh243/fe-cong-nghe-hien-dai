<template>
    <div grid-list-lg fluid class="container-fluid ml-4 mt-5">
        <v-layout row>
            <v-flex md1>
                <i v-if="showFavouriteIcon" style="font-size: 2rem; cursor: pointer" :class="isFavourite ? 'el-icon-star-on icon-like-product' :'el-icon-star-off'" @click="handleFavourite" />
            </v-flex>
        </v-layout>
        <v-divider />
        <v-layout row wrap>
            <v-flex md4 ml-4>
                <v-carousel :show-arrows="false">
                    <v-carousel-item
                        v-for="(item,i) in listProductImage"
                        :key="i"
                        :src="item.url"
                    />
                </v-carousel>
                <v-layout mt-4>
                    <h4> Mô tả sản phẩm: </h4>
                </v-layout>
                <v-layout>
                    <div v-for="(item, index) in description" :key="index">
                        <p>Thời gian : {{ formatDate(item.createdAt) }}</p>
                        <p v-html="item.content" />
                    </div>
                </v-layout>
            </v-flex>
            <v-flex md1 />
            <v-flex md5>
                <v-card
                    elevation="24"
                    max-width="444"
                    class="mx-auto"
                />
                <v-layout md12 mt-1>
                    <span class="color-primary-header" />
                </v-layout>
                <v-flex>
                    <h1>{{ title }}</h1>
                </v-flex>
                <v-card
                    style="padding: 0 auto"
                    class="mx-auto mt-4"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content style="margin-right:0 !important">
                            <div class="text-overline">
                                <el-row>
                                    <el-col :span="12">
                                        <h3 class="pt-3">
                                            Thông tin Đấu giá
                                        </h3>
                                    </el-col>
                                    <el-col :span="6" :offset="6">
                                        <el-button class="ml-auto" :disabled="!isAuthenticated || status !== 'process' || !showFavouriteIcon" @click="handleBidProductAuto">
                                            Đấu giá tự động
                                        </el-button>
                                    </el-col>
                                </el-row>

                                <v-divider />
                            </div>
                            <v-list-item-title class="text-h5 mb-1">
                                <v-layout md12 my-2>
                                    Giá hiện tại: <span class="ml-2 color-primary">{{ priceCurrent }}$</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Giá Mua ngay: <span v-if="priceBid" class="ml-2 color-primary">{{ priceBid }}$</span> <span v-else class="ml-2 color-primary">_</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Tình trạng: <span class="ml-2 color-primary">{{ mapStatusProduct(status) }}</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Thời gian con lai: <span class="ml-2 color-primary">{{ timeExpire }}</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Bước nhảy: <span class="ml-2 color-primary">{{ stepPrice }}$</span>
                                </v-layout>
                                <v-layout v-if="status ==='process'" md12 my-2>
                                    Thông tin người giữ giá : <span class="ml-2 color-primary">{{ bidderName }}</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Thông tin người thắng: <span class="ml-2 color-primary">{{ winnerName }}</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Ngày đăng sản phẩm: <span class="ml-2 text-info-auction color-primary">{{ formatDate(createdAt) }}</span>
                                </v-layout>
                                <v-layout md12 my-2>
                                    Số lượt ra giá hiện tại: <span class="ml-2 text-info-auction color-primary">{{ totalAuc }}</span>
                                </v-layout>
                            </v-list-item-title>
                            <v-alert
                                v-if="!isStricten"
                                text
                                color="info"
                                style="font-size:12px"
                            >
                                *Sản phẩm này yêu cầu người đấu giá phải có lượt đánh giá 80% trở lên!
                            </v-alert>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions>
                        <el-button :disabled="!isAuthenticated || status !== 'process' || !showFavouriteIcon" style="width: 100%;margin-top:1rem; font-weight: bold; color:white" type="primary" :loading="loading" @click="handleBidProduct">
                            ĐẤU GIÁ
                        </el-button>
                        <el-button
                            v-if="showBuyNow"
                            style="width: 100%;margin-top:1rem; font-weight: bold; color:white"
                            type="danger"
                            :loading="loading"
                            :disabled="!isAuthenticated || status !== 'process' || !showFavouriteIcon"
                            @click="handleBuyProduct"
                        >
                            MUA NGAY
                        </el-button>
                    </v-card-actions>
                    <p v-if="!isAuthenticated" class="text-center" style="font-size:1rem">
                        Vui lòng <nuxt-link to="/login">
                            đăng nhập
                        </nuxt-link>
                        hoặc  <nuxt-link to="/register">
                            đăng ký
                        </nuxt-link> để tham gia đấu giá!
                    </p>
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
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions />
                </v-card>
            </v-flex>
        </v-layout>
        <DialogBidPrice :product-id="id" :price-now="priceCurrent" :price="priceCurrent + stepPrice" :dialog-visible="dialogBidVisible" @handelCloseBid="closeBidDialog" />
        <BidPriceAutoDialog :product-id="id" :price-now="priceCurrent" :price="priceCurrent + stepPrice" :dialog-visible-auto="dialogBidAutoVisible" @handelCloseBid="closeBidDialog" />
        <ConfirmBuyNowDialog :product-id="id" :price-now="priceCurrent" :dialog-buy-now-visible="dialogBuyNowVisible" @handelCloseBid="closeBidDialog" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import momment from 'moment';
import { ROLE_ID } from '~/commom/enum';
import BidPriceAutoDialog from '~/components/dialogs/BidPriceAutoDialog.vue';
import DialogBidPrice from '~/components/dialogs/BidPriceDialog.vue';
import ConfirmBuyNowDialog from '~/components/dialogs/ConfirmBuyNowDialog.vue';
import eventBus from '~/plugins/event-bus';
import { productService } from '~/services/product';
import { productFavouriteService } from '~/services/product-favourite';

export default Vue.extend({
    components: { DialogBidPrice, BidPriceAutoDialog, ConfirmBuyNowDialog },
    data: () => ({
        id: null as string | null,
        selection: null,
        loading: false,
        listProductImage: [],
        title: '' as any,
        priceCurrent: 0,
        status: '' as any,
        priceBid: null as number | null,
        description: [] as any,
        timeExpire: 0,
        seller: '' as any,
        likeProduct: false as boolean,
        stepPrice: 0 as number,
        category: '' as string,
        createdAt: null,
        isFavourite: false,
        dialogBidVisible: false,
        dialogBidAutoVisible: false,
        dialogBuyNowVisible: false,
        bidderName: '',
        winnerName: '',
        totalAuc: 0,
        isStricten: false
    }),

    computed: {
        showFavouriteIcon():boolean {
            return this.$auth.isRoles(ROLE_ID.BIDDER, ROLE_ID.SELLER);
        },
        showBuyNow():boolean {
            return !!this.priceBid;
        },
        isAuthenticated():boolean {
            return this.$auth.isAuthenticated();
        },
    },
    destroyed() {
        eventBus.$off('product_end');
        eventBus.$off('bid_price_change');
    },
    created() {
        eventBus.$on('product_end', (data:any) => {
            if (this.id === data.id) {
                this.status = data.status;
                this.priceNow = data.price;
                this.bidder = data.winner;
                this.winner = data.winner;
            }
        });
        eventBus.$on('bid_price_change', (data:any) => {
            if (this.id === data.id) {
                this.priceCurrent = data.price;
                this.bidder = data.bidder;
            }
        });
    },
    mounted() {
        this.id = this.$route.params.id;
        if (!this.id)
            return this.$router.push('/404');
        this.loadProductDetail();
        this.checkFavourite();
        momment.locale('vi');
    },

    methods: {
        handleAuthenticated() {
            if (!this.$auth.isAuthenticated())
                return this.$router.push('/login?redirect=' + this.$router.currentRoute.path);
        },

        handleBidProduct() {
            this.handleAuthenticated();
            this.dialogBidVisible = true;
        },

        handleBuyProduct() {
            this.handleAuthenticated();
            this.dialogBuyNowVisible = true;
        },

        handleBidProductAuto() {
            this.handleAuthenticated();
            this.dialogBidAutoVisible = true;
        },

        async loadProductDetail() {
            const result = await productService.getProductDetailById(this.id)
                .catch(_error => {
                    this.$notify.error({
                        title: 'Lỗi',
                        message: 'Không thể lấy chi tiết sản phẩm!'
                    });
                });
            if (result) {
                this.listProductImage = result.data.productImages;
                this.title = result.data.name;
                this.priceCurrent = result.data.priceNow;
                this.status = result.data.status;
                this.priceBid = result.data.bidPrice;
                this.description = [];
                if (result.data.productDescription) {
                    result.data.productDescription.forEach((elementDesc:any) => {
                        this.description.push(elementDesc);
                    });
                }
                this.timeExpire = this.formatDateExpired(result.data);
                this.seller = `${result.data.seller.firstName} ${result.data.seller.lastName ?? ''}`;
                this.stepPrice = result.data.stepPrice;
                this.category = result.data.category.name;
                this.createdAt = result.data.createdAt;
                this.bidderName = result.data.bidder ? `${result.data.bidder.firstName} ${result.data.bidder.lastName ?? ''}` : '_';
                this.winnerName = result.data.winner ? `${result.data.winner.firstName} ${result.data.winner.lastName ?? ''}` : '_';
                this.totalAuc = result.data.statistic ? result.data.statistic.auctions : 0;
                this.isStricten = !!result.data.isStricten;
            }
        },

        formatDate(date:any) {
            return momment(date).format('k:mm D-M-Y');
        },

        async checkFavourite() {
            if (this.$auth.isRoles(ROLE_ID.BIDDER, ROLE_ID.SELLER)) {
                const result = await productFavouriteService.getByBidder(this.id).catch(_error => {
                    this.$notify.error({
                        title: 'Lỗi',
                        message: 'Không thể kiểm tra sản phẩm yêu thích!'
                    });
                });
                this.isFavourite = result.data;
            }
        },

        async handleFavourite() {
            this.handleAuthenticated();

            const result = await productService.favouriteProduct(this.id).catch(_error => {
                this.$notify.error({
                    title: 'Lỗi',
                    message: 'Không thể thêm vào danh mục yêu thích!'
                });
            });
            if (result) {
                this.$notify.success({
                    title: 'Thành công',
                    message: !this.isFavourite ? 'Thêm vào danh mục yêu thích thành công!' : 'Xóa bỏ khỏi danh mục yêu thích thành công!'
                });
                this.isFavourite = !this.isFavourite;
            }
        },

        closeBidDialog(formName: string) {
            if (formName === 'bidPriceForm')
                this.dialogBidVisible = false;
            else if (formName === 'bidPriceAutoForm')
                this.dialogBidAutoVisible = false;
            else if (formName === 'buyNowForm')
                this.dialogBuyNowVisible = false;
        },

        mapStatusProduct(status: string) {
            switch (status) {
            case 'process':
                return 'Đang diễn ra';
            case 'end':
            case 'cancel':
                return 'Đã kết thúc';
            default:
                return 'Chưa tiến hành';
            }
        },

        formatDateExpired(row:any) {
            const timeNow = momment(new Date());
            switch (row.status) {
            case 'process':
                return timeNow.from(row.expiredAt, true);
            default:
                return '_';
            }
        },

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
